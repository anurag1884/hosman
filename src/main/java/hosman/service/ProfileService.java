/* (C)2026 */
package hosman.service;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.repo.ProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepo;

    public ProfileService(ProfileRepository profileRepo) {

        this.profileRepo = profileRepo;
    }

    public Profile getProfile(Long accId) {

        return profileRepo.findByAccountId(accId).get();
    }

    public Profile getProfile(Account acc) {

        return getProfile(acc.getId());
    }

    public Profile saveProfile(Profile profile) {

        return profileRepo.save(profile);
    }

    public void deleteProfile(Profile profile) {

        profileRepo.delete(profile);
    }

    //
    // Static methods
    //

    public static boolean checkName(String name) {

        return name.matches("[a-zA-Z]+(?:[ '-][a-zA-Z]+)*");
    }

    public static boolean checkEmail(String email) {

        return email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}");
    }

    public static boolean checkPhoneNumber(String phoneNumber) {

        return phoneNumber.matches("\\+?[0-9 ()-]{7,20}");
    }
}
