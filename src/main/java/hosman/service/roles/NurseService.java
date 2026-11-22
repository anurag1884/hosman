/* (C)2026 */
package hosman.service.roles;

import hosman.entity.Account;
import hosman.entity.roles.Nurse;
import hosman.repo.roles.NurseRepository;
import org.springframework.stereotype.Service;

@Service
public class NurseService {

    private final NurseRepository repo;

    public NurseService(NurseRepository repo) {

        this.repo = repo;
    }

    public Nurse getNurse(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Nurse getNurse(Account acc) {

        return getNurse(acc.getId());
    }

    public Nurse saveNurse(Nurse nurse) {

        return repo.save(nurse);
    }

    public void deleteNurse(Nurse nurse) {

        repo.delete(nurse);
    }
}
