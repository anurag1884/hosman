package hosman.entity.supply;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name = "medications")
public class Medication {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String genericName;

    @Column(nullable = false)
    public String category;

    @Column(nullable = false)
    public String manufacturer;

    @Column(nullable = false)
    public String batchNumber;

    @Column(nullable = false)
    public Float price;

    @Column(nullable = false)
    public Long quantity;

    @Column(nullable = false)
    public Long reorderLevel;

    @Column(nullable = false)
    public LocalDate expiryDate;

    public String description;

    public String sideEffects;

    @Column(nullable = false)
    public boolean onlyPrescribed;

    // No-argument constructor required by JPA
    protected Medication() {}

    public Long getId() {

        return id;
    }
}
