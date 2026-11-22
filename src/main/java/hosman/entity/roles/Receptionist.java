/* (C)2026 */
package hosman.entity.roles;

import hosman.entity.Account;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "receptionists")
public class Receptionist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    // No-argument constructor required by JPA
    protected Receptionist() {}

    public Receptionist(Account account) {

        this.account = account;
    }

    public Long getId() {

        return id;
    }

    public Account getAccount() {

        return account;
    }
}
