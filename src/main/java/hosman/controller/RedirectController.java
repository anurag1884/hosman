/* (C)2026 */
package hosman.controller;

import hosman.service.SecurityService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

    SecurityService secService;

    public RedirectController(SecurityService secService) {

        this.secService = secService;
    }

    //
    // Endpoints
    //

    @GetMapping("/")
    public String home(Authentication auth) {

        return secService.isAuthenticated(auth)
                ? "redirect:/dashboard"
                : "forward:/auth/index.html";
    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication auth) {

        if (secService.isAuthenticated(auth)) {
            if (secService.hasRole(auth, "ADMIN")) return "forward:/admin/index.html";
            if (secService.hasRole(auth, "DOCTOR")) return "forward:/doctor/index.html";
            if (secService.hasRole(auth, "NURSE")) return "forward:/nurse/index.html";
            if (secService.hasRole(auth, "RECEPTIONIST")) return "forward:/receptionist/index.html";
            if (secService.hasRole(auth, "PHARMACIST")) return "forward:/pharmacist/index.html";
            if (secService.hasRole(auth, "PATIENT")) return "forward:/patient/index.html";
        }

        return "redirect:/";
    }
}
