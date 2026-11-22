/* (C)2026 */
package hosman.service;

import hosman.entity.Appointment;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Patient;
import hosman.repo.AppointmentRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentRepository appointRepo;

    public AppointmentService(AppointmentRepository appointRepo) {

        this.appointRepo = appointRepo;
    }

    public List<Appointment> getAppointmentByPatient(Patient patient) {

        return appointRepo.findByPatientId(patient.getId());
    }

    public List<Appointment> getAppointmentByDoctor(Doctor doctor) {

        return appointRepo.findByPatientId(doctor.getId());
    }

    public List<Appointment> getAppointmentByPatientAndDoctor(Patient patient, Doctor doctor) {

        return appointRepo.findByPatientIdAndDoctorId(patient.getId(), doctor.getId());
    }

    public Appointment saveAppointment(Appointment appointment) {

        return appointRepo.save(appointment);
    }

    public void deleteAppointment(Appointment appointment) {

        appointRepo.delete(appointment);
    }
}
