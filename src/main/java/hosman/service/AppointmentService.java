package hosman.service;

import java.util.List;

import org.springframework.stereotype.Service;

import hosman.entity.Appointment;
import hosman.repo.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointRepo;

    public AppointmentService(AppointmentRepository appointRepo) {

        this.appointRepo = appointRepo;

    }

    public List<Appointment> getAppointmentsByPatientUsername(String username) {

        return this.appointRepo.findByPatientAccountUsername(username);

    }

    public List<Appointment> getAppointmentsByDoctorUsername(String username) {

        return this.appointRepo.findByDoctorAccountUsername(username);

    }

    public List<Appointment> getAppointmentsByPatientAndDoctorUsername(String patientUsername, String doctorUsername) {

        return this.appointRepo.findByPatientAccountUsernameAndDoctorAccountUsername(patientUsername, doctorUsername);

    }

    public List<Appointment> getAllAppointments() {

        return this.appointRepo.findAll();

    }

    public Appointment saveAppointment(Appointment appointment) {

        return this.appointRepo.save(appointment);

    }

}
