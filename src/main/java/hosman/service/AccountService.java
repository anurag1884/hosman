package hosman.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import hosman.entity.Account;
import hosman.entity.Appointment;
import hosman.entity.Doctor;
import hosman.entity.Patient;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import hosman.response.ValidationResponse;

@Service
public class AccountService implements UserDetailsService {

    private final PasswordEncoder encoder;

    private final AccountRepository accRepo;

    private final ProfileService profileService;

    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PatientService patService;

    private final AppointmentService appointService;

    public AccountService(PasswordEncoder encoder, AccountRepository accRepo, ProfileService profileService,
            DoctorService docService, NurseService nurseService, ReceptionistService recepService,
            PatientService patService, AppointmentService appointService) {

        this.encoder = encoder;

        this.accRepo = accRepo;

        this.profileService = profileService;

        this.docService = docService;
        this.nurseService = nurseService;
        this.recepService = recepService;
        this.patService = patService;

        this.appointService = appointService;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account acc = accRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));

        return User.builder()
                .username(acc.username)
                .password(acc.hashedPassword)
                .roles(acc.role.name())
                .build();

    }

    public Optional<Account> getAccount(String username) {
        return accRepo.findByUsername(username);
    }

    public Account setNewUsername(String oldUsername, String newUsername) {

        Account acc = accRepo.findByUsername(oldUsername)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Account with username '" + oldUsername + "' does not exist."));

        if (accRepo.findByUsername(newUsername).isPresent())
            return null;

        acc.username = newUsername;

        accRepo.save(acc);

        return acc;
    }

    public Account setNewPassword(Account acc, String currPassword, String newPassword) {

        String hashedPassword = encoder.encode(currPassword);

        if (acc.hashedPassword == hashedPassword) {

            acc.hashedPassword = hashedPassword;

            return saveAccount(acc);

        }

        return null;

    }

    public Account saveAccount(Account acc) {

        return accRepo.save(acc);

    }

    public Account saveAccount(String username, String password, Role role) {

        Account acc = new Account(username, encoder.encode(password), role);

        return saveAccount(acc);

    }

    public void deleteAccount(Account acc) {

        profileService.deleteProfile(profileService.getProfile(acc));

        List<Appointment> appoints = null;

        switch (acc.role) {
            case DOCTOR -> {
                Doctor doctor = docService.getDoctor(acc);
                appoints = appointService.getAppointmentByDoctor(doctor);
                docService.deleteDoctor(doctor);
            }
            case NURSE -> {
                nurseService.deleteNurse(nurseService.getNurse(acc));
            }
            case RECEPTIONIST -> {
                recepService.deleteReceptionist(recepService.getReceptionist(acc));
            }
            case PATIENT -> {
                Patient patient = patService.getPatient(acc);
                appoints = appointService.getAppointmentByPatient(patient);
                patService.deletePatient(patient);
            }
            default -> {
            }
        }

        if (appoints != null)
            for (Appointment appoint : appoints)
                appointService.deleteAppointment(appoint);

        accRepo.delete(acc);

    }

}
