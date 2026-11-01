package hosman.service;

import org.springframework.stereotype.Service;

import hosman.entity.Appointment;
import hosman.repo.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointRepo;

    public AppointmentService(AppointmentRepository appointRepo) {

        this.appointRepo = appointRepo;

    }

    public Appointment saveAppointment(Appointment appointment) {

        return this.appointRepo.save(appointment);

    }

}
