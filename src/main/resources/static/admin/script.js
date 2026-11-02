/**
 * Central Application State Store
 */
const hospitalSystemState = {
  currentLoggedInUserProfile: null,

  accountsList: [
    // { username: "dr.arjun.mehta", role: "Admin" },
    // { username: "admin.vikram.sen", role: "Admin" },
    // { username: "dr.kavita.nair", role: "Doctor" },
    // { username: "dr.siddharth.roy", role: "Doctor" },
    // { username: "dr.farhan.akhtar", role: "Doctor" },
    // { username: "nurse.elena.das", role: "Nurse" },
    // { username: "nurse.soma.ghosh", role: "Nurse" },
    // { username: "nurse.david.ross", role: "Nurse" },
    // { username: "desk.riya.kapoor", role: "Receptionist" },
    // { username: "desk.amit.bose", role: "Receptionist" },
    // { username: "patient.rohan.verma", role: "Patient" },
    // { username: "patient.ananya.chatterjee", role: "Patient" },
    // { username: "patient.meera.iyer", role: "Patient" },
    // { username: "patient.kabir.khan", role: "Patient" },
  ],

  appointmentsList: [
    // {
    //   id: "APT-101",
    //   time: "09:00",
    //   patientName: "Rohan Verma",
    //   doctorName: "Dr. Kavita Nair",
    //   department: "Cardiology",
    //   status: "Confirmed",
    // },
    // {
    //   id: "APT-102",
    //   time: "09:30",
    //   patientName: "Ananya Chatterjee",
    //   doctorName: "Dr. Siddharth Roy",
    //   department: "Neurology",
    //   status: "Waiting",
    // },
    // {
    //   id: "APT-103",
    //   time: "10:15",
    //   patientName: "Meera Iyer",
    //   doctorName: "Dr. Farhan Akhtar",
    //   department: "Orthopedics",
    //   status: "Waiting",
    // },
    // {
    //   id: "APT-104",
    //   time: "11:00",
    //   patientName: "Kabir Khan",
    //   doctorName: "Dr. Kavita Nair",
    //   department: "Cardiology",
    //   status: "Confirmed",
    // },
    // {
    //   id: "APT-105",
    //   time: "11:45",
    //   patientName: "Suresh Menon",
    //   doctorName: "Dr. Siddharth Roy",
    //   department: "General Medicine",
    //   status: "Cancelled",
    // },
  ],

  billsList: [
    // {
    //   id: "INV-5001",
    //   patientName: "Rohan Verma",
    //   serviceName: "Consultation",
    //   paymentAmount: 120.0,
    //   date: "2026-11-01",
    //   isPaid: true,
    // },
    // {
    //   id: "INV-5002",
    //   patientName: "Ananya Chatterjee",
    //   serviceName: "MRI / Radiology Scan",
    //   paymentAmount: 450.0,
    //   date: "2026-11-01",
    //   isPaid: false,
    // },
    // {
    //   id: "INV-5003",
    //   patientName: "Meera Iyer",
    //   serviceName: "Physical Therapy",
    //   paymentAmount: 85.0,
    //   date: "2026-11-01",
    //   isPaid: true,
    // },
    // {
    //   id: "INV-5004",
    //   patientName: "Kabir Khan",
    //   serviceName: "Diagnostic Lab Panel",
    //   paymentAmount: 210.0,
    //   date: "2026-11-01",
    //   isPaid: false,
    // },
  ],

  sortingConfiguration: {
    users: { column: "username", direction: "asc" },
    appointments: { column: "time", direction: "asc" },
    opd: { column: "time", direction: "asc" },
  },
};

/* ========================================================================
       UTILITY HELPERS
       ======================================================================== */
async function sendRequest(url, request) {
  const response = await fetch(url, request);
  if (!response.ok) return null;
  return await response.json();
}

function showToastNotification(messageText) {
  const toastBanner = document.getElementById("toast-notification");
  toastBanner.textContent = messageText;
  toastBanner.style.display = "block";
  clearTimeout(toastBanner.hideTimer);
  toastBanner.hideTimer = setTimeout(() => {
    toastBanner.style.display = "none";
  }, 3200);
}

function getStatusBadgeClassName(statusText) {
  const normalized = statusText.toLowerCase();
  if (normalized === "confirmed" || normalized === "paid")
    return "status-confirmed";
  if (normalized === "waiting" || normalized === "unpaid")
    return "status-waiting";
  return "status-cancelled";
}

