package hosman.controller;

import java.util.Optional;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.response.UserDetailsResponse;
import hosman.service.AccountService;
import hosman.service.DoctorService;
import hosman.service.NurseService;
import hosman.service.PatientService;
import hosman.service.ProfileService;
import hosman.service.ReceptionistService;

@RestController
public class DataController {

    private final AccountService accService;
    private final ProfileService profileService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PatientService patService;

    public DataController(AccountService accService, DoctorService docService, NurseService nurseService,
            ReceptionistService recepService, PatientService patService, ProfileService profileService) {

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

    @GetMapping("/me")
    public UserDetailsResponse getLoggedInUser(@AuthenticationPrincipal UserDetails userDetails) {

        Optional<Account> queryAcc = accService.getAccount(userDetails.getUsername());

        if (!queryAcc.isPresent())
            return null;

        Account acc = queryAcc.get();

        return new UserDetailsResponse(acc.getId(), acc.username);

    }

    @PostMapping("/profile")
    public Profile getLoginProfile(@RequestBody UserDetailsResponse userDetails) {

        return profileService.getProfile(userDetails.accId());

    }

}