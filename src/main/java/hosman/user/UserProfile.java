package hosman.user;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "users")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    public String role;

    // No-argument constructor required by JPA
    protected UserProfile() {
    }

    public UserProfile(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getID() {
        return this.id;
    }

}
