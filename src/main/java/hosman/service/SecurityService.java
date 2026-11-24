/* (C)2026 */
package hosman.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    private final AuthenticationManager manager;

    private final SecurityContextRepository repo;

    public SecurityService(AuthenticationManager manager, SecurityContextRepository repo) {

        this.manager = manager;

        this.repo = repo;
    }

    public void save(
            String username,
            String password,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        Authentication auth =
                manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);

        SecurityContextHolder.setContext(context);
        repo.saveContext(context, httpRequest, httpResponse);
    }

    public boolean isAuthenticated(Authentication auth) {

        return auth != null && auth.isAuthenticated();
    }

    public boolean hasRole(Authentication auth, String role) {

        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_" + role));
    }
}
