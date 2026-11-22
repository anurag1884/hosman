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
@Table(name = "receptionists")
public class Receptionist extends Profile {

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    public Integer yearsOfExperience;

    // No-argument constructor required by JPA
    protected Receptionist() {}

    public Receptionist(Account account) {

        this.account = account;
    }

    @Override
    public void updateProfile(EditProfileRequest req) throws IllegalArgumentException {
        super.updateProfile(req);

        yearsOfExperience = req.yearsOfExperience();
    }

    public Long getId() {

        return id;
    }

    public Account getAccount() {

        return account;
    }
}
