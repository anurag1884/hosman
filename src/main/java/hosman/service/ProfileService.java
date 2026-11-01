package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.repo.ProfileRepository;

@Service
public class ProfileService {

    private final ProfileRepository profileRepo;

    public ProfileService(ProfileRepository repo) {

        this.profileRepo = repo;

    }

    public Profile getProfile(Account acc) {

        return this.profileRepo.findByAccountId(acc.getId()).get();

    }

    public Profile saveProfile(Profile profile) {

        return this.profileRepo.save(profile);

    }

}
