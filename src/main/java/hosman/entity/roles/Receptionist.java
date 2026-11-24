/* (C)2026 */
package hosman.entity.roles;

import hosman.dto.request.edit.EditProfileRequest;
import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.except.FieldException;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "receptionists")
public class Receptionist extends Profile {

    public Integer yearsOfExperience;

    // No-argument constructor required by JPA
    protected Receptionist() {}

    public Receptionist(Account account) {

        this.account = account;
    }

    @Override
    public void updateProfile(EditProfileRequest req) throws FieldException {
        super.updateProfile(req);

        yearsOfExperience = req.yearsOfExperience();
    }
}
