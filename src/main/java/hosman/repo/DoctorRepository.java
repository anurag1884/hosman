/* (C)2026 */
package hosman.repo;

import hosman.entity.roles.Doctor;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByAccountId(Long id);

    // Optional<Doctor> findByAccountUsername(String username);
}
