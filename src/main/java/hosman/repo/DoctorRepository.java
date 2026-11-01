package hosman.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByAccountUsername(String username);

}
