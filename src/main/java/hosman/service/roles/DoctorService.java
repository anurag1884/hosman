/* (C)2026 */
package hosman.service.roles;

import hosman.entity.Account;
import hosman.entity.roles.Doctor;
import hosman.repo.roles.DoctorRepository;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    private final DoctorRepository repo;

    public DoctorService(DoctorRepository repo) {

        this.repo = repo;
    }

    public Doctor get(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Doctor get(Account acc) {

        return get(acc.getId());
    }

    public Doctor save(Doctor doc) {

        return repo.save(doc);
    }

    public void delete(Doctor doc) {

        repo.delete(doc);
    }
}
