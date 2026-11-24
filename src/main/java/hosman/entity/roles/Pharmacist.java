/* (C)2026 */
package hosman.entity.roles;

import hosman.dto.request.edit.EditProfileRequest;
import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.except.FieldException;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "pharmacists")
public class Pharmacist extends Profile {

    public String qualification;

    public Integer yearsOfExperience;

    // @Column(nullable = false)
    // public boolean isAvailable;

    // No-argument constructor required by JPA
    protected Pharmacist() {}

    public Pharmacist(Account account) {

        this.account = account;
    }

    @Override
    public void updateProfile(EditProfileRequest req) throws FieldException {
        super.updateProfile(req);

        qualification = req.qualification();

        yearsOfExperience = req.yearsOfExperience();
    }
}
