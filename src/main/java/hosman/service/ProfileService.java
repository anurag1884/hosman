package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.repo.ProfileRepository;

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

}
