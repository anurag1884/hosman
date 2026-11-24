/* (C)2026 */
package hosman.controller;

import hosman.dto.request.edit.EditProfileRequest;
import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.entity.roles.Admin;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Nurse;
import hosman.entity.roles.Patient;
import hosman.entity.roles.Pharmacist;
import hosman.entity.roles.Receptionist;
import hosman.except.FieldException;
import hosman.except.NotFoundException;
import hosman.service.AccountService;
import hosman.service.roles.AdminService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private final AccountService accService;

    private final AdminService adminService;
    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    public ProfileController(
            AccountService accService,
            AdminService adminService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PharmacistService pharmaService,
            PatientService patService) {

        this.accService = accService;

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

    @GetMapping("/profile")
    public Profile getProfile(@AuthenticationPrincipal UserDetails userDetails)
            throws NotFoundException {

        String username = userDetails.getUsername();

        Account acc = accService.get(username);
        return switch (acc.role) {
            case ADMIN -> adminService.get(acc);

            case DOCTOR -> docService.get(acc);

            case NURSE -> nurseService.get(acc);

            case RECEPTIONIST -> recepService.get(acc);

            case PHARMACIST -> pharmaService.get(acc);

            case PATIENT -> patService.get(acc);
        };
    }

    @PutMapping("/profile")
    public void editProfile(
            @Valid @RequestBody EditProfileRequest req,
            @AuthenticationPrincipal UserDetails userDetails)
            throws NotFoundException, FieldException {

        privilegedEditProfile(userDetails.getUsername(), req);
    }

    @GetMapping("/admin/profile/{username}")
    public Profile privilegedGetProfile(@PathVariable String username) throws NotFoundException {

        Account acc = accService.get(username);
        return switch (acc.role) {
            case ADMIN -> adminService.get(acc);
            case DOCTOR -> docService.get(acc);
            case NURSE -> nurseService.get(acc);
            case RECEPTIONIST -> recepService.get(acc);
            case PHARMACIST -> pharmaService.get(acc);
            case PATIENT -> patService.get(acc);
        };
    }

    @PutMapping("/admin/profile/{username}")
    public void privilegedEditProfile(
            @PathVariable String username, @Valid @RequestBody EditProfileRequest req)
            throws NotFoundException, FieldException {

        Account acc = accService.get(username);
        switch (acc.role) {
            case ADMIN -> {
                Admin admin = new Admin(acc);
                admin.updateProfile(req);
                adminService.save(admin);
            }
            case DOCTOR -> {
                Doctor doc = new Doctor(acc);
                doc.updateProfile(req);
                docService.save(doc);
            }
            case NURSE -> {
                Nurse nurse = new Nurse(acc);
                nurse.updateProfile(req);
                nurseService.save(nurse);
            }
            case RECEPTIONIST -> {
                Receptionist recep = new Receptionist(acc);
                recep.updateProfile(req);
                recepService.save(recep);
            }
            case PHARMACIST -> {
                Pharmacist pharma = new Pharmacist(acc);
                pharma.updateProfile(req);
                pharmaService.save(pharma);
            }
            case PATIENT -> {
                Patient pat = new Patient(acc);
                pat.updateProfile(req);
                patService.save(pat);
            }
        }
    }
}
