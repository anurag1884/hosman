package hosman.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hosman.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientIdAndDoctorId(Long patientId, Long doctorId);

    // List<Appointment> findByPatientAccountUsername(String username);

    // List<Appointment> findByDoctorAccountUsername(String username);

    // List<Appointment> findByPatientAccountUsernameAndDoctorAccountUsername(
    //         String patientUsername, String doctorUsername);

    // List<Appointment> findByStatus(String status);

}
