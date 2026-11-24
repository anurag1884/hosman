/* (C)2026 */
package hosman.entity.roles;

import hosman.dto.request.edit.EditProfileRequest;
import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.except.FieldException;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "nurses")
public class Nurse extends Profile {

    public String department;

    public String qualification;

    public String specialization;

    public Integer yearsOfExperience;

    // @Column(nullable = false)
    // public boolean isAvailable;

    // No-argument constructor required by JPA
    protected Nurse() {}

    public Nurse(Account account) {

        this.account = account;
    }

    @Override
    public void updateProfile(EditProfileRequest req) throws FieldException {

        super.updateProfile(req);

        department = req.department();

        qualification = req.qualification();

        specialization = req.specialization();

        yearsOfExperience = req.yearsOfExperience();
    }
}
