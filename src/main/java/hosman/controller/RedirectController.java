package hosman.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

    //
    // Endpoints
    //

    @GetMapping("/")
    public String home(Authentication auth) {

        return isAuthenticated(auth)
                ? "redirect:/dashboard"
                : "forward:/auth/index.html";

    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication auth) {

        if (isAuthenticated(auth)) {

            if (hasRole(auth, "ADMIN"))
                return "forward:/admin/index.html";

            if (hasRole(auth, "DOCTOR"))
                return "forward:/doctor/index.html";

            if (hasRole(auth, "NURSE"))
                return "forward:/nurse/index.html";

            if (hasRole(auth, "RECEPTIONIST"))
                return "forward:/receptionist/index.html";

            if (hasRole(auth, "PATIENT"))
                return "forward:/patient/index.html";

        }

        return "redirect:/";

    }

    //
    // Private methods
    //

    private boolean isAuthenticated(Authentication auth) {

        return auth != null && auth.isAuthenticated();

    }

    private boolean hasRole(Authentication auth, String role) {

        return auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_" + role));

    }

}
