/* (C)2026 */
package hosman.entity.roles;

import hosman.entity.Account;
import hosman.entity.Profile;
import hosman.request.profile.EditProfileRequest;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "nurses")
public class Nurse extends Profile {

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

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
    public void updateProfile(EditProfileRequest req) throws IllegalArgumentException {
        super.updateProfile(req);

        department = req.department();

        qualification = req.qualification();

        specialization = req.specialization();

        yearsOfExperience = req.yearsOfExperience();
    }

    public Long getId() {

        return id;
    }

    public Account getAccount() {

        return account;
    }
}
