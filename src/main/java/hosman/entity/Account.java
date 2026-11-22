/* (C)2026 */
package hosman.entity;

import hosman.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
    @Enumerated(EnumType.STRING)
    public Role role;

    // No-argument constructor required by JPA
    protected Account() {}

    public Account(String username, String hashedPassword, Role role) {

        this.username = username;
        this.hashedPassword = hashedPassword;
        this.role = role;
    }

    public Long getId() {

        return id;
    }
}
