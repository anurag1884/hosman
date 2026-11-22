/* (C)2026 */
package hosman.service.roles;

import hosman.entity.Account;
import hosman.entity.roles.Patient;
import hosman.repo.roles.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    private final PatientRepository repo;

    public PatientService(PatientRepository repo) {

        this.repo = repo;
    }

    public Patient getPatient(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Patient getPatient(Account acc) {

        return getPatient(acc.getId());
    }

    public Patient savePatient(Patient pat) {

        return repo.save(pat);
    }

    public void deletePatient(Patient pat) {

        repo.delete(pat);
    }
}
