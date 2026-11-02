package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Account;
import hosman.entity.Patient;
import hosman.repo.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patRepo;

    public PatientService(PatientRepository patRepo) {

        this.patRepo = patRepo;

    }

    public Patient getPatient(Account acc) {

        return patRepo.findByAccountId(acc.getId()).get();

    }

    public Patient savePatient(Patient patient) {

        return patRepo.save(patient);

    }

    public void deletePatient(Patient patient) {

        patRepo.delete(patient);

    }

}
