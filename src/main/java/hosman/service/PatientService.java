package hosman.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import hosman.entity.Patient;
import hosman.repo.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patRepo;

    public PatientService(PatientRepository repo) {

        this.patRepo = repo;

    }

    public Patient getPatient(Long id) {

        return this.patRepo.findById(id).orElseThrow();

    }

    public Optional<Patient> getPatient(String username) {

        return this.patRepo.findByAccountUsername(username);

    }

    public List<Patient> getAllPatients() {

        return this.patRepo.findAll();

    }

    public Patient savePatient(Patient patient) {

        return this.patRepo.save(patient);

    }

}
