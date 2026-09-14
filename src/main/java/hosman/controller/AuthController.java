package hosman.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationManager manager;

    public AuthController(AuthenticationManager manager) {
        this.manager = manager;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()));

        return "Login successful";
    }

    public record LoginRequest(
            String username,
            String password) {
    }
}
