package hosman.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.time.LocalDate;

import hosman.enums.Gender;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id", nullable = false, unique = true)
    private Account account;

    @Column(nullable = false)
    public String firstName;

    public String middleName;

    @Column(nullable = false)
    public String lastName;

    @Column(nullable = false)
    public int age;

    @Column(nullable = false)
    public String bloodGroup;

    @Column(nullable = false)
    public LocalDate dateOfBirth;

    @Column(nullable = false)
    public Gender gender;

    @Column(nullable = false)
    public String phoneNumber;

    public Patient(Account account, String firstName, String middleName, String lastName, int age, String bloodGroup,
            LocalDate dateOfBirth, Gender gender, String phoneNumber) {

        this.account = account;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.age = age;
        this.bloodGroup = bloodGroup;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;

    }

    public Long getID() {

        return this.id;

    }

    public Account getAccount() {

        return this.account;

    }

}
