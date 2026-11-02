package hosman.controller;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Optional;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.enums.Gender;
import hosman.request.EditProfileRequest;
import hosman.request.PrivilegedEditProfileRequest;
import hosman.response.ValidationResponse;
import hosman.service.AccountService;
import hosman.service.ProfileService;
import jakarta.validation.Valid;

@RestController
public class ProfileController {

    private final AccountService accService;
    private final ProfileService profileService;

    public ProfileController(AccountService accService, ProfileService profileService) {

        this.accService = accService;
        this.profileService = profileService;

    }

    //
    // Endpoints
    //

    @PostMapping("/edit-profile")
    public ValidationResponse editProfile(@RequestBody EditProfileRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();

        Optional<Account> queryAcc = accService.getAccount(username);

        if (!queryAcc.isPresent())
            return new ValidationResponse(false, "Account with username '" + username + "' does not exist.");

        Account acc = queryAcc.get();

        Profile profile = profileService.getProfile(acc);

        String firstName = req.firstName();

        if (firstName != null) {
            firstName = firstName.trim();

            if (firstName.isEmpty())
                profile.firstName = null;
            else {
                if (!checkName(firstName))
                    return new ValidationResponse(false, "First name '" + firstName + "' is invalid.");

                profile.firstName = firstName;
            }
        }

        String middleName = req.middleName();

        if (middleName != null) {
            middleName = middleName.trim();

            if (middleName.isEmpty())
                profile.middleName = null;
            else {
                if (!checkName(middleName))
                    return new ValidationResponse(false, "Middle name '" + middleName + "' is invalid.");

                profile.middleName = middleName;
            }
        }

        String lastName = req.lastName();

        if (lastName != null) {
            lastName = lastName.trim();

            if (lastName.isEmpty())
                profile.lastName = null;
            else {
                if (!checkName(lastName))
                    return new ValidationResponse(false, "Last name '" + lastName + "' is invalid.");

                profile.lastName = lastName;
            }
        }

        String genderString = req.gender();

        if (genderString != null) {
            genderString = genderString.trim();

            if (genderString.isEmpty())
                profile.gender = null;
            else {
                try {
                    Gender gender = Gender.valueOf(genderString);
                    profile.gender = gender;
                } catch (IllegalArgumentException e) {
                    return new ValidationResponse(false, "Gender '" + genderString + "' is invalid.");
                }
            }
        }

        String dobString = req.dateOfBirth();

        if (dobString != null) {
            dobString = dobString.trim();

            if (dobString.isEmpty()) {
                profile.dob = null;
                profile.age = null;
            } else {
                try {
                    LocalDate dob = LocalDate.parse(dobString);
                    LocalDate now = LocalDate.now();

                    if (dob.isAfter(now))
                        return new ValidationResponse(false,
                                "'" + dob.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                                        + "' is not a proper date of birth.");

                    int age = Period.between(dob, now).getYears();

                    profile.dob = dob;
                    profile.age = age;
                } catch (DateTimeParseException e) {
                    return new ValidationResponse(false,
                            "'" + dobString + "' is invalid. Please enter a valid date of birth.");
                }
            }
        }

        String email = req.email();

        if (email != null) {
            email = email.trim();

            if (email.isEmpty())
                profile.email = null;
            else {
                if (!checkEmail(email))
                    return new ValidationResponse(false,
                            "Email '" + email + "' is invalid. Please enter a valid email.");

                profile.email = email;
            }
        }

        String phoneNumber = req.phoneNumber();

        if (phoneNumber != null) {
            phoneNumber = phoneNumber.trim();

            if (phoneNumber.isEmpty())
                profile.phoneNumber = null;
            else {
                if (!checkPhoneNumber(phoneNumber))
                    return new ValidationResponse(false,
                            "Phone number '" + phoneNumber + "' is invalid. Please enter a valid phone number.");

                profile.phoneNumber = phoneNumber;
            }
        }

        profileService.saveProfile(profile);

        return new ValidationResponse(true, "SUCCESS");

    }

    @PostMapping
    public ValidationResponse privilegedEditProfile(@Valid @RequestBody PrivilegedEditProfileRequest req) {
        return new ValidationResponse(true, "SUCCESS");
    }

    @PostMapping("/change-username")
    public ValidationResponse changeUsername(@RequestBody String newUsername, @AuthenticationPrincipal UserDetails userDetails) {

        if (!checkUsername(newUsername))
            return new ValidationResponse(false, "Username '" + newUsername + "' is invalid.");

        String username = userDetails.getUsername();

        if (accService.setNewUsername(username, newUsername) == null)
            return new ValidationResponse(false, "Account with username '" + username + "' does not exist.");

        return new ValidationResponse(true, "SUCCESS");

    }

    // Static methods

    public static boolean checkUsername(String username) {

        return username.matches("[a-zA-Z][a-zA-Z0-9]*");

    }

    //
    // Private methods
    //

    private static boolean checkName(String name) {
        return name.matches("[a-zA-Z]+(?:[ '-][a-zA-Z]+)*");
    }

    private static boolean checkEmail(String email) {
        return email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}");
    }

    private static boolean checkPhoneNumber(String phoneNumber) {
        return phoneNumber.matches("\\+?[0-9 ()-]{7,20}");
    }

}
