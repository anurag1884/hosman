package hosman.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByAccountId(Long id);

}
