package hosman.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByAccountId(Long id);
    
    // Optional<Patient> findByAccountUsername(String username);

}
