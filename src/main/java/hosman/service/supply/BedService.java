/* (C)2026 */
package hosman.service.supply;

import hosman.entity.supply.Bed;
import hosman.repo.supply.BedRepository;
import org.springframework.stereotype.Service;

@Service
public class BedService {

    private final BedRepository repo;

    public BedService(BedRepository repo) {

        this.repo = repo;
    }

    public Bed get(Long bedNumber) {

        return repo.findByBedNumber(bedNumber).get();
    }

    public Bed save(Bed Bed) {

        return repo.save(Bed);
    }

    public void delete(Bed Bed) {

        repo.delete(Bed);
    }
}
