package hosman.service;

import java.util.List;

import org.springframework.stereotype.Service;

import hosman.entity.Appointment;
import hosman.entity.Doctor;
import hosman.entity.Patient;
import hosman.repo.AppointmentRepository;

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
