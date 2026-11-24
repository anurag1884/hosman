/* (C)2026 */
package hosman.entity.roles;

import hosman.common.CheckValidation;
import hosman.dto.request.edit.EditProfileRequest;
import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.enums.BloodGroup;
import hosman.enums.EmergencyContactRelation;
import hosman.enums.EnumParser;
import hosman.except.FieldException;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "patients")
public class Patient extends Profile {

    public BloodGroup bloodGroup;

    public String emergencyContactName;

    @Enumerated(EnumType.STRING)
    public EmergencyContactRelation emergencyContactRelation;

    public String emergencyContactPhone;

    public String allergies;

    // No-argument constructor required by JPA
    protected Patient() {}

    public Patient(Account account) {

        this.account = account;
    }

    @Override
    public void updateProfile(EditProfileRequest req) throws FieldException {

        super.updateProfile(req);

        String bloodGroupString = req.bloodGroup();
        if (req.bloodGroup() != null) {
            bloodGroupString = bloodGroupString.trim();
            BloodGroup bloodGroup =
                    EnumParser.parseEnum(BloodGroup.class, bloodGroupString, "Blood group");
            this.bloodGroup = bloodGroup;
        }

        String name = req.emergencyContactName();
        if (name != null) {
            name = name.trim();
            CheckValidation.checkName(name, "Emergency contact name");
            emergencyContactName = name;
        }

        String relationString = req.emergencyContactRelation();
        if (relationString != null) {
            relationString = relationString.trim();
            EmergencyContactRelation relation =
                    EnumParser.parseEnum(
                            EmergencyContactRelation.class,
                            relationString,
                            "Emergency contact relation");
            emergencyContactRelation = relation;
        }

        String phone = req.emergencyContactPhone();
        if (phone != null) {
            phone = phone.trim();
            CheckValidation.checkPhoneNumber(phone, "Emergency phone number");
            emergencyContactPhone = phone;
        }

        String all = req.allergies();
        if (all != null) allergies = all.trim();
    }
}
