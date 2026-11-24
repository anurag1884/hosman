/* (C)2026 */
package hosman.entity.supply;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "beds")
public class Bed {

    @Id
    @Column(nullable = false)
    public Long bedNumber;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ward_id", nullable = false, unique = true)
    private Ward ward;

    @Column(nullable = false)
    public Long pricePerDay;

    // No-argument constructor required by JPA
    protected Bed() {}

    public Bed(Ward ward, Long bedNumber, Long pricePerDay) {

        this.ward = ward;
        this.bedNumber = bedNumber;
        this.pricePerDay = pricePerDay;
    }

    public Ward getWard() {

        return ward;
    }
}
