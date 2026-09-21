package hosman.config;

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
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    @Bean
    public AuthenticationManager manageAuth(UserDetailsService service, PasswordEncoder encoder) {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(service);
        provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);

    }

    @Bean
    SecurityContextRepository securityContextRepository() {

        return new HttpSessionSecurityContextRepository();

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
            SecurityContextRepository securityContextRepository) throws Exception {

        http
                // Replace the default login endpoint.
                .csrf(csrf -> csrf.disable())

                // Disables usage of Spring Security's default login page
                .formLogin(form -> form.disable())

                .authorizeHttpRequests(auth -> auth

                        // Public frontend
                        .requestMatchers(
                                "/",
                                "/auth/**",
                                "/login",
                                "/register",
                                "/dashboard")
                        .permitAll()

                        // User endpoints
                        .requestMatchers("/user/**")
                        .hasRole("USER")

                        // Admin-only endpoints
                        .requestMatchers("/admin/**")
                        .hasRole("ADMIN")

                        // Everything else requires authentication
                        .anyRequest().authenticated())

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }));

        return http.build();

    }

}
