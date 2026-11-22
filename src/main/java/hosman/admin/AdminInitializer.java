/* (C)2026 */
package hosman.admin;

import hosman.entity.Profile;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import hosman.service.AccountService;
import hosman.service.ProfileService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            AccountRepository accRepo, AccountService accService, ProfileService profileService) {

        return args -> {
            if (accRepo.findByUsername("admin").isEmpty()) {
                profileService.saveProfile(
                        new Profile(
                                accService.saveAccount(
                                        accService.createAccount("admin", "1234", Role.ADMIN))));
                System.out.println("Admin account created");
            }
        };
    }
}
