package hosman.user;

import org.springframework.boot.CommandLineRunner;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import hosman.controller.LoginController;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository repo,
            LoginController controller) {

        return args -> {

            if (repo.findByUsername("alice").isEmpty()) {
                controller.createUser("alice", "password123", "USER");

                System.out.println("Admin account created");
            }
        };
    }

}
