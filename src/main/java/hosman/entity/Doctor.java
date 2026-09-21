package hosman.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import hosman.enums.Gender;

@Entity
@Table(name = "doctors")
public class Doctor {

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
    public int yearsOfExperience;

    @Column(nullable = false)
    public Gender gender;

    @Column(nullable = false)
    public String specialization;

    @Column(nullable = false)
    public String phoneNumber;

    public Doctor(Account account, String firstName, String middleName, String lastName, int age, int yearsOfExperience,
            Gender gender, String specialization, String phoneNumber) {

        this.account = account;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.age = age;
        this.yearsOfExperience = yearsOfExperience;
        this.gender = gender;
        this.specialization = specialization;
        this.phoneNumber = phoneNumber;

    }

    public Long getID() {

        return this.id;

    }

    public Account getAccount() {

        return this.account;

    }

}
