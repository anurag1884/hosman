/* (C)2026 */
package hosman.repo.roles;

import hosman.entity.roles.Patient;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByAccountId(Long id);
}
