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

    public Nurse get(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Nurse get(Account acc) {

        return get(acc.getId());
    }

    public Nurse save(Nurse nurse) {

        return repo.save(nurse);
    }

    public void delete(Nurse nurse) {

        repo.delete(nurse);
    }
}
