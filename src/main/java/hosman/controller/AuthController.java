/* (C)2026 */
package hosman.controller;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Nurse;
import hosman.entity.roles.Patient;
import hosman.entity.roles.Receptionist;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import hosman.request.auth.LoginRequest;
import hosman.request.auth.PrivilegedRegisterRequest;
import hosman.request.auth.RegisterRequest;
import hosman.response.ValidationResponse;
import hosman.service.AccountService;
import hosman.service.DoctorService;
import hosman.service.NurseService;
import hosman.service.PatientService;
import hosman.service.ProfileService;
import hosman.service.ReceptionistService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationManager manager;

    private final SecurityContextRepository securityRepo;

    private final AccountService accService;
    private final ProfileService profileService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PatientService patService;

    public AuthController(
            AuthenticationManager manager,
            AccountRepository repo,
            SecurityContextRepository securityRepo,
            AccountService accService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PatientService patService,
            ProfileService profileService) {

        this.manager = manager;

        this.securityRepo = securityRepo;

        this.accService = accService;
        this.profileService = profileService;

        this.docService = docService;
        this.nurseService = nurseService;
        this.recepService = recepService;
        this.patService = patService;
    }

    //
    // Endpoints
    //

    @PostMapping("/login")
    public ValidationResponse login(
            @RequestBody LoginRequest req,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        try {
            String username = req.username().trim();

            if (!accService.accountExists(username))
                return new ValidationResponse(false, "Username '" + username + "' does not exist.");

            Authentication auth;
            try {
                auth =
                        manager.authenticate(
                                new UsernamePasswordAuthenticationToken(username, req.password()));
            } catch (AuthenticationException e) {
                return new ValidationResponse(false, "Password is invalid. Try again.");
            }

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(auth);

            SecurityContextHolder.setContext(context);
            securityRepo.saveContext(context, httpRequest, httpResponse);
        } catch (NullPointerException e) {
            return new ValidationResponse(false, "Malformed request sent.");
        }

        return new ValidationResponse(true, "SUCCESS");
    }

    @PostMapping("/register")
    public ValidationResponse register(@RequestBody RegisterRequest req) {

        return privilegedRegister(new PrivilegedRegisterRequest(req, Role.PATIENT));
    }

    @PostMapping("/admin/register")
    public ValidationResponse privilegedRegister(
            @Valid @RequestBody PrivilegedRegisterRequest req) {

        try {
            RegisterRequest regRequest = req.credentials();

            String username = regRequest.username().trim();
            if (!AccountService.checkUsername(username))
                return new ValidationResponse(false, "Username '" + username + "' is invalid.");
            if (accService.accountExists(username))
                return new ValidationResponse(
                        false, "Username '" + username + "' is already taken.");

            String password = regRequest.password();
            if (password.length() < 8)
                return new ValidationResponse(false, "Password is too short.");

            Account acc = accService.createAccount(username, password, req.role());

            Profile profile = new Profile(acc);
            try {
                profile.updateProfile(regRequest.details());
            } catch (IllegalArgumentException e) {
                return new ValidationResponse(false, e.getMessage());
            }

            accService.saveAccount(acc);
            profileService.saveProfile(profile);

            Role role = req.role();
            if (role == null)
                return new ValidationResponse(false, "Role '" + role + "' is invalid.");

            switch (role) {
                case DOCTOR -> docService.saveDoctor(new Doctor(acc));
                case NURSE -> nurseService.saveNurse(new Nurse(acc));
                case RECEPTIONIST -> recepService.saveReceptionist(new Receptionist(acc));
                case PATIENT -> patService.savePatient(new Patient(acc));
                default -> {}
            }
        } catch (NullPointerException e) {
            return new ValidationResponse(false, "Malformed request sent.");
        }

        return new ValidationResponse(true, "SUCCESS");
    }
}
