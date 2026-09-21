package hosman.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // List<Appointment> findByPatientId(Long patientId);

    // List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientAccountUsername(String username);

    List<Appointment> findByDoctorAccountUsername(String username);

    List<Appointment> findByPatientAccountUsernameAndDoctorAccountUsername(
            String patientUsername, String doctorUsername);

    List<Appointment> findByStatus(String status);

}
