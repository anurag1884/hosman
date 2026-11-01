package hosman.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Nurse;

public interface NurseRepository extends JpaRepository<Nurse, Long> {

    Optional<Nurse> findByAccountUsername(String username);

}
