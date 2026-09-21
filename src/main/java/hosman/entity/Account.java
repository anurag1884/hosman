package hosman.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    public String username;

    @Column(nullable = false)
    public String hashedPassword;

    @Column(nullable = false)
    public String role;

    // No-argument constructor required by JPA
    protected Account() {
    }

    public Account(String username, String hashedPassword, String role) {

        this.username = username;
        this.hashedPassword = hashedPassword;
        this.role = role;

    }

    public Long getID() {

        return this.id;

    }

}
