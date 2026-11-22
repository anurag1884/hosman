/* (C)2026 */
package hosman.entity.roles;

import hosman.entity.Account;
import hosman.entity.Profile;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin extends Profile {

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    // No-argument constructor required by JPA
    protected Admin() {}

    public Admin(Account account) {

        this.account = account;
    }

    public Long getId() {

        return id;
    }

    public Account getAccount() {

        return account;
    }
}
