/* (C)2026 */
package hosman.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {

        // Use BCrypt for hashing passwords
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
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http, SecurityContextRepository securityContextRepository) {

        CookieCsrfTokenRepository tokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        // Set to null to opt out of BREACH XOR encoding if reading raw token from
        // cookie
        requestHandler.setCsrfRequestAttributeName(null);

        http
                // Configures CSRF token repository and handler
                .csrf(
                        csrf ->
                                csrf.csrfTokenRepository(tokenRepository)
                                        .csrfTokenRequestHandler(requestHandler))

                // Disables usage of Spring Security's default login page
                .formLogin(form -> form.disable())
                .authorizeHttpRequests(
                        auth ->
                                auth

                                        // Public frontend
                                        .requestMatchers(
                                                "/",
                                                "/csrf",
                                                "/login",
                                                "/register",
                                                "/dashboard",
                                                "/auth/**",
                                                "/common/**")
                                        .permitAll()

                                        // // User endpoints
                                        // .requestMatchers("/user/**")
                                        // .hasAnyRole("DOCTOR", "NURSE", "RECEPTIONIST",
                                        // "PATIENT")

                                        // Admin-only endpoints
                                        .requestMatchers("/admin/**")
                                        .hasRole("ADMIN")

                                        // Doctor-only endpoints
                                        .requestMatchers("/doctor/**")
                                        .hasRole("DOCTOR")

                                        // Nurse-only endpoints
                                        .requestMatchers("/nurse/**")
                                        .hasRole("NURSE")

                                        // Receptionist-only endpoints
                                        .requestMatchers("/receptionist/**")
                                        .hasRole("RECEPTIONIST")

                                        // Pharmacist-only endpoints
                                        .requestMatchers("/pharmacist/**")
                                        .hasRole("PHARMACIST")

                                        // Patient-only endpoints
                                        .requestMatchers("/patient/**")
                                        .hasRole("PATIENT")

                                        // Everything else requires authentication
                                        .anyRequest()
                                        .authenticated())
                .logout(
                        logout ->
                                logout.logoutUrl("/logout")
                                        .logoutSuccessHandler(
                                                (request, response, authentication) -> {
                                                    response.setStatus(HttpServletResponse.SC_OK);
                                                }));

        return http.build();
    }
}
