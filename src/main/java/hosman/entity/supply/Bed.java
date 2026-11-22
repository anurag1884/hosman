package hosman.entity.supply;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name = "beds")
public class Bed {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    public Long bedNumber;

    @Column(nullable = false)
    public Long pricePerDay;

    // No-argument constructor required by JPA
    protected Bed() {}

    public Bed(Long bedNumber, Long pricePerDay) {

        this.bedNumber = bedNumber;
        this.pricePerDay = pricePerDay;
    }

    public Long getId() {

        return id;
    }
}
