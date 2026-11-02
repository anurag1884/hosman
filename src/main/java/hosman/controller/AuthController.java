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

import jakarta.validation.Valid;
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
import hosman.request.LoginRequest;
import hosman.request.PrivilegedRegisterRequest;
import hosman.request.RegisterRequest;
import hosman.response.ValidationResponse;
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
    private final ProfileService profileService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PatientService patService;

    public AuthController(AuthenticationManager manager, AccountRepository repo, SecurityContextRepository securityRepo,
            AccountService accService, DoctorService docService, NurseService nurseService,
            ReceptionistService recepService, PatientService patService, ProfileService profileService) {

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
    public ValidationResponse login(@RequestBody LoginRequest req, HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String username = req.username().trim();

        if (!accService.getAccount(username).isPresent())
            return new ValidationResponse(false, "Username '" + username + "' does not exist.");

        Authentication auth;

        try {

            auth = manager.authenticate(new UsernamePasswordAuthenticationToken(username, req.password()));

        } catch (AuthenticationException e) {
            return new ValidationResponse(false, "Password is invalid. Try again.");
        }

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);

        SecurityContextHolder.setContext(context);
        securityRepo.saveContext(context, httpRequest, httpResponse);

        return new ValidationResponse(true, "SUCCESS");

    }

    @PostMapping("/register")
    public ValidationResponse register(@RequestBody RegisterRequest req) {
        String username = req.username().trim();

        if (!ProfileController.checkUsername(username))
            return new ValidationResponse(false, "Username '" + username + "' is invalid.");

        if (accService.getAccount(username).isPresent())
            return new ValidationResponse(false, "Username '" + username + "' is already taken.");

        String password = req.password();

        if (password.length() < 8)
            return new ValidationResponse(false, "Password is too short.");

        Account acc = accService.saveAccount(username, password, Role.PATIENT);

        patService.savePatient(new Patient(acc));

        Profile profile = new Profile(acc);

        profileService.saveProfile(profile);

        return new ValidationResponse(true, "SUCCESS");

    }

    @PostMapping("/admin/register")
    public ValidationResponse privilegedRegister(@Valid @RequestBody PrivilegedRegisterRequest req) {

        String username = req.details().username().trim();

        if (!username.matches("[a-zA-Z][a-zA-Z0-9]*"))
            return new ValidationResponse(false, "Username '" + username + "' is invalid.");

        if (!accService.getAccount(username).isEmpty())
            return new ValidationResponse(false, "Username '" + username + "' is already taken.");

        String password = req.details().password();

        if (password.length() < 8)
            return new ValidationResponse(false, "Password is too short.");

        Role role = req.role();

        if (role == null)
            return new ValidationResponse(false, "Role '" + role + "' is invalid.");

        Account acc = accService.saveAccount(username, password, req.role());

        switch (role) {
            case DOCTOR ->
                docService.saveDoctor(new Doctor(acc));
            case NURSE ->
                nurseService.saveNurse(new Nurse(acc));
            case RECEPTIONIST ->
                recepService.saveReceptionist(new Receptionist(acc));
            case PATIENT ->
                patService.savePatient(new Patient(acc));
            default -> {
            }
        }

        Profile profile = new Profile(acc);

        profileService.saveProfile(profile);

        return new ValidationResponse(true, "SUCCESS");

    }

}
