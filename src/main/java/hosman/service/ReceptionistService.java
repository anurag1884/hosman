package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Account;
import hosman.entity.Receptionist;
import hosman.repo.ReceptionistRepository;

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
