/* (C)2026 */
package hosman.repo;

import hosman.entity.Appointment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientIdAndDoctorId(Long patientId, Long doctorId);
}