function directionalLexicographicSorting(
  itemA,
  itemB,
  columnKey,
  sortDirection,
) {
  const valueA = String(itemA[columnKey] ?? "").toLowerCase();
  const valueB = String(itemB[columnKey] ?? "").toLowerCase();
  if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
  if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
  return 0;
}

/* ========================================================================
       1. RENDER DASHBOARD ROLE COUNTS
       ======================================================================== */
function renderDashboardRoleStatistics() {
  const roleCategories = [
    {
      roleKey: "Admin",
      label: "Administrators",
      description: "System & operations control",
    },
    {
      roleKey: "Patient",
      label: "Registered Patients",
      description: "Active care records",
    },
    {
      roleKey: "Doctor",
      label: "Doctors & Surgeons",
      description: "Attending specialists",
    },
    {
      roleKey: "Nurse",
      label: "Nursing Staff",
      description: "Ward & triage care",
    },
    {
      roleKey: "Receptionist",
      label: "Receptionists",
      description: "Front-desk & scheduling",
    },
  ];
  const dashboardStatsContainer = document.getElementById(
    "dashboard-role-stats-grid",
  );
  dashboardStatsContainer.innerHTML = roleCategories
    .map((category) => {
      const matchingRoleCount = hospitalSystemState.accountsList.filter(
        (user) => user.role === category.roleKey,
      ).length;

      return `
          <article class="stat-card">
            <span class="stat-card-label">${category.label}</span>
            <span class="stat-card-value">${matchingRoleCount}</span>
            <span class="stat-card-trend">${category.description}</span>
          </article>
        `;
    })
    .join("");
}

/* ========================================================================
       2. RENDER USERS TABLE (With Filtering & Sorting)
       ======================================================================== */
function renderAccountsTable() {
  const usernameSearchQuery = document
    .getElementById("user-search-filter")
    .value.trim()
    .toLowerCase();
  const selectedRoleFilter = document.getElementById("user-role-filter").value;
  const { column, direction } = hospitalSystemState.sortingConfiguration.users;

  const filteredAndSortedUsers = hospitalSystemState.accountsList
    .filter((user) => {
      const matchesUsername = user.username
        .toLowerCase()
        .includes(usernameSearchQuery);
      const matchesRole =
        selectedRoleFilter === "ALL" || user.role === selectedRoleFilter;
      return matchesUsername && matchesRole;
    })
    .sort((a, b) => directionalLexicographicSorting(a, b, column, direction));

  const accountsTableBody = document.getElementById("users-table-body");
  accountsTableBody.innerHTML = filteredAndSortedUsers
    .map(
      (user) => `
        <tr>
          <td class="col-expanded"><strong>${user.username}</strong></td>
          <td><span class="status-badge status-confirmed">${user.role}</span></td>
        </tr>
      `,
    )
    .join("");
}

/* ========================================================================
       3. RENDER APPOINTMENTS TABLE (With Filtering, Sorting, & Cancel Action)
       ======================================================================== */
