package hosman.entity;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.time.LocalDate;

import hosman.enums.Gender;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    public String firstName;

    public String middleName;

    public String lastName;

    public Gender gender;

    public LocalDate dob;

    public Integer age;

    public String address;

    public String email;

    public String phoneNumber;

    // No-argument constructor required by JPA
    protected Profile() {
    }

    public Profile(Account account) {

        this.account = account;

    }

    public Long getId() {

        return id;

    }

    public Account getAccount() {

        return account;

    }

}
