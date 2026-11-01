package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Doctor;
import hosman.repo.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository docRepo;

    public DoctorService(DoctorRepository repo) {

        this.docRepo = repo;

    }

    public Doctor saveDoctor(Doctor doctor) {

        return this.docRepo.save(doctor);

    }

}
