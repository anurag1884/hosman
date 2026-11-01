package hosman.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
@Table(name = "nurses")
public class Nurse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    public String department;

    public String qualification;

    public String specialization;

    public Integer yearsOfExperience;

    // @Column(nullable = false)
    // public boolean isAvailable;

    // No-argument constructor required by JPA
    protected Nurse() {
    }

    public Nurse(Account account) {

        this.account = account;

    }

    public Long getId() {

        return this.id;

    }

    public Account getAccount() {

        return this.account;

    }

}
