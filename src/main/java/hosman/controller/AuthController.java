package hosman.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import hosman.entity.Account;
import hosman.entity.Patient;
import hosman.enums.Gender;
import hosman.repo.AccountRepository;
import hosman.service.AccountService;
import hosman.service.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class AuthController {

    private final AuthenticationManager manager;

    private final AccountRepository accRepo;
    private final SecurityContextRepository securityRepo;

    private final AccountService accService;
    private final PatientService patService;

    public AuthController(AuthenticationManager manager, AccountRepository repo, SecurityContextRepository securityRepo,
            AccountService accService, PatientService patService) {

        this.manager = manager;

        this.accRepo = repo;
        this.securityRepo = securityRepo;

        this.accService = accService;
        this.patService = patService;

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

        if (!accRepo.findByUsername(username).isPresent())
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

        if (accRepo.findByUsername(username).isPresent())
            return new AuthResponse(false, "Username '" + username + "' is already taken.");

        String firstName = req.firstName().trim();

        if (!checkName(firstName))
            return new AuthResponse(false, "First name '" + firstName + "' is invalid.");

        String middleName = req.middleName() == null
                ? ""
                : req.middleName().trim();

        if (!middleName.isEmpty() && !checkName(middleName))
            return new AuthResponse(false, "Middle name '" + middleName + "' is invalid.");

        String lastName = req.lastName().trim();

        if (!checkName(lastName))
            return new AuthResponse(false, "Last name '" + lastName + "' is invalid.");

        Gender gender = switch (req.gender()) {
            case "male" -> Gender.Male;
            case "female" -> Gender.Female;
            case "other" -> Gender.Other;
            default -> Gender.Unknown;
        };

        // if (gender == Gender.Unknown)
        // return new AuthResponse(false, "Unknown gender encountered.");

        Account account = accService.saveAccount(username, req.password(), "USER");

        LocalDate dob = req.dateOfBirth(),
                now = LocalDate.now();

        if (dob.isAfter(now))
            return new AuthResponse(false, "Invalid DOB '" + dob.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                    + "'. Please select a proper DOB.");

        int age = Period.between(dob, now).getYears();

        String phoneNumber = req.phoneNumber().trim();
        if (!phoneNumber.matches("\\\\+?[0-9 ()-]{7,20}"))
            new AuthResponse(false,
                    "Invalid phone number '" + req.phoneNumber + "'. Please enter a valid phone number.");

        patService.savePatient(
                new Patient(account, firstName, middleName, lastName, age, req.bloodGroup(), dob, gender, phoneNumber));

        return new AuthResponse(true, "SUCCESS");

    }

    @PostMapping("/admin/register")
    public AuthResponse privilegedRegister(@RequestBody PrivilegedRegisterRequest req) {

        String username = req.username().trim();

        if (!accRepo.findByUsername(username).isEmpty())
            return new AuthResponse(false, "Username '" + username + "' is already taken.");

        if (!username.matches("[a-zA-Z][a-zA-Z0-9]*"))
            return new AuthResponse(false, "Username '" + username + "' is invalid.");

        accService.saveAccount(username, req.password(), req.role());

        return new AuthResponse(true, "SUCCESS");

    }

    //
    // Private methods
    //
    private boolean checkName(String name) {
        return name.matches("[a-zA-Z]+(?:[ '-][a-zA-Z]+)*");
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
            @NotBlank String firstName,
            String middleName,
            @NotBlank String lastName,
            @NotNull LocalDate dateOfBirth,
            @NotBlank String gender,
            @NotBlank String bloodGroup,
            @NotBlank String phoneNumber) {
    }

    public record PrivilegedRegisterRequest(
            @NotBlank String username,
            @NotBlank String password,
            @NotBlank String role) {
    }

    public record AuthResponse(boolean success, String message) {
    }

}
