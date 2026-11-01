package hosman.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

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

    // No-argument constructor required by JPA
    protected Patient() {
    }

    public Patient(Account account) {

        this.account = account;

    }

    public Patient(Account account, String bloodGroup) {

        this.account = account;
        this.bloodGroup = bloodGroup;

    }

    public Long getId() {

        return this.id;

    }

    public Account getAccount() {

        return this.account;

    }

}
