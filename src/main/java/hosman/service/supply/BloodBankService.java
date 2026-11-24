/* (C)2026 */
package hosman.service.supply;

import hosman.entity.supply.BloodBank;
import hosman.enums.BloodGroup;
import hosman.repo.supply.BloodBankRepository;
import org.springframework.stereotype.Service;

@Service
public class BloodBankService {

    private final BloodBankRepository repo;

    public BloodBankService(BloodBankRepository repo) {

        this.repo = repo;
    }

    public boolean exists(BloodGroup bloodGroup) {

        return repo.existsByBloodGroup(bloodGroup);
    }

    public BloodBank get(BloodGroup bloodGroup) {

        return repo.findByBloodGroup(bloodGroup).get();
    }

    public BloodBank save(BloodBank BloodBank) {

        return repo.save(BloodBank);
    }

    public void delete(BloodBank BloodBank) {

        repo.delete(BloodBank);
    }
}
