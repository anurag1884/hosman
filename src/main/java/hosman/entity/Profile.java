/* (C)2026 */
package hosman.entity;

import hosman.common.CheckValidation;
import hosman.dto.request.edit.EditProfileRequest;
import hosman.enums.EnumParser;
import hosman.enums.Gender;
import hosman.except.FieldException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@MappedSuperclass
public abstract class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    protected Account account;

    public String firstName;

    public String middleName;

    public String lastName;

    @Enumerated(EnumType.STRING)
    public Gender gender;

    public LocalDate dob;

    public String address;

    public String email;

    public String phone;

    // No-argument constructor required by JPA
    protected Profile() {}

    public void updateProfile(EditProfileRequest req) throws FieldException {

        String firstName = req.firstName().trim();
        CheckValidation.checkName(firstName, "First name");
        this.firstName = firstName;

        String middleName = req.middleName().trim();
        if (middleName.isEmpty()) middleName = null;
        else {
            CheckValidation.checkName(middleName, "Middle name");
            this.middleName = middleName;
        }

        String lastName = req.lastName().trim();
        CheckValidation.checkName(lastName, "Last name");
        this.lastName = lastName;

        String genderString = req.gender().trim();
        Gender gender = EnumParser.parseEnum(Gender.class, genderString, "Gender");
        this.gender = gender;

        String dobString = req.dob().trim();
        try {
            LocalDate dob = LocalDate.parse(dobString);
            LocalDate now = LocalDate.now();
            if (dob.isAfter(now))
                throw new FieldException(
                        "'"
                                + dob.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                                + "' is not a proper date of birth.");
            this.dob = dob;
        } catch (DateTimeParseException e) {
            throw new FieldException(
                    "'" + dobString + "' is invalid. Please enter a valid date of birth.");
        }

        String email = req.email().trim();
        CheckValidation.checkEmail(email);
        this.email = email;

        String phone = req.phone().trim();
        CheckValidation.checkPhoneNumber(phone, "Phone number");
        this.phone = phone;

        String address = req.address().trim();
        if (address.isEmpty()) throw new FieldException("Please enter an address.");
        this.address = address;
    }

    public Account getAccount() {

        return account;
    }

    public Long getId() {

        return id;
    }
}
