package hosman.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.NotBlank;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import hosman.entity.Account;
import hosman.entity.Doctor;
import hosman.entity.Nurse;
import hosman.entity.Patient;
import hosman.entity.Profile;
import hosman.entity.Receptionist;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import hosman.service.AccountService;
import hosman.service.DoctorService;
import hosman.service.NurseService;
import hosman.service.PatientService;
import hosman.service.ProfileService;
import hosman.service.ReceptionistService;

@RestController
public class AuthController {

    private final AuthenticationManager manager;

    private final SecurityContextRepository securityRepo;

    private final AccountService accService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PatientService patService;

    private final ProfileService profileService;

    public AuthController(AuthenticationManager manager, AccountRepository repo, SecurityContextRepository securityRepo,
            AccountService accService, DoctorService docService, NurseService nurseService,
            ReceptionistService recepService, PatientService patService, ProfileService profileService) {

        this.manager = manager;

        this.securityRepo = securityRepo;

        this.accService = accService;
        this.docService = docService;
        this.nurseService = nurseService;
        this.recepService = recepService;
        this.patService = patService;

        this.profileService = profileService;

    }

    //
    // Endpoints
    //

    // @GetMapping("/me")
    // public UserDetails me(Authentication auth) {

    // return (UserDetails) auth.getPrincipal();

    // }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req, HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String username = req.username().trim();

        if (!accService.getAccount(username).isPresent())
            return new AuthResponse(false, "Username '" + username + "' does not exist.");

        Authentication auth;

        try {

            auth = manager.authenticate(new UsernamePasswordAuthenticationToken(username, req.password()));

        } catch (AuthenticationException e) {
            return new AuthResponse(false, "Password is invalid. Try again.");
        }

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);

        SecurityContextHolder.setContext(context);
        securityRepo.saveContext(context, httpRequest, httpResponse);

        return new AuthResponse(true, "SUCCESS");

    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        String username = req.username().trim();

        if (!username.matches("[a-zA-Z][a-zA-Z0-9]*"))
            return new AuthResponse(false, "Username '" + username + "' is invalid.");

        if (accService.getAccount(username).isPresent())
            return new AuthResponse(false, "Username '" + username + "' is already taken.");

        String password = req.password();

        if (password.length() < 8)
            return new AuthResponse(false, "Password is too short.");

        Account acc = accService.saveAccount(username, password, Role.PATIENT);

        patService.savePatient(new Patient(acc, req.bloodGroup()));

        Profile profile = new Profile(acc);

        profileService.saveProfile(profile);

        return new AuthResponse(true, "SUCCESS");

    }

    @PostMapping("/admin/register")
    public AuthResponse privilegedRegister(@RequestBody PrivilegedRegisterRequest req) {

        String username = req.username().trim();

        if (!username.matches("[a-zA-Z][a-zA-Z0-9]*"))
            return new AuthResponse(false, "Username '" + username + "' is invalid.");

        if (!accService.getAccount(username).isEmpty())
            return new AuthResponse(false, "Username '" + username + "' is already taken.");

        String password = req.password();

        if (password.length() < 8)
            return new AuthResponse(false, "Password is too short.");

        Role role = req.role();

        if (role == null)
            return new AuthResponse(false, "Role '" + role + "' is invalid.");

        Account acc = accService.saveAccount(username, password, req.role());

        switch (role) {
            case DOCTOR -> {
                docService.saveDoctor(new Doctor(acc));
            }
            case NURSE -> {
                nurseService.saveNurse(new Nurse(acc));
            }
            case RECEPTIONIST -> {
                recepService.saveReceptionist(new Receptionist(acc));
            }
            case PATIENT -> {
                patService.savePatient(new Patient(acc));
            }
            default -> {
            }
        }

        Profile profile = new Profile(acc);

        profileService.saveProfile(profile);

        return new AuthResponse(true, "SUCCESS");

    }

    //
    // Records
    //
    public record AuthStatus(boolean authenticated, String role) {
    }

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {
    }

    public record RegisterRequest(
            @NotBlank String username,
            @NotBlank String password,
            String bloodGroup) {
    }

    public record PrivilegedRegisterRequest(
            @NotBlank String username,
            @NotBlank String password,
            @NotBlank Role role) {
    }

    public record AuthResponse(boolean success, String message) {
    }

}
