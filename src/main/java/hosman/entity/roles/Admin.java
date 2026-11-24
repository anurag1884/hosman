/* (C)2026 */
package hosman.entity.roles;

import hosman.entity.Account;
import hosman.entity.Profile;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin extends Profile {

    // No-argument constructor required by JPA
    protected Admin() {}

    public Admin(Account account) {

        this.account = account;
    }
}
