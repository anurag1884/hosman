package hosman.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Patient;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByAccountUsername(String username);

}
