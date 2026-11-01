package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Nurse;
import hosman.repo.NurseRepository;

@Service
public class NurseService {

    private final NurseRepository nurseRepo;

    public NurseService(NurseRepository repo) {

        this.nurseRepo = repo;

    }

    public Nurse saveNurse(Nurse nurse) {

        return this.nurseRepo.save(nurse);

    }

}
