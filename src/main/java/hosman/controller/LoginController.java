package hosman.controller;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;

import hosman.user.UserProfile;
import hosman.user.UserRepository;

@Service
public class LoginController implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public LoginController(UserRepository repo, PasswordEncoder encoder) {
        this.repository = repo;
        this.encoder = encoder;
    }

    public UserProfile createUser(String username, String password, String role) {
        return repository.save(
                new UserProfile(username, encoder.encode(password), role));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserProfile user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " was not found."));

        return User.builder()
                .username(user.username)
                .password(user.password)
                .roles(user.role)
                .build();
    }

}
