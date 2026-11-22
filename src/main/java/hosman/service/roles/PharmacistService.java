/* (C)2026 */
package hosman.service.roles;

import hosman.entity.Account;
import hosman.entity.roles.Pharmacist;
import hosman.repo.roles.PharmacistRepository;
import org.springframework.stereotype.Service;

@Service
public class PharmacistService {

    private final PharmacistRepository repo;

    public PharmacistService(PharmacistRepository repo) {

        this.repo = repo;
    }

    public Pharmacist getPharmacist(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Pharmacist getPharmacist(Account acc) {

        return getPharmacist(acc.getId());
    }

    public Pharmacist savePharmacist(Pharmacist pharma) {

        return repo.save(pharma);
    }

    public void deletePharmacist(Pharmacist pharma) {

        repo.delete(pharma);
    }
}
