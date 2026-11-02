package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Account;
import hosman.entity.Nurse;
import hosman.repo.NurseRepository;

@Service
public class NurseService {

    private final NurseRepository nurseRepo;

    public NurseService(NurseRepository nurseRepo) {

        this.nurseRepo = nurseRepo;

    }

    public Nurse getNurse(Account acc) {

        return nurseRepo.findByAccountId(acc.getId()).get();

    }

    public Nurse saveNurse(Nurse nurse) {

        return nurseRepo.save(nurse);

    }

    public void deleteNurse(Nurse nurse) {

        nurseRepo.delete(nurse);

    }

}
