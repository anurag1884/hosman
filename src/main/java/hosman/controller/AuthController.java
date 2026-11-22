/* (C)2026 */
package hosman.controller;

import hosman.entity.Account;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Nurse;
import hosman.entity.roles.Patient;
import hosman.entity.roles.Pharmacist;
import hosman.entity.roles.Receptionist;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import hosman.request.auth.LoginRequest;
import hosman.request.auth.PrivilegedRegisterRequest;
import hosman.request.auth.RegisterRequest;
import hosman.response.ValidationResponse;
import hosman.service.AccountService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
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

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    public AuthController(
            AuthenticationManager manager,
            AccountRepository repo,
            SecurityContextRepository securityRepo,
            AccountService accService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PharmacistService pharmaService,
            PatientService patService) {

        this.manager = manager;

        this.securityRepo = securityRepo;

        this.accService = accService;

        this.docService = docService;
        this.nurseService = nurseService;
        this.recepService = recepService;
        this.pharmaService = pharmaService;
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
            RegisterRequest regReq = req.credentials();

            String username = regReq.username().trim();
            if (!AccountService.checkUsername(username))
                return new ValidationResponse(false, "Username '" + username + "' is invalid.");
            if (accService.accountExists(username))
                return new ValidationResponse(
                        false, "Username '" + username + "' is already taken.");

            String password = regReq.password();
            if (password.length() < 8)
                return new ValidationResponse(false, "Password is too short.");

            Account acc = accService.createAccount(username, password, req.role());

            Role role = req.role();
            if (role == null)
                return new ValidationResponse(false, "Role '" + role + "' is invalid.");

            try {
                switch (role) {
                    case DOCTOR -> {
                        Doctor doc = new Doctor(acc);
                        doc.updateProfile(regReq.details());
                        docService.saveDoctor(doc);
                    }
                    case NURSE -> {
                        Nurse nurse = new Nurse(acc);
                        nurse.updateProfile(regReq.details());
                        nurseService.saveNurse(nurse);
                    }
                    case RECEPTIONIST -> {
                        Receptionist recep = new Receptionist(acc);
                        recep.updateProfile(regReq.details());
                        recepService.saveReceptionist(recep);
                    }
                    case PHARMACIST -> {
                        Pharmacist pharma = new Pharmacist(acc);
                        pharma.updateProfile(regReq.details());
                        pharmaService.savePharmacist(pharma);
                    }
                    case PATIENT -> {
                        Patient pat = new Patient(acc);
                        pat.updateProfile(regReq.details());
                        patService.savePatient(pat);
                    }
                    default -> {}
                }
            } catch (IllegalArgumentException e) {
                return new ValidationResponse(false, e.getMessage());
            }

        } catch (NullPointerException e) {
            return new ValidationResponse(false, "Malformed request sent.");
        }

        return new ValidationResponse(true, "SUCCESS");
    }
}
