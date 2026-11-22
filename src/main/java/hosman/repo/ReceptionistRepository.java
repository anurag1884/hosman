/* (C)2026 */
package hosman.repo;

import hosman.entity.roles.Receptionist;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {

    Optional<Receptionist> findByAccountId(Long id);

    // Optional<Receptionist> findByAccountUsername(String username);
}
