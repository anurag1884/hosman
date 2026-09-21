package hosman.admin;

import org.springframework.boot.CommandLineRunner;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import hosman.repo.AccountRepository;
import hosman.service.AccountService;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(AccountRepository repo, AccountService service) {

        return args -> {

            if (repo.findByUsername("admin").isEmpty()) {
                service.saveAccount("admin", "1234", "ADMIN");
                System.out.println("Admin account created");
            }

        };

    }

}
