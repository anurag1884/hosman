package hosman.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Doctor;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByAccountUsername(String username);

}
