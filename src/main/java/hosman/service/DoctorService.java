package hosman.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import hosman.entity.Doctor;
import hosman.repo.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository docRepo;

    public DoctorService(DoctorRepository repo) {

        this.docRepo = repo;

    }

    public Doctor getDoctor(Long id) {

        return this.docRepo.findById(id).orElseThrow();

    }

    public Optional<Doctor> getDoctor(String username) {

        return this.docRepo.findByAccountUsername(username);

    }

    public List<Doctor> getAllDoctors() {

        return this.docRepo.findAll();

    }

    public Doctor saveDoctor(Doctor doctor) {

        return this.docRepo.save(doctor);

    }

}
