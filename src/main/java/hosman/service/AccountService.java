package hosman.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import hosman.entity.Account;
import hosman.enums.Role;
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account acc = this.accRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));

        return User.builder()
                .username(acc.username)
                .password(acc.hashedPassword)
                .roles(acc.role.name())
                .build();

    }

    public Optional<Account> getAccount(String username) {
        return accRepo.findByUsername(username);
    }

    public Account setNewPassword(Account acc, String currPassword, String newPassword) {

        String hashedPassword = encoder.encode(currPassword);

        if (acc.hashedPassword == hashedPassword) {

            acc.hashedPassword = hashedPassword;

            return saveAccount(acc);

        }

        return null;

    }

    public Account saveAccount(Account acc) {

        return this.accRepo.save(acc);

    }

    public Account saveAccount(String username, String password, Role role) {

        Account acc = new Account(username, encoder.encode(password), role);

        return saveAccount(acc);

    }

}
