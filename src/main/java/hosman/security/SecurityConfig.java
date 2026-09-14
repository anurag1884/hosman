package hosman.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService controller,
            PasswordEncoder encoder) {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(controller);

        provider.setPasswordEncoder(encoder);

        return new ProviderManager(provider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                // Replace the default login endpoint.
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        // Public frontend
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/style.css",
                                "/script.js")
                        .permitAll()

                        // Public login endpoint
                        .requestMatchers("/login").permitAll()

                        // Admin-only endpoints
                        // .requestMatchers("/admin/**")
                        // .hasRole("ADMIN")

                        // Everything else requires authentication
                        .anyRequest().authenticated())

                // Disables usage of Spring Security's default login page
                .formLogin(form -> form.disable());

        return http.build();
    }

}