function renderAppointmentsTable() {
  const searchKeyword = document
    .getElementById("appointment-search-filter")
    .value.trim()
    .toLowerCase();
  const selectedDepartment = document.getElementById(
    "appointment-department-filter",
  ).value;
  const selectedStatus = document.getElementById(
    "appointment-status-filter",
  ).value;
  const { column, direction } =
    hospitalSystemState.sortingConfiguration.appointments;

  const filteredAppointments = hospitalSystemState.appointmentsList
    .filter((appointment) => {
      const matchesSearch =
        appointment.patientName.toLowerCase().includes(searchKeyword) ||
        appointment.doctorName.toLowerCase().includes(searchKeyword);
      const matchesDepartment =
        selectedDepartment === "ALL" ||
        appointment.department === selectedDepartment;
      const matchesStatus =
        selectedStatus === "ALL" || appointment.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => directionalLexicographicSorting(a, b, column, direction));

  const appointmentsTableBody = document.getElementById(
    "appointments-table-body",
  );
  appointmentsTableBody.innerHTML = filteredAppointments
    .map((appointment) => {
      const isAlreadyCancelled = appointment.status === "Cancelled";
      return `
          <tr>
            <td><strong>${appointment.time}</strong></td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctorName}</td>
            <td>${appointment.department}</td>
            <td>
              <span class="status-badge ${getStatusBadgeClassName(appointment.status)}">
                ${appointment.status}
              </span>
            </td>
            <td>
              <button
                class="btn btn-danger-outline"
                onclick="handleCancelAppointment('${appointment.id}')"
                ${isAlreadyCancelled ? "disabled" : ""}
              >
                ${isAlreadyCancelled ? "Cancelled" : "Cancel"}
              </button>
            </td>
          </tr>
        `;
    })
    .join("");
}

function handleCancelAppointment(appointmentId) {
  const targetAppointment = hospitalSystemState.appointmentsList.find(
    (apt) => apt.id === appointmentId,
  );
  if (targetAppointment && targetAppointment.status !== "Cancelled") {
    targetAppointment.status = "Cancelled";
    renderAllViews();
    showToastNotification(
      `Appointment for ${targetAppointment.patientName} has been cancelled.`,
    );
  }
}

/* ========================================================================
       4. RENDER OPD QUEUE TABLE (Sorted by Timings and Status)
       ======================================================================== */
function renderOpdQueueTable() {
  const selectedOpdStatus = document.getElementById(
    "opd-status-priority-filter",
  ).value;
  const { column, direction } = hospitalSystemState.sortingConfiguration.opd;

  const sortedQueueList = hospitalSystemState.appointmentsList
    .filter(
      (apt) => selectedOpdStatus === "ALL" || apt.status === selectedOpdStatus,
    )
    .sort((a, b) => directionalLexicographicSorting(a, b, column, direction));

  const opdTableBody = document.getElementById("opd-queue-table-body");
  opdTableBody.innerHTML = sortedQueueList
    .map(
      (item) => `
        <tr>
          <td><strong>${item.time}</strong></td>
          <td>${item.patientName}</td>
          <td>${item.doctorName}</td>
          <td>${item.department}</td>
          <td>
            <span class="status-badge ${getStatusBadgeClassName(item.status)}">
              ${item.status}
            </span>
          </td>
        </tr>
      `,
    )
    .join("");
}

/* ========================================================================
       5. RENDER BILLING TABLE (Pay Amount & Print Receipt Actions)
       ======================================================================== */
function renderBillingTable() {
  const patientQuery = document
    .getElementById("bill-patient-search-filter")
    .value.trim()
    .toLowerCase();
  const serviceFilter = document.getElementById("bill-service-filter").value;
  const paymentStatusFilter = document.getElementById(
    "bill-payment-status-filter",
  ).value;

  const filteredBills = hospitalSystemState.billsList.filter((bill) => {
    const matchesPatient = bill.patientName
      .toLowerCase()
      .includes(patientQuery);
    const matchesService =
      serviceFilter === "ALL" || bill.serviceName === serviceFilter;
    const derivedStatus = bill.isPaid ? "Paid" : "Unpaid";
    const matchesPaymentStatus =
      paymentStatusFilter === "ALL" || derivedStatus === paymentStatusFilter;
    return matchesPatient && matchesService && matchesPaymentStatus;
  });

  const billingTableBody = document.getElementById("billing-table-body");
  billingTableBody.innerHTML = filteredBills
    .map((bill) => {
      const statusText = bill.isPaid ? "Paid" : "Unpaid";
      return `
          <tr>
            <td><strong>${bill.patientName}</strong></td>
            <td>${bill.serviceName}</td>
            <td>$${bill.paymentAmount.toFixed(2)}</td>
            <td>${bill.date}</td>
            <td>
              <span class="status-badge ${getStatusBadgeClassName(statusText)}">
                ${statusText}
              </span>
            </td>
            <td style="display: flex; gap: 8px;">
              <button
                class="btn btn-primary btn-sm"
                onclick="handlePayBillAmount('${bill.id}')"
                ${bill.isPaid ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ""}
              >
                ${bill.isPaid ? "Paid" : "Pay Amount"}
              </button>
              <button
                class="btn btn-secondary btn-sm"
                onclick="handlePrintBillReceipt('${bill.id}')"
              >
                Print Receipt
              </button>
            </td>
          </tr>
        `;
    })
    .join("");
}

function handlePayBillAmount(billId) {
  const targetBill = hospitalSystemState.billsList.find(
    (bill) => bill.id === billId,
  );
  if (targetBill && !targetBill.isPaid) {
    targetBill.isPaid = true;
    renderAllViews();
    showToastNotification(
      `Payment of $${targetBill.paymentAmount.toFixed(2)} received from ${targetBill.patientName}.`,
    );
  }
}

function handlePrintBillReceipt(billId) {
  const targetBill = hospitalSystemState.billsList.find(
    (bill) => bill.id === billId,
  );
  if (!targetBill) return;

  const receiptWindow = window.open("", "_blank", "width=500,height=600");
  receiptWindow.document.write(`
        <html>
          <head><title>Receipt ${targetBill.id}</title></head>
          <body style="font-family: sans-serif; padding: 32px;">
            <h2>MedCore Hospital — Official Payment Receipt</h2>
            <hr/>
            <p><strong>Invoice ID:</strong> ${targetBill.id}</p>
            <p><strong>Patient Name:</strong> ${targetBill.patientName}</p>
            <p><strong>Medical Service:</strong> ${targetBill.serviceName}</p>
            <p><strong>Billing Date:</strong> ${targetBill.date}</p>
            <p><strong>Amount:</strong> $${targetBill.paymentAmount.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> ${targetBill.isPaid ? "PAID IN FULL" : "PAYMENT PENDING"}</p>
            <hr/>
            <button onclick="window.print()">Print Now</button>
          </body>
        </html>
      `);
  receiptWindow.document.close();
}

/* ========================================================================
       6. RENDER REPORTS VIEW (Inflow, Outflow & Revenue Statistics)
       ======================================================================== */
function renderHospitalReportStatistics() {
  const totalPatientsForDay = hospitalSystemState.appointmentsList.length;
  const upcomingAppointmentsCount = hospitalSystemState.appointmentsList.filter(
    (apt) => apt.status === "Waiting",
  ).length;
  const completedVisitsCount = hospitalSystemState.appointmentsList.filter(
    (apt) => apt.status === "Confirmed",
  ).length;
  const cancelledVisitsCount = hospitalSystemState.appointmentsList.filter(
    (apt) => apt.status === "Cancelled",
  ).length;

  const dailyRevenueGenerated = hospitalSystemState.billsList
    .filter((bill) => bill.isPaid)
    .reduce((accumulator, bill) => accumulator + bill.paymentAmount, 0);

  const pendingReceivables = hospitalSystemState.billsList
    .filter((bill) => !bill.isPaid)
    .reduce((accumulator, bill) => accumulator + bill.paymentAmount, 0);

  const reportMetrics = [
    {
      label: "Total Patients Today (Inflow)",
      value: totalPatientsForDay,
      note: "All scheduled outpatient visits",
    },
    {
      label: "Upcoming Appointments",
      value: upcomingAppointmentsCount,
      note: "Patients currently in waiting queue",
    },
    {
      label: "Completed / Confirmed Visits (Outflow)",
      value: completedVisitsCount,
      note: "Consultations cleared today",
    },
    {
      label: "Cancelled Appointments",
      value: cancelledVisitsCount,
      note: "No-shows or patient cancellations",
    },
    {
      label: "Daily Revenue Generated",
      value: `$${dailyRevenueGenerated.toFixed(2)}`,
      note: "Collected from paid invoices",
    },
    {
      label: "Pending Bill Collection",
      value: `$${pendingReceivables.toFixed(2)}`,
      note: "Awaiting patient settlement",
    },
  ];

  const reportContainer = document.getElementById("report-metrics-grid");
  reportContainer.innerHTML = reportMetrics
    .map(
      (metric) => `
        <article class="stat-card">
          <span class="stat-card-label">${metric.label}</span>
          <span class="stat-card-value">${metric.value}</span>
          <span class="stat-card-trend">${metric.note}</span>
        </article>
      `,
    )
    .join("");
}

/* ========================================================================
       7. POPULATE & HANDLE PROFILE SETTINGS FORM
       ======================================================================== */
function populateProfileSettingsForm() {
  const profile = hospitalSystemState.currentLoggedInUserProfile;
  document.getElementById("profile-first-name").value = profile.firstName;
  document.getElementById("profile-middle-name").value = profile.middleName;
  document.getElementById("profile-last-name").value = profile.lastName;
  document.getElementById("profile-gender").value = profile.gender;
  document.getElementById("profile-dob").value = profile.dob;
  document.getElementById("profile-address").value = profile.address;
  document.getElementById("profile-email").value = profile.email;
  document.getElementById("profile-phone-number").value = profile.phoneNumber;
}

/* ========================================================================
       MASTER VIEW SYNCHRONIZATION & EVENT LISTENERS
       ======================================================================== */
function renderAllViews() {
  renderDashboardRoleStatistics();
  renderAccountsTable();
  renderAppointmentsTable();
  renderOpdQueueTable();
  renderBillingTable();
  renderHospitalReportStatistics();
}

function switchActiveNavigationView(targetViewId, customTitleText) {
  document.querySelectorAll(".view-section").forEach((section) => {
    section.classList.remove("active-view");
  });
  document.getElementById(targetViewId).classList.add("active-view");

  document.querySelectorAll(".nav-menu-button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.targetView === targetViewId);
  });

  if (customTitleText) {
    document.getElementById("current-page-title").textContent = customTitleText;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let accInfo = await sendRequest("/me");

  if (accInfo) {
    document.getElementById("header-username-display").textContent =
      accInfo["username"];

    let profileInfo = await sendRequest("/profile", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(accInfo),
    });

    if (profileInfo) {
      hospitalSystemState.currentLoggedInUserProfile = profileInfo;
      hospitalSystemState.currentLoggedInUserProfile["username"] =
        accInfo["username"];
    }
  }

  // Set default billing date to today
  document.getElementById("bill-date-input").valueAsDate = new Date();

  // Initial render
  populateProfileSettingsForm();
  renderAllViews();

  // Sidebar Navigation Switching
  const viewTitlesMap = {
    "dashboard-view": "Hospital Overview Dashboard",
    "accounts-view": "Users & Role Management",
    "appointments-view": "Patient Appointment Scheduling",
    "opd-queue-view": "Live Outpatient (OPD) Queue",
    "billing-view": "Patient Billing & Payment Desk",
    "reports-view": "Hospital Inflow & Outflow Analytics",
  };

  document.querySelectorAll(".nav-menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.targetView;
      switchActiveNavigationView(targetView, viewTitlesMap[targetView]);
    });
  });

  // Profile Top-Right Dropdown Toggle
  const profileTriggerButton = document.getElementById("profile-menu-trigger");
  const profileDropdownMenu = document.getElementById("profile-dropdown");

  profileTriggerButton.addEventListener("click", (event) => {
    event.stopPropagation();
    profileDropdownMenu.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    profileDropdownMenu.classList.remove("open");
  });

  // Open Profile Settings View
  document
    .getElementById("open-profile-settings-btn")
    .addEventListener("click", () => {
      switchActiveNavigationView(
        "profile-settings-view",
        "Account Profile Settings",
      );
    });

  // Logout Handler
  document
    .getElementById("logout-system-btn")
    .addEventListener("click", async () => {
      if (confirm("Are you sure you want to logout?")) {
        const response = await fetch("/logout", {
          method: "POST",
          credentials: "include",
        });

        showToastNotification(
          "Session terminated. Redirecting to Login Page...",
        );

        if (response.ok) {
          window.location.href = "/";
        }
      }
    });

  // Save Updated Profile Settings
  document
    .getElementById("profile-settings-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const profile = hospitalSystemState.currentLoggedInUserProfile;
      if (profile) {
        const newProfile = {};
        newProfile.firstName = document
          .getElementById("profile-first-name")
          .value.trim();
        newProfile.middleName = document
          .getElementById("profile-middle-name")
          .value.trim();
        newProfile.lastName = document
          .getElementById("profile-last-name")
          .value.trim();
        newProfile.gender = document.getElementById("profile-gender").value;
        newProfile.dob = document.getElementById("profile-dob").value;
        newProfile.address = document
          .getElementById("profile-address")
          .value.trim();
        newProfile.email = document
          .getElementById("profile-email")
          .value.trim();
        newProfile.phoneNumber = document
          .getElementById("profile-phone-number")
          .value.trim();

        const editProfileResponse = await sendRequest("/edit-profile", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newProfile),
        });

        if (editProfileResponse) {
          if (editProfileResponse.success) {
            hospitalSystemState.currentLoggedInUserProfile = newProfile;
            showToastNotification("Profile settings updated successfully.");
          } else showToastNotification(editProfileResponse.message);
        }
      } else showToastNotification("Could not update profile settings.");

      // const updatedUsername = `dr.${profile.first_name.toLowerCase()}.${profile.last_name.toLowerCase()}`;
      // profile.username = updatedUsername;
      // document.getElementById("header-username-display").textContent =
      //   updatedUsername;
    });

  document
    .getElementById("profile-new-username-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const newUsername = document
        .getElementById("profile-new-username")
        .value.trim();

      const changeUsernameResponse = await sendRequest("/change-username", {
        method: "POST",

        headers: {
          "Content-Type": "text/plain",
        },

        body: newUsername,
      });

      if (changeUsernameResponse) {
        if (changeUsernameResponse.success) {
          // hospitalSystemState.currentLoggedInUserProfile.username = newUsername;
          document.getElementById("header-username-display").textContent = newUsername;
          showToastNotification("Profile settings updated successfully.");
        } else showToastNotification(changeUsernameResponse.message);
      } else showToastNotification("Could not update username.");
    });

  // Inline Section Toggles (Add Admin, Book Appointment, Create Bill)
  const setupInlineSectionToggle = (openButtonId, closeButtonId, sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    document.getElementById(openButtonId).addEventListener("click", () => {
      sectionElement.classList.toggle("visible");
    });
    document.getElementById(closeButtonId).addEventListener("click", () => {
      sectionElement.classList.remove("visible");
    });
  };

  setupInlineSectionToggle(
    "toggle-add-account-section-btn",
    "close-add-account-section-btn",
    "add-account-inline-section",
  );
  setupInlineSectionToggle(
    "toggle-book-appointment-btn",
    "close-book-appointment-btn",
    "book-appointment-inline-section",
  );
  setupInlineSectionToggle(
    "toggle-create-bill-btn",
    "close-create-bill-btn",
    "create-bill-inline-section",
  );

  // Add New Admin Form Submission
  document
    .getElementById("create-admin-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newAdminUsername = document
        .getElementById("new-admin-username")
        .value.trim();
      hospitalSystemState.accountsList.push({
        username: newAdminUsername,
        role: "Admin",
      });
      event.target.reset();
      document
        .getElementById("add-account-inline-section")
        .classList.remove("visible");
      renderAllViews();
      showToastNotification(
        `New Admin "${newAdminUsername}" added to the system.`,
      );
    });

  // Book New Appointment Form Submission
  document
    .getElementById("book-appointment-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newAppointmentRecord = {
        id: `APT-${Math.floor(100 + Math.random() * 900)}`,
        time: document.getElementById("appointment-time-input").value,
        patientName: document
          .getElementById("appointment-patient-input")
          .value.trim(),
        doctorName: document
          .getElementById("appointment-doctor-input")
          .value.trim(),
        department: document.getElementById("appointment-department-input")
          .value,
        status: document.getElementById("appointment-status-input").value,
      };

      hospitalSystemState.appointmentsList.push(newAppointmentRecord);
      event.target.reset();
      document
        .getElementById("book-appointment-inline-section")
        .classList.remove("visible");
      renderAllViews();
      showToastNotification(
        `Appointment booked for ${newAppointmentRecord.patientName} at ${newAppointmentRecord.time}.`,
      );
    });

  // Create New Bill Form Submission
  document
    .getElementById("create-bill-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newBillRecord = {
        id: `INV-${Math.floor(5000 + Math.random() * 4000)}`,
        patientName: document
          .getElementById("bill-patient-name-input")
          .value.trim(),
        serviceName: document.getElementById("bill-service-name-input").value,
        paymentAmount: parseFloat(
          document.getElementById("bill-amount-input").value,
        ),
        date: document.getElementById("bill-date-input").value,
        isPaid: false,
      };

      hospitalSystemState.billsList.unshift(newBillRecord);
      event.target.reset();
      document.getElementById("bill-date-input").valueAsDate = new Date();
      document
        .getElementById("create-bill-inline-section")
        .classList.remove("visible");
      renderAllViews();
      showToastNotification(
        `New bill generated for ${newBillRecord.patientName}.`,
      );
    });

  // Filter Input Listeners
  ["user-search-filter", "user-role-filter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderAccountsTable);
  });

  [
    "appointment-search-filter",
    "appointment-department-filter",
    "appointment-status-filter",
  ].forEach((id) => {
    document
      .getElementById(id)
      .addEventListener("input", renderAppointmentsTable);
  });

  document
    .getElementById("opd-status-priority-filter")
    .addEventListener("change", renderOpdQueueTable);

  [
    "bill-patient-search-filter",
    "bill-service-filter",
    "bill-payment-status-filter",
  ].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderBillingTable);
  });

  // Sortable Table Header Listeners
  document.querySelectorAll(".sortable-column").forEach((headerCell) => {
    headerCell.addEventListener("click", () => {
      const tableKey = headerCell.dataset.table;
      const columnKey = headerCell.dataset.column;
      const currentSort = hospitalSystemState.sortingConfiguration[tableKey];

      if (currentSort.column === columnKey) {
        currentSort.direction =
          currentSort.direction === "asc" ? "desc" : "asc";
      } else {
        currentSort.column = columnKey;
        currentSort.direction = "asc";
      }

      renderAllViews();
    });
  });
});
