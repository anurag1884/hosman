/* (C)2026 */
package hosman.repo.supply;

import hosman.entity.supply.BloodBank;
import hosman.enums.BloodGroup;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodBankRepository extends JpaRepository<BloodBank, Long> {

    Optional<BloodBank> findByBloodGroup(BloodGroup bloodGroup);

    boolean existsByBloodGroup(BloodGroup bloodGroup);
}
