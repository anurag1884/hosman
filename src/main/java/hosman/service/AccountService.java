/* (C)2026 */
package hosman.service;

import hosman.entity.Account;
import hosman.entity.Appointment;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Patient;
import hosman.enums.Role;
import hosman.repo.AccountRepository;
import java.util.List;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public AccountService(
            PasswordEncoder encoder,
            AccountRepository accRepo,
            ProfileService profileService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PatientService patService,
            AppointmentService appointService) {

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

        Account acc = getAccount(username);

        return User.builder()
                .username(acc.username)
                .password(acc.hashedPassword)
                .roles(acc.role.name())
                .build();
    }

    public boolean accountExists(String username) {

        return accRepo.findByUsername(username).isPresent();
    }

    public Account getAccount(String username) throws UsernameNotFoundException {

        return accRepo.findByUsername(username)
                .orElseThrow(
                        () ->
                                new UsernameNotFoundException(
                                        "Account with username '"
                                                + username
                                                + "' does not exist."));
    }

    public Account setNewUsername(String oldUsername, String newUsername)
            throws UsernameNotFoundException, IllegalArgumentException {

        if (accountExists(newUsername))
            throw new IllegalArgumentException("Username '" + newUsername + "' is already taken.");

        Account acc = getAccount(oldUsername);

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
        return acc;
    }

    public Account createAccount(String username, String password, Role role) {
        return new Account(username, encoder.encode(password), role);
    }

    public Account saveAccount(Account acc) {

        return accRepo.save(acc);
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
            default -> {}
        }
        if (appoints != null)
            for (Appointment appoint : appoints) appointService.deleteAppointment(appoint);

        accRepo.delete(acc);
    }

    //
    // Static methods
    //

    public static boolean checkUsername(String username) {

        return username.matches("[a-zA-Z][a-zA-Z0-9]*");
    }
}
