package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Account;
import hosman.entity.Doctor;
import hosman.repo.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository docRepo;

    public DoctorService(DoctorRepository repo) {

        this.docRepo = repo;

    }

    public Doctor getDoctor(Account acc) {

        return docRepo.findByAccountId(acc.getId()).get();

    }

    public Doctor saveDoctor(Doctor doctor) {

        return docRepo.save(doctor);

    }

    public void deleteDoctor(Doctor doctor) {

        docRepo.delete(doctor);

    }

}
