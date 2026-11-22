/* (C)2026 */
package hosman.entity.roles;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.enums.BloodGroup;
import hosman.enums.EmergencyContactRelation;
import hosman.request.profile.EditProfileRequest;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "patients")
public class Patient extends Profile {

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    public BloodGroup bloodGroup;

    public String emergencyContactName;

    public EmergencyContactRelation emergencyContactRelation;

    public String emergencyContactPhone;

    public String allergies;

    // No-argument constructor required by JPA
    protected Patient() {}

    public Patient(Account account) {

        this.account = account;
    }

    @Override
    public void updateProfile(EditProfileRequest req) throws IllegalArgumentException {
        super.updateProfile(req);

        String bloodGroupString = req.bloodGroup();
        if (req.bloodGroup() != null) {
            bloodGroupString = bloodGroupString.trim();
            try {
                BloodGroup bloodGroup = BloodGroup.valueOf(bloodGroupString);
                this.bloodGroup = bloodGroup;
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException(
                        "Blood group '" + bloodGroupString + "' is invalid.");
            }
        }

        String name = req.emergencyContactName();
        if (name != null)
            emergencyContactName = name.trim();

        String relationString = req.emergencyContactRelation();
        if (relationString != null) {
            relationString = relationString.trim();
            try {
                EmergencyContactRelation relation = EmergencyContactRelation.valueOf(relationString);
                emergencyContactRelation = relation;
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException(
                        "Emergency contact relation '" + relationString + "' is invalid.");
            }
        }

        String phone = req.emergencyContactPhone();
        if (phone != null)
            emergencyContactPhone = phone.trim();

        String all = req.allergies();
        if (all != null)
            allergies = all.trim();
    }

    public Long getId() {

        return id;
    }

    public Account getAccount() {

        return account;
    }
}
