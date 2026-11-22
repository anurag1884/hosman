/* (C)2026 */
package hosman.entity.roles;

import hosman.entity.Account;
import hosman.enums.EmergencyContactRelation;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    public String bloodGroup;

    public String emergencyContactName;

    public EmergencyContactRelation emergencyContactRelation;

    public String emergencyContactPhone;

    // No-argument constructor required by JPA
    protected Patient() {}

    public Patient(Account account) {

        this.account = account;
    }

    public Long getId() {

        return id;
    }

    public Account getAccount() {

        return account;
    }
}
