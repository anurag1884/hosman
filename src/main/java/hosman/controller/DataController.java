/* (C)2026 */
package hosman.controller;

import hosman.service.AccountService;
import hosman.service.roles.AdminService;
import hosman.service.roles.DoctorService;
import hosman.service.roles.NurseService;
import hosman.service.roles.PatientService;
import hosman.service.roles.PharmacistService;
import hosman.service.roles.ReceptionistService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

    private final AccountService accService;

    private final AdminService adminService;
    private final DoctorService docService;
    private final NurseService nurseService;
    private final ReceptionistService recepService;
    private final PharmacistService pharmaService;
    private final PatientService patService;

    public DataController(
            AccountService accService,
            AdminService adminService,
            DoctorService docService,
            NurseService nurseService,
            ReceptionistService recepService,
            PharmacistService pharmaService,
            PatientService patService) {

        this.accService = accService;

        this.adminService = adminService;
        this.docService = docService;
        this.nurseService = nurseService;
        this.recepService = recepService;
        this.pharmaService = pharmaService;
        this.patService = patService;
    }

    //
    // Endpoints
    //

}
