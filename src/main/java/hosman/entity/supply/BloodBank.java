package hosman.entity.supply;

import hosman.enums.BloodGroup;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name = "bloodbanks")
public class BloodBank {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    public BloodGroup bloodGroup;

    @Column(nullable = false)
    public Long units;

    // No-argument constructor required by JPA
    protected BloodBank() {}

    public BloodBank(BloodGroup bloodGroup, Long units) {
        
        this.bloodGroup = bloodGroup;
        this.units = units;
    }

    public Long getId() {

        return id;
    }
}
