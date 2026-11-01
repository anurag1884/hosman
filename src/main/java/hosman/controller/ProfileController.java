package hosman.controller;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hosman.controller.AuthController.AuthResponse;
import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.enums.Gender;
import hosman.service.AccountService;
import hosman.service.ProfileService;

@RestController
public class ProfileController {

    private final AccountService accService;
    private final ProfileService profileService;

    public ProfileController(AccountService accService, ProfileService profileService) {

        this.accService = accService;
        this.profileService = profileService;

    }

    @PostMapping("/user/edit-profile")
    public AuthResponse editProfile(@RequestBody EditProfileRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();

        Optional<Account> queryAcc = accService.getAccount(username);

        if (!queryAcc.isPresent())
            return new AuthResponse(false, "Username '" + username + "' does not exist.");

        Account acc = queryAcc.get();

        Profile profile = profileService.getProfile(acc);

        String firstName = req.firstName();

        if (firstName != null) {
            firstName = firstName.trim();

            if (!checkName(firstName))
                return new AuthResponse(false, "First name '" + firstName + "' is invalid.");

            profile.firstName = firstName;
        }

        String middleName = req.middleName();

        if (middleName != null) {
            middleName = middleName.trim();

            if (!middleName.isEmpty() && !checkName(middleName))
                return new AuthResponse(false, "Middle name '" + middleName + "' is invalid.");

            profile.middleName = middleName;
        }

        String lastName = req.lastName();

        if (lastName != null) {
            lastName = lastName.trim();

            if (!checkName(lastName))
                return new AuthResponse(false, "Last name '" + lastName + "' is invalid.");

            profile.lastName = lastName;
        }

        Gender gender = req.gender();

        if (gender != null)
            profile.gender = gender;

        LocalDate dob = req.dateOfBirth();

        if (dob != null) {
            LocalDate now = LocalDate.now();

            if (dob.isAfter(now))
                return new AuthResponse(false, "Invalid DOB '" + dob.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                        + "'. Please select a proper DOB.");

            int age = Period.between(dob, now).getYears();

            profile.dob = dob;
            profile.age = age;
        }

        String email = req.email();

        if (email != null) {
            email = email.trim();

            if (!checkEmail(email))
                return new AuthResponse(false,
                        "Invalid email '" + email + "'. Please enter a valid email.");

            profile.email = email;
        }

        String phoneNumber = req.phoneNumber();

        if (phoneNumber != null) {
            phoneNumber = phoneNumber.trim();

            if (!checkPhoneNumber(phoneNumber))
                return new AuthResponse(false,
                        "Invalid phone number '" + phoneNumber + "'. Please enter a valid phone number.");

            profile.phoneNumber = phoneNumber;
        }

        profileService.saveProfile(profile);

        return new AuthResponse(true, "SUCCESS");

    }

    //
    // Private methods
    //
    private boolean checkName(String name) {
        return name.matches("[a-zA-Z]+(?:[ '-][a-zA-Z]+)*");
    }

    private boolean checkEmail(String email) {
        return email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}");
    }

    private boolean checkPhoneNumber(String phoneNumber) {
        return phoneNumber.matches("\\+?[0-9 ()-]{7,20}");
    }

    //
    // Records
    //

    public record EditProfileRequest(
            String firstName,
            String middleName,
            String lastName,
            Gender gender,
            LocalDate dateOfBirth,
            String address,
            String email,
            String phoneNumber) {
    }

}
