/* (C)2026 */
package hosman.service.roles;

import hosman.entity.Account;
import hosman.entity.roles.Admin;
import hosman.repo.roles.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository repo;

    public AdminService(AdminRepository repo) {

        this.repo = repo;
    }

    public Admin getAdmin(Long id) {

        return repo.findByAccountId(id).get();
    }

    public Admin getAdmin(Account acc) {

        return getAdmin(acc.getId());
    }

    public Admin saveAdmin(Admin admin) {

        return repo.save(admin);
    }

    public void deleteAdmin(Admin admin) {

        repo.delete(admin);
    }
}
