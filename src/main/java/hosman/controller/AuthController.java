/* (C)2026 */
package hosman.controller;

import hosman.common.CheckValidation;
import hosman.dto.request.auth.LoginRequest;
import hosman.dto.request.auth.RegisterRequest;
import hosman.dto.request.edit.EditUserDetailsRequest;
import hosman.dto.response.UserDetailsResponse;
import hosman.entity.Account;
import hosman.entity.roles.Admin;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Nurse;
import hosman.entity.roles.Patient;
import hosman.entity.roles.Pharmacist;
import hosman.entity.roles.Receptionist;
import hosman.enums.EnumParser;
import hosman.enums.Role;
import hosman.except.ConflictException;
import hosman.except.FieldException;
import hosman.except.NotFoundException;
import hosman.except.UnauthorizedException;
import hosman.service.AccountService;
import hosman.service.SecurityService;
import hosman.service.roles.AdminService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AccountService accService;
    private final SecurityService secService;

    private final AdminService adminService;
    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    public AuthController(
            AccountService accService,
            SecurityService secService,
            AdminService adminService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PharmacistService pharmaService,
            PatientService patService) {

        this.accService = accService;
        this.secService = secService;

        this.adminService = adminService;
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
    public void login(
            @Valid @RequestBody LoginRequest req,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse)
            throws NotFoundException, UnauthorizedException {

        String username = req.username();
        Account acc = accService.get(username);

        String password = req.password();
        accService.verifyPassword(acc, password);

        secService.save(username, password, httpRequest, httpResponse);
    }

    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterRequest req)
            throws FieldException, ConflictException {

        privilegedRegister(
                new RegisterRequest(
                        req.username(), req.password(), "PATIENT", req.details(), true));
    }

    @PostMapping("/admin/register")
    public void privilegedRegister(@Valid @RequestBody RegisterRequest req)
            throws FieldException, ConflictException {

        String username = req.username();
        CheckValidation.checkUsername(username);
        if (accService.exists(username))
            throw new ConflictException("Username '" + username + "' is already taken.");

        String password = req.password();
        if (req.passwordCheck()) CheckValidation.checkPassword(password);

        String roleString = req.role();
        if (roleString == null) throw new FieldException("Must specify a role.");

        Account acc =
                accService.create(
                        username, password, EnumParser.parseEnum(Role.class, roleString, "Role"));
        switch (acc.role) {
            case ADMIN -> {
                Admin admin = new Admin(acc);
                admin.updateProfile(req.details());
                adminService.save(admin);
            }
            case DOCTOR -> {
                Doctor doc = new Doctor(acc);
                doc.updateProfile(req.details());
                docService.save(doc);
            }
            case NURSE -> {
                Nurse nurse = new Nurse(acc);
                nurse.updateProfile(req.details());
                nurseService.save(nurse);
            }
            case RECEPTIONIST -> {
                Receptionist recep = new Receptionist(acc);
                recep.updateProfile(req.details());
                recepService.save(recep);
            }
            case PHARMACIST -> {
                Pharmacist pharma = new Pharmacist(acc);
                pharma.updateProfile(req.details());
                pharmaService.save(pharma);
            }
            case PATIENT -> {
                Patient pat = new Patient(acc);
                pat.updateProfile(req.details());
                patService.save(pat);
            }
        }
    }

    @GetMapping("/user")
    public UserDetailsResponse getUser(@AuthenticationPrincipal UserDetails userDetails)
            throws NotFoundException {

        String username = userDetails.getUsername();
        Account acc = accService.get(username);
        return new UserDetailsResponse(acc.getId(), acc.username);
    }

    @PutMapping("/user")
    public void editUser(
            @Valid @RequestBody EditUserDetailsRequest req,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse)
            throws NotFoundException, FieldException, UnauthorizedException, ConflictException {

        String username = userDetails.getUsername();
        Account acc = accService.get(username);

        String password = req.oldPassword();
        if (password == null)
            throw new UnauthorizedException("Current password is required for authentication.");

        accService.verifyPassword(acc, password);

        String newUsername = req.newUsername();
        String newPassword = req.newPassword();

        if (newUsername == null && newPassword == null) return;

        if (newUsername == null) newUsername = username;
        else CheckValidation.checkUsername(newUsername);

        if (newPassword == null) newPassword = password;
        else if (req.passwordCheck()) CheckValidation.checkPassword(newPassword);

        accService.updateCredentials(acc, newUsername, newPassword);

        secService.save(newUsername, newPassword, httpRequest, httpResponse);
    }
}
