package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Patient;
import hosman.repo.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepo;

    public PatientService(PatientRepository repo) {

        this.patientRepo = repo;

    }

    public Patient savePatient(Patient patient) {

        return this.patientRepo.save(patient);

    }

}
