/* (C)2026 */
package hosman.repo.supply;

import hosman.entity.supply.Bed;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BedRepository extends JpaRepository<Bed, Long> {

    Optional<Bed> findByBedNumber(Long bedNumber);
}
