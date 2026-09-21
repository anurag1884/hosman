package hosman.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String username);

}
