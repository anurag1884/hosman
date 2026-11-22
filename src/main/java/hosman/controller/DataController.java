/* (C)2026 */
package hosman.controller;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.entity.roles.Nurse;
import hosman.entity.roles.Patient;
import hosman.entity.roles.Pharmacist;
import hosman.entity.roles.Receptionist;
import hosman.response.UserDetailsResponse;
import hosman.service.AccountService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

    private final AccountService accService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    public DataController(
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

    @GetMapping("/me")
    public UserDetailsResponse getLoggedInUser(@AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();

        if (!accService.accountExists(username)) return null;

        Account acc = accService.getAccount(username);
        return new UserDetailsResponse(acc.getId(), acc.username);
    }

    @PostMapping("/doctor/profile")
    public Profile getDoctorLoginProfile(@RequestBody UserDetailsResponse userDetails) {

        return docService.getDoctor(userDetails.accId());
    }

    @PostMapping("/nurse/profile")
    public Nurse getNurseLoginProfile(@RequestBody UserDetailsResponse userDetails) {

        return nurseService.getNurse(userDetails.accId());
    }

    @PostMapping("/receptionist/profile")
    public Receptionist getReceptionistLoginProfile(@RequestBody UserDetailsResponse userDetails) {

        return recepService.getReceptionist(userDetails.accId());
    }

    @PostMapping("/pharmacist/profile")
    public Pharmacist getPharmacistLoginProfile(@RequestBody UserDetailsResponse userDetails) {

        return pharmaService.getPharmacist(userDetails.accId());
    }

    @PostMapping("/patient/profile")
    public Patient getPatientLoginProfile(@RequestBody UserDetailsResponse userDetails) {

        return patService.getPatient(userDetails.accId());
    }
}
