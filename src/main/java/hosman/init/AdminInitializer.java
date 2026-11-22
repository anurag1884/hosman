/* (C)2026 */
package hosman.admin;

import hosman.entity.roles.Admin;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import hosman.service.AccountService;
import hosman.service.roles.AdminService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            AccountRepository accRepo, AccountService accService, AdminService adminService) {

        return args -> {
            if (accRepo.findByUsername("admin").isEmpty()) {
                adminService.saveAdmin(
                        new Admin(
                                accService.saveAccount(
                                        accService.createAccount("admin", "1234", Role.ADMIN))));
                System.out.println("Admin account created");
            }
        };
    }
}
