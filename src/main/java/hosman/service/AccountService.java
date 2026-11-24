/* (C)2026 */
package hosman.service;

import hosman.entity.Account;
import hosman.entity.Appointment;
import hosman.entity.roles.Doctor;
import hosman.entity.roles.Patient;
import hosman.enums.Role;
import hosman.except.ConflictException;
import hosman.except.NotFoundException;
import hosman.except.UnauthorizedException;
import hosman.repo.AccountRepository;
import hosman.service.roles.AdminService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
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

    private final AdminService adminService;
    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    private final AppointmentService appointService;

    public AccountService(
            PasswordEncoder encoder,
            AccountRepository accRepo,
            AdminService adminService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PharmacistService pharmaService,
            PatientService patService,
            AppointmentService appointService) {

        this.encoder = encoder;

        this.accRepo = accRepo;

        this.adminService = adminService;
        this.docService = docService;
        this.nurseService = nurseService;
        this.recepService = recepService;
        this.pharmaService = pharmaService;
        this.patService = patService;

        this.appointService = appointService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        try {
            Account acc = get(username);

            return User.builder()
                    .username(acc.username)
                    .password(acc.hashedPassword)
                    .roles(acc.role.name())
                    .build();
        } catch (NotFoundException e) {
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    public boolean exists(String username) {

        return accRepo.existsByUsername(username);
    }

    public Account get(String username) throws NotFoundException {

        return accRepo.findByUsername(username)
                .orElseThrow(
                        () -> new NotFoundException("Username '" + username + "' does not exist."));
    }

    public Account create(String username, String password, Role role) {

        return new Account(username, encoder.encode(password), role);
    }

    public Account save(Account acc) {

        return accRepo.save(acc);
    }

    public void delete(Account acc) {

        List<Appointment> appoints = null;
        switch (acc.role) {
            case ADMIN -> adminService.delete(adminService.get(acc));

            case DOCTOR -> {
                Doctor doc = docService.get(acc);
                appoints = appointService.getAppointmentByDoctor(doc);
                docService.delete(doc);
            }
            case NURSE -> nurseService.delete(nurseService.get(acc));

            case RECEPTIONIST -> recepService.delete(recepService.get(acc));

            case PHARMACIST -> pharmaService.delete(pharmaService.get(acc));

            case PATIENT -> {
                Patient pat = patService.get(acc);
                appoints = appointService.getAppointmentByPatient(pat);
                patService.delete(pat);
            }
        }
        if (appoints != null)
            for (Appointment appoint : appoints) appointService.deleteAppointment(appoint);

        accRepo.delete(acc);
    }

    public Account updateCredentials(Account acc, String newUsername, String newPassword)
            throws ConflictException {

        if (exists(newUsername))
            throw new ConflictException("Username '" + newUsername + "' is already taken.");

        acc.username = newUsername;
        acc.hashedPassword = encoder.encode(newPassword);

        return save(acc);
    }

    public void verifyPassword(Account acc, String password) throws UnauthorizedException {

        if (!encoder.matches(password, acc.hashedPassword))
            throw new UnauthorizedException("Password is invalid. Try again.");
    }
}
