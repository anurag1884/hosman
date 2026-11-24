/* (C)2026 */
package hosman.repo.roles;

import hosman.entity.roles.Pharmacist;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PharmacistRepository extends JpaRepository<Pharmacist, Long> {

    Optional<Pharmacist> findByAccountId(Long id);
}
