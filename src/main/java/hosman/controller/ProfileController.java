/* (C)2026 */
package hosman.controller;

import hosman.entity.Account;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Nurse;
import hosman.entity.roles.Patient;
import hosman.entity.roles.Pharmacist;
import hosman.entity.roles.Receptionist;
import hosman.request.profile.EditProfileRequest;
import hosman.request.profile.PrivilegedEditProfileRequest;
import hosman.response.ValidationResponse;
import hosman.service.AccountService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private final AccountService accService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    public ProfileController(
            AccountService accService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PharmacistService pharmaService,
            PatientService patService) {

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

    @PostMapping("/edit-profile")
    public ValidationResponse editProfile(
            @RequestBody EditProfileRequest req, @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();

        return privilegedEditProfile(new PrivilegedEditProfileRequest(username, req));
    }

    @PostMapping
    public ValidationResponse privilegedEditProfile(
            @Valid @RequestBody PrivilegedEditProfileRequest req) {

        try {
            String username = req.username().trim();

            Account acc = accService.getAccount(username);

            switch (acc.role) {
                case DOCTOR -> {
                    Doctor doc = new Doctor(acc);
                    doc.updateProfile(req.details());
                    docService.saveDoctor(doc);
                }
                case NURSE -> {
                    Nurse nurse = new Nurse(acc);
                    nurse.updateProfile(req.details());
                    nurseService.saveNurse(nurse);
                }
                case RECEPTIONIST -> {
                    Receptionist recep = new Receptionist(acc);
                    recep.updateProfile(req.details());
                    recepService.saveReceptionist(recep);
                }
                case PHARMACIST -> {
                    Pharmacist pharma = new Pharmacist(acc);
                    pharma.updateProfile(req.details());
                    pharmaService.savePharmacist(pharma);
                }
                case PATIENT -> {
                    Patient pat = new Patient(acc);
                    pat.updateProfile(req.details());
                    patService.savePatient(pat);
                }
                default -> {}
            }
        } catch (UsernameNotFoundException | IllegalArgumentException e) {
            return new ValidationResponse(false, e.getMessage());
        } catch (NullPointerException e) {
            return new ValidationResponse(false, "Malformed request sent.");
        }

        return new ValidationResponse(true, "SUCCESS");
    }

    @PostMapping("/change-username")
    public ValidationResponse changeUsername(
            @RequestBody String username, @AuthenticationPrincipal UserDetails userDetails) {

        try {
            String oldUsername = userDetails.getUsername();
            String newUsername = username.trim();

            if (!AccountService.checkUsername(newUsername))
                return new ValidationResponse(false, "Username '" + newUsername + "' is invalid.");

            try {
                accService.setNewUsername(oldUsername, newUsername);
            } catch (UsernameNotFoundException | IllegalArgumentException e) {
                return new ValidationResponse(false, e.getMessage());
            }
        } catch (NullPointerException e) {
            return new ValidationResponse(false, "Malformed request sent.");
        }

        return new ValidationResponse(true, "SUCCESS");
    }
}
