package hosman.entity.supply;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name = "wards")
public class Ward {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    public String name;

    // No-argument constructor required by JPA
    protected Ward() {}

    public Ward(String name) {

        this.name = name;
    }

    public Long getId() {

        return id;
    }
}
