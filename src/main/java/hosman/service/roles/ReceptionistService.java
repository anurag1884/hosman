/* (C)2026 */
package hosman.service.roles;

import hosman.entity.Account;
import hosman.entity.roles.Receptionist;
import hosman.repo.roles.ReceptionistRepository;
import org.springframework.stereotype.Service;

@Service
public class ReceptionistService {

    private final ReceptionistRepository repo;

    public ReceptionistService(ReceptionistRepository repo) {

        this.repo = repo;
    }

    public Receptionist get(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Receptionist get(Account acc) {

        return get(acc.getId());
    }

    public Receptionist save(Receptionist recep) {

        return repo.save(recep);
    }

    public void delete(Receptionist recep) {

        repo.delete(recep);
    }
}
