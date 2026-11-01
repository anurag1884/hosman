package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Receptionist;
import hosman.repo.ReceptionistRepository;

@Service
public class ReceptionistService {

    private final ReceptionistRepository recepRepo;

    public ReceptionistService(ReceptionistRepository repo) {

        this.recepRepo = repo;

    }

    public Receptionist saveReceptionist(Receptionist receptionist) {

        return this.recepRepo.save(receptionist);

    }

}
