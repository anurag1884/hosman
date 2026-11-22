/* (C)2026 */
package hosman.controller;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.request.profile.EditProfileRequest;
import hosman.request.profile.PrivilegedEditProfileRequest;
import hosman.response.ValidationResponse;
import hosman.service.AccountService;
import hosman.service.ProfileService;
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
    private final ProfileService profileService;

    public ProfileController(AccountService accService, ProfileService profileService) {

        this.accService = accService;
        this.profileService = profileService;
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

            Profile profile = profileService.getProfile(acc);
            profile.updateProfile(req.details());
            profileService.saveProfile(profile);
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
