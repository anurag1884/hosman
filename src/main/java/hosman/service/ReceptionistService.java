/* (C)2026 */
package hosman.service;

import hosman.entity.Account;
import hosman.entity.roles.Receptionist;
import hosman.repo.ReceptionistRepository;
import org.springframework.stereotype.Service;

@Service
public class ReceptionistService {

    private final ReceptionistRepository recepRepo;

    public ReceptionistService(ReceptionistRepository recepRepo) {

        this.recepRepo = recepRepo;
    }

    public Receptionist getReceptionist(Account acc) {

        return recepRepo.findByAccountId(acc.getId()).get();
    }

    public Receptionist saveReceptionist(Receptionist receptionist) {

        return recepRepo.save(receptionist);
    }

    public void deleteReceptionist(Receptionist receptionist) {

        recepRepo.delete(receptionist);
    }
}
