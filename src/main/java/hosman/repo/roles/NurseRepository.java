/* (C)2026 */
package hosman.repo.roles;

import hosman.entity.roles.Nurse;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NurseRepository extends JpaRepository<Nurse, Long> {

    Optional<Nurse> findByAccountId(Long id);
}
