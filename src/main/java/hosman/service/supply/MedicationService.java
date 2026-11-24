/* (C)2026 */
package hosman.service.supply;

import hosman.entity.supply.Medication;
import hosman.repo.supply.MedicationRepository;
import org.springframework.stereotype.Service;

@Service
public class MedicationService {

    private final MedicationRepository repo;

    public MedicationService(MedicationRepository repo) {

        this.repo = repo;
    }

    public Medication get(Long id) {

        return repo.findById(id).get();
    }

    public Medication save(Medication Medication) {

        return repo.save(Medication);
    }

    public void delete(Medication Medication) {

        repo.delete(Medication);
    }
}
