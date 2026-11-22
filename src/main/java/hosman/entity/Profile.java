/* (C)2026 */
package hosman.entity;

import hosman.enums.Gender;
import hosman.request.profile.EditProfileRequest;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@MappedSuperclass
public abstract class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    public String firstName;

    public String middleName;

    public String lastName;

    public Gender gender;

    public LocalDate dob;

    public String address;

    public String email;

    public String phone;

    // No-argument constructor required by JPA
    protected Profile() {}

    public void updateProfile(EditProfileRequest req) throws IllegalArgumentException {

        String firstName = req.firstName().trim();

        if (!checkName(firstName))
            throw new IllegalArgumentException("First name '" + firstName + "' is invalid.");

        this.firstName = firstName;

        String middleName = req.middleName().trim();

        if (middleName.isEmpty()) middleName = null;
        else {
            if (!checkName(middleName))
                throw new IllegalArgumentException("Middle name '" + middleName + "' is invalid.");

            this.middleName = middleName;
        }

        String lastName = req.lastName().trim();

        if (!checkName(lastName))
            throw new IllegalArgumentException("Last name '" + lastName + "' is invalid.");

        this.lastName = lastName;

        String genderString = req.gender().trim();

        try {
            Gender gender = Gender.valueOf(genderString);
            this.gender = gender;
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Gender '" + genderString + "' is invalid.");
        }

        String dobString = req.dob().trim();

        try {
            LocalDate dob = LocalDate.parse(dobString);
            LocalDate now = LocalDate.now();

            if (dob.isAfter(now))
                throw new IllegalArgumentException(
                        "'"
                                + dob.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                                + "' is not a proper date of birth.");

            this.dob = dob;
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException(
                    "'" + dobString + "' is invalid. Please enter a valid date of birth.");
        }

        String email = req.email().trim();

        if (!checkEmail(email))
            throw new IllegalArgumentException(
                    "Email '" + email + "' is invalid. Please enter a valid email.");

        this.email = email;

        String phone = req.phone().trim();

        if (!checkPhoneNumber(phone))
            throw new IllegalArgumentException(
                    "Phone number '" + phone + "' is invalid. Please enter a valid phone number.");
        this.phone = phone;

        String address = req.address().trim();

        if (address.isEmpty()) throw new IllegalArgumentException("Please enter an address.");
        this.address = address;
    }

    public Long getId() {

        return id;
    }

    //
    // Static methods
    //

    private static boolean checkName(String name) {

        return name.matches("[a-zA-Z]+(?:[ '-][a-zA-Z]+)*");
    }

    private static boolean checkEmail(String email) {

        return email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}");
    }

    private static boolean checkPhoneNumber(String phoneNumber) {

        return phoneNumber.matches("\\+?[0-9 ()-]{7,20}");
    }
}
