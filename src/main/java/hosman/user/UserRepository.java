package hosman.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUsername(String username);

}
