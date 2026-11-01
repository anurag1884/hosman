package hosman.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

import hosman.enums.AppointmentStatus;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Doctor doctor;

    @ManyToOne
    private Nurse nurse;

    @Column(nullable = false)
    public String description;

    @Column(nullable = false)
    public LocalDateTime appointmentTime;

    @Column(nullable = false)
    public AppointmentStatus status;

    // No-argument constructor required by JPA
    protected Appointment() {
    }

    public Appointment(Patient patient, Doctor doctor, Nurse nurse, String description, LocalDateTime appointmentTime,
            AppointmentStatus status) {

        this.patient = patient;
        this.doctor = doctor;
        this.nurse = nurse;
        this.description = description;
        this.appointmentTime = appointmentTime;
        this.status = status;

    }

    public Long getId() {

        return this.id;

    }

    public Patient getPatient() {

        return this.patient;

    }

    public Doctor getDoctor() {

        return this.doctor;

    }

}
