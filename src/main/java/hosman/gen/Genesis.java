/* (C)2026 */
package hosman.gen;

import hosman.entity.roles.Admin;
import hosman.entity.supply.BloodBank;
import hosman.enums.BloodGroup;
import hosman.enums.Role;
import hosman.service.AccountService;
import hosman.service.roles.AdminService;
import hosman.service.supply.BloodBankService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Genesis {

    private final AccountService accService;

    private final AdminService adminService;

    private final BloodBankService bloodBankService;

    public Genesis(
            AccountService accService,
            AdminService adminService,
            BloodBankService bloodBankService) {

        this.accService = accService;

        this.adminService = adminService;

        this.bloodBankService = bloodBankService;
    }

    @Bean
    CommandLineRunner createAdmin() {

        return args -> {
            if (!accService.exists("admin")) {
                adminService.save(new Admin(accService.create("admin", "1234", Role.ADMIN)));
                System.out.println("Admin account created");
            }
        };
    }

    @Bean
    CommandLineRunner createBloodBank() {

        return args -> {
            for (BloodGroup bloodGroup : BloodGroup.values())
                if (!bloodBankService.exists(bloodGroup)) {
                    bloodBankService.save(new BloodBank(bloodGroup, 0l));
                    System.out.println(bloodGroup.toString() + " blood bank created");
                }
        };
    }
}
