/* (C)2026 */
package hosman.repo;

import hosman.entity.Profile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByAccountId(Long id);
}
