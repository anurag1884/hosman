package hosman.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import hosman.entity.Account;
import hosman.repo.AccountRepository;

@Service
public class AccountService implements UserDetailsService {

    private final AccountRepository accRepo;
    private final PasswordEncoder encoder;

    public AccountService(AccountRepository accRepo, PasswordEncoder encoder) {

        this.accRepo = accRepo;
        this.encoder = encoder;

    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        Optional<Account> optAcc = this.accRepo.findByUsername(username);

        if (!optAcc.isPresent())
            return null;

        Account acc = optAcc.get();

        return User.builder()
                .username(acc.username)
                .password(acc.hashedPassword)
                .roles(acc.role)
                .build();

    }

    public List<Account> getAllAccounts() {

        return this.accRepo.findAll();

    }

    public Account saveAccount(String username, String password, String role) {

        String hashedPassword = encoder.encode(password);

        Account acc = new Account(username, hashedPassword, role);

        return this.accRepo.save(acc);

    }

}
