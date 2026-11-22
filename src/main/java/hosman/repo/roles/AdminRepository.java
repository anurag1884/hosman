/* (C)2026 */
package hosman.repo.roles;

import hosman.entity.roles.Admin;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByAccountId(Long id);
}
