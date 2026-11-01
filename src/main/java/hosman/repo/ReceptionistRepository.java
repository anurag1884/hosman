package hosman.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Receptionist;

public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {

    Optional<Receptionist> findByAccountUsername(String username);

}
