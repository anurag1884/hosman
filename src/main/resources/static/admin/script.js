/* =====================================================
   DATA
===================================================== */

let patients = [
  {
    id: "PID-1001",
    name: "Rahul Sharma",
    age: 32,
    gender: "Male",
    phone: "9876543210",
    lastVisit: "18 Sep 2026",
  },

  {
    id: "PID-1002",
    name: "Ananya Das",
    age: 27,
    gender: "Female",
    phone: "9876543211",
    lastVisit: "18 Sep 2026",
  },

  {
    id: "PID-1003",
    name: "Arjun Kumar",
    age: 45,
    gender: "Male",
    phone: "9876543212",
    lastVisit: "17 Sep 2026",
  },

  {
    id: "PID-1004",
    name: "Sneha Gupta",
    age: 29,
    gender: "Female",
    phone: "9876543213",
    lastVisit: "16 Sep 2026",
  },
];

let appointments = [
  {
    id: "APT-001",
    time: "09:00 AM",
    patient: "Rahul Sharma",
    doctor: "Dr. Amit Mehta",
    department: "Cardiology",
    status: "Confirmed",
  },

  {
    id: "APT-002",
    time: "09:30 AM",
    patient: "Ananya Das",
    doctor: "Dr. Priya Roy",
    department: "General Medicine",
    status: "Waiting",
  },

  {
    id: "APT-003",
    time: "10:00 AM",
    patient: "Arjun Kumar",
    doctor: "Dr. Rahul Sen",
    department: "Orthopedics",
    status: "Waiting",
  },

  {
    id: "APT-004",
    time: "10:30 AM",
    patient: "Sneha Gupta",
    doctor: "Dr. Neha Singh",
    department: "Dermatology",
    status: "Confirmed",
  },
];

let doctors = [
  {
    name: "Dr. Amit Mehta",
    department: "Cardiology",
    room: "204",
    hours: "09 AM - 02 PM",
    status: "Available",
    next: "11:30 AM",
  },

  {
    name: "Dr. Priya Roy",
    department: "General Medicine",
    room: "108",
    hours: "09 AM - 04 PM",
    status: "Busy",
    next: "12:00 PM",
  },

  {
    name: "Dr. Rahul Sen",
    department: "Orthopedics",
    room: "302",
    hours: "10 AM - 03 PM",
    status: "Available",
    next: "11:45 AM",
  },

  {
    name: "Dr. Neha Singh",
    department: "Dermatology",
    room: "205",
    hours: "10 AM - 04 PM",
    status: "Available",
    next: "12:30 PM",
  },
];

let queue = [
  {
    number: 1,
    patient: "Ananya Das",
    doctor: "Dr. Priya Roy",
    department: "General Medicine",
    arrival: "09:25 AM",
    status: "Waiting",
  },

  {
    number: 2,
    patient: "Arjun Kumar",
    doctor: "Dr. Rahul Sen",
    department: "Orthopedics",
    arrival: "09:45 AM",
    status: "Waiting",
  },

  {
    number: 3,
    patient: "Rahul Sharma",
    doctor: "Dr. Amit Mehta",
    department: "Cardiology",
    arrival: "10:00 AM",
    status: "Waiting",
  },
];

let bills = [
  {
    id: "INV-1001",
    patient: "Rahul Sharma",
    service: "Consultation",
    amount: 800,
    payment: "Paid",
    date: "18 Sep 2026",
  },

  {
    id: "INV-1002",
    patient: "Ananya Das",
    service: "Consultation",
    amount: 600,
    payment: "Pending",
    date: "18 Sep 2026",
  },

  {
    id: "INV-1003",
    patient: "Arjun Kumar",
    service: "Consultation",
    amount: 700,
    payment: "Paid",
    date: "18 Sep 2026",
  },
];

/* =====================================================
   PAGE NAVIGATION
===================================================== */

const navLinks = document.querySelectorAll(".nav-link[data-page]");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const page = this.dataset.page;

    openPage(page);

    document.querySelector(".sidebar").classList.remove("open");
  });
});

function openPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageName);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.dataset.page === pageName) {
      link.classList.add("active");
    }
  });

  const titles = {
    dashboard: "Dashboard",
    patients: "Patients",
    appointments: "Appointments",
    doctors: "Doctors",
    queue: "OPD Queue",
    billing: "Billing",
    reports: "Reports",
    settings: "Settings",
  };

  document.getElementById("headerTitle").textContent =
    titles[pageName] || "Dashboard";

  if (pageName === "patients") renderPatients();

  if (pageName === "appointments") renderAppointments();

  if (pageName === "doctors") renderDoctors();

  if (pageName === "queue") renderQueue();

  if (pageName === "billing") renderBills();
}

/* =====================================================
   MODALS
===================================================== */

function openModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("show");
  }

  populatePatientDropdowns();
}

function closeModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
  }
}

/* Close modal when clicking outside */

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});

/* =====================================================
   PATIENTS
===================================================== */

function renderPatients() {
  const table = document.getElementById("patientsTable");

  const search = document.getElementById("patientSearch").value.toLowerCase();

  const gender = document.getElementById("genderFilter").value;

  const filtered = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search) ||
      patient.id.toLowerCase().includes(search) ||
      patient.phone.includes(search);

    const matchesGender = !gender || patient.gender === gender;

    return matchesSearch && matchesGender;
  });

  table.innerHTML = "";

  if (filtered.length === 0) {
    table.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty">
                        <i class="bi bi-person-x"></i>
                        <p>No patients found.</p>
                    </div>
                </td>
            </tr>
        `;

    return;
  }

  filtered.forEach((patient) => {
    table.innerHTML += `

            <tr>

                <td>
                    <strong>${patient.id}</strong>
                </td>

                <td>

                    <span class="patient-name">
                        ${patient.name}
                    </span>

                </td>

                <td>
                    ${patient.age}
                </td>

                <td>
                    ${patient.gender}
                </td>

                <td>
                    ${patient.phone}
                </td>

                <td>
                    ${patient.lastVisit}
                </td>

                <td>

                    <button
                        class="btn btn-secondary btn-small"
                        onclick="viewPatient('${patient.id}')"
                    >
                        View
                    </button>

                    <button
                        class="btn btn-primary btn-small"
                        onclick="bookForPatient('${patient.name}')"
                    >
                        Book
                    </button>

                </td>

            </tr>

        `;
  });
}

/* =====================================================
   ADD PATIENT
===================================================== */

document.getElementById("patientForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("patientName").value.trim();

  const age = document.getElementById("patientAge").value;

  const gender = document.getElementById("patientGender").value;

  const phone = document.getElementById("patientPhone").value.trim();

  if (!name || !age || !gender || !phone) {
    showToast("Please fill all required fields.");

    return;
  }

  const newPatient = {
    id: "PID-" + (1000 + patients.length + 1),

    name: name,

    age: age,

    gender: gender,

    phone: phone,

    lastVisit: "18 Sep 2026",
  };

  patients.push(newPatient);

  renderPatients();

  updateDashboard();

  closeModal("patientModal");

  this.reset();

  showToast("Patient registered successfully!");
});

/* =====================================================
   VIEW PATIENT
===================================================== */

function viewPatient(id) {
  const patient = patients.find((p) => p.id === id);

  if (!patient) return;

  alert(
    "PATIENT PROFILE\n\n" +
      "Patient ID: " +
      patient.id +
      "\n" +
      "Name: " +
      patient.name +
      "\n" +
      "Age: " +
      patient.age +
      "\n" +
      "Gender: " +
      patient.gender +
      "\n" +
      "Phone: " +
      patient.phone +
      "\n" +
      "Last Visit: " +
      patient.lastVisit,
  );
}

/* =====================================================
   APPOINTMENTS
===================================================== */

function renderAppointments() {
  const table = document.getElementById("appointmentsTable");

  table.innerHTML = "";

  appointments.forEach((appointment, index) => {
    let statusClass = "status-confirmed";

    if (appointment.status === "Waiting") statusClass = "status-waiting";

    if (appointment.status === "Completed") statusClass = "status-completed";

    if (appointment.status === "Cancelled") statusClass = "status-cancelled";

    table.innerHTML += `

            <tr>

                <td>
                    ${appointment.id}
                </td>

                <td>
                    ${appointment.time}
                </td>

                <td>
                    <span class="patient-name">
                        ${appointment.patient}
                    </span>
                </td>

                <td>
                    ${appointment.doctor}
                </td>

                <td>
                    ${appointment.department}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${appointment.status}
                    </span>

                </td>

                <td>

                    ${
                      appointment.status !== "Cancelled"
                        ? `
                        <button
                            class="btn btn-success btn-small"
                            onclick="checkInAppointment(${index})"
                        >
                            Check-in
                        </button>

                        <button
                            class="btn btn-danger btn-small"
                            onclick="cancelAppointment(${index})"
                        >
                            Cancel
                        </button>
                        `
                        : ""
                    }

                </td>

            </tr>

        `;
  });
}

/* =====================================================
   BOOK APPOINTMENT
===================================================== */

document
  .getElementById("appointmentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const patient = document.getElementById("appointmentPatient").value;

    const doctor = document.getElementById("appointmentDoctor").value;

    const date = document.getElementById("newAppointmentDate").value;

    const time = document.getElementById("newAppointmentTime").value;

    if (!patient || !doctor || !date || !time) {
      showToast("Please fill all appointment details.");

      return;
    }

    const formattedTime = formatTime(time);

    let department = "General Medicine";

    if (doctor.includes("Amit")) department = "Cardiology";

    if (doctor.includes("Rahul")) department = "Orthopedics";

    if (doctor.includes("Neha")) department = "Dermatology";

    appointments.push({
      id: "APT-" + String(appointments.length + 1).padStart(3, "0"),

      time: formattedTime,

      patient: patient,

      doctor: doctor,

      department: department,

      status: "Confirmed",
    });

    renderAppointments();

    updateDashboard();

    closeModal("appointmentModal");

    this.reset();

    showToast("Appointment booked successfully!");
  });

function formatTime(time) {
  const [hour, minute] = time.split(":");

  let h = parseInt(hour);

  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;

  return `${h}:${minute} ${ampm}`;
}

/* =====================================================
   BOOK FOR PATIENT
===================================================== */

function bookForPatient(name) {
  openPage("appointments");

  openModal("appointmentModal");

  setTimeout(() => {
    const select = document.getElementById("appointmentPatient");

    select.value = name;
  }, 100);
}

/* =====================================================
   CHECK-IN
===================================================== */

function checkInAppointment(index) {
  const appointment = appointments[index];

  appointment.status = "Waiting";

  const alreadyInQueue = queue.some((q) => q.patient === appointment.patient);

  if (!alreadyInQueue) {
    queue.push({
      number: queue.length + 1,

      patient: appointment.patient,

      doctor: appointment.doctor,

      department: appointment.department,

      arrival: "Now",

      status: "Waiting",
    });
  }

  renderAppointments();

  renderQueue();

  updateDashboard();

  showToast(appointment.patient + " checked in successfully.");
}

/* =====================================================
   CANCEL APPOINTMENT
===================================================== */

function cancelAppointment(index) {
  if (confirm("Are you sure you want to cancel this appointment?")) {
    appointments[index].status = "Cancelled";

    renderAppointments();

    updateDashboard();

    showToast("Appointment cancelled.");
  }
}

/* =====================================================
   DOCTORS
===================================================== */

function renderDoctors() {
  const table = document.getElementById("doctorsTable");

  table.innerHTML = "";

  doctors.forEach((doctor) => {
    const statusClass =
      doctor.status === "Available" ? "status-available" : "status-busy";

    table.innerHTML += `

            <tr>

                <td>
                    <strong>
                        ${doctor.name}
                    </strong>
                </td>

                <td>
                    ${doctor.department}
                </td>

                <td>
                    Room ${doctor.room}
                </td>

                <td>
                    ${doctor.hours}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${doctor.status}
                    </span>

                </td>

                <td>
                    ${doctor.next}
                </td>

            </tr>

        `;
  });
}

/* =====================================================
   QUEUE
===================================================== */

function renderQueue() {
  const table = document.getElementById("queueTable");

  table.innerHTML = "";

  const waiting = queue.filter((q) => q.status === "Waiting");

  document.getElementById("waitingCount").textContent = waiting.length;

  document.getElementById("dashboardQueue").textContent = waiting.length;

  queue.forEach((item, index) => {
    const statusClass =
      item.status === "Waiting" ? "status-waiting" : "status-completed";

    table.innerHTML += `

            <tr>

                <td>
                    <strong>
                        Q-${String(item.number).padStart(2, "0")}
                    </strong>
                </td>

                <td>
                    ${item.patient}
                </td>

                <td>
                    ${item.doctor}
                </td>

                <td>
                    ${item.department}
                </td>

                <td>
                    ${item.arrival}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${item.status}
                    </span>

                </td>

                <td>

                    ${
                      item.status === "Waiting"
                        ? `
                        <button
                            class="btn btn-success btn-small"
                            onclick="completeQueue(${index})"
                        >
                            Complete
                        </button>
                        `
                        : ""
                    }

                </td>

            </tr>

        `;
  });
}

/* =====================================================
   COMPLETE QUEUE
===================================================== */

function completeQueue(index) {
  queue[index].status = "Completed";

  renderQueue();

  updateDashboard();

  showToast(queue[index].patient + " consultation completed.");
}

/* =====================================================
   BILLING
===================================================== */

function renderBills() {
  const table = document.getElementById("billingTable");

  table.innerHTML = "";

  bills.forEach((bill, index) => {
    const paymentClass =
      bill.payment === "Paid" ? "status-confirmed" : "status-waiting";

    table.innerHTML += `

            <tr>

                <td>
                    ${bill.id}
                </td>

                <td>
                    ${bill.patient}
                </td>

                <td>
                    ${bill.service}
                </td>

                <td>
                    ₹${bill.amount}
                </td>

                <td>

                    <span class="status ${paymentClass}">
                        ${bill.payment}
                    </span>

                </td>

                <td>
                    ${bill.date}
                </td>

                <td>

                    ${
                      bill.payment === "Pending"
                        ? `
                        <button
                            class="btn btn-success btn-small"
                            onclick="collectPayment(${index})"
                        >
                            Collect
                        </button>
                        `
                        : `
                        <button
                            class="btn btn-secondary btn-small"
                            onclick="printBill(${index})"
                        >
                            Print
                        </button>
                        `
                    }

                </td>

            </tr>

        `;
  });
}

/* =====================================================
   CREATE BILL
===================================================== */

document.getElementById("billForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const patient = document.getElementById("billPatient").value;

  const service = document.getElementById("billService").value;

  const amount = document.getElementById("billAmount").value;

  if (!patient || !amount) {
    showToast("Please fill the required fields.");

    return;
  }

  bills.push({
    id: "INV-" + (1000 + bills.length + 1),

    patient: patient,

    service: service,

    amount: amount,

    payment: "Pending",

    date: "18 Sep 2026",
  });

  renderBills();

  closeModal("billModal");

  this.reset();

  showToast("Bill created successfully!");
});

/* =====================================================
   COLLECT PAYMENT
===================================================== */

function collectPayment(index) {
  bills[index].payment = "Paid";

  renderBills();

  showToast("Payment collected successfully.");
}

/* =====================================================
   PRINT BILL
===================================================== */

function printBill(index) {
  const bill = bills[index];

  const printWindow = window.open("", "_blank");

  printWindow.document.write(`

        <html>

        <head>

            <title>${bill.id}</title>

            <style>

                body {
                    font-family: Arial;
                    padding: 40px;
                }

                .invoice {
                    max-width: 600px;
                    margin: auto;
                    border: 1px solid #ddd;
                    padding: 30px;
                }

                h1 {
                    color: #1976d2;
                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                }

            </style>

        </head>

        <body>

            <div class="invoice">

                <h1>CarePoint Hospital</h1>

                <p>
                    Patient Billing Receipt
                </p>

                <hr>

                <div class="row">
                    <strong>Bill ID</strong>
                    <span>${bill.id}</span>
                </div>

                <div class="row">
                    <strong>Patient</strong>
                    <span>${bill.patient}</span>
                </div>

                <div class="row">
                    <strong>Service</strong>
                    <span>${bill.service}</span>
                </div>

                <div class="row">
                    <strong>Amount</strong>
                    <span>₹${bill.amount}</span>
                </div>

                <div class="row">
                    <strong>Status</strong>
                    <span>${bill.payment}</span>
                </div>

                <br>

                <p>
                    Thank you for choosing CarePoint Hospital.
                </p>

            </div>

            <script>
                window.print();
            <\/script>

        </body>

        </html>

    `);

  printWindow.document.close();
}

/* =====================================================
   PATIENT DROPDOWNS
===================================================== */

function populatePatientDropdowns() {
  const appointmentSelect = document.getElementById("appointmentPatient");

  const billSelect = document.getElementById("billPatient");

  const options = patients
    .map(
      (patient) => `

            <option value="${patient.name}">
                ${patient.name} (${patient.id})
            </option>

        `,
    )
    .join("");

  appointmentSelect.innerHTML = options;

  billSelect.innerHTML = options;
}

/* =====================================================
   DASHBOARD RENDER
===================================================== */

function updateDashboard() {
  document.getElementById("dashboardAppointments").textContent =
    appointments.filter((a) => a.status !== "Cancelled").length;

  document.getElementById("dashboardPatients").textContent = patients.length;

  renderDashboardAppointments();

  renderDashboardDoctors();
}

/* =====================================================
   DASHBOARD APPOINTMENTS
===================================================== */

function renderDashboardAppointments() {
  const table = document.getElementById("dashboardAppointmentTable");

  table.innerHTML = "";

  appointments.slice(0, 5).forEach((appointment) => {
    let statusClass = "status-confirmed";

    if (appointment.status === "Waiting") statusClass = "status-waiting";

    if (appointment.status === "Completed") statusClass = "status-completed";

    table.innerHTML += `

            <tr>

                <td>
                    ${appointment.time}
                </td>

                <td>

                    <span class="patient-name">
                        ${appointment.patient}
                    </span>

                </td>

                <td>
                    ${appointment.doctor}
                </td>

                <td>
                    ${appointment.department}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${appointment.status}
                    </span>

                </td>

            </tr>

        `;
  });
}

/* =====================================================
   DASHBOARD DOCTORS
===================================================== */

function renderDashboardDoctors() {
  const container = document.getElementById("dashboardDoctors");

  container.innerHTML = "";

  doctors.slice(0, 4).forEach((doctor) => {
    const dot = doctor.status === "Available" ? "🟢" : "🟠";

    container.innerHTML += `

            <div class="doctor">

                <div class="doctor-avatar">

                    ${doctor.name
                      .split(" ")
                      .slice(-2)
                      .map((x) => x[0])
                      .join("")}

                </div>


                <div class="doctor-info">

                    <strong>
                        ${doctor.name}
                    </strong>

                    <span>
                        ${doctor.department}
                    </span>

                </div>


                <span style="font-size:9px;">
                    ${dot}
                </span>

            </div>

        `;
  });
}

/* =====================================================
   GLOBAL SEARCH
===================================================== */

document.getElementById("globalSearch").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    openPage("patients");

    document.getElementById("patientSearch").value = this.value;

    renderPatients();
  }
});

/* =====================================================
   NOTIFICATIONS
===================================================== */

function showNotifications() {
  alert(
    "NOTIFICATIONS\n\n" +
      "• 3 patients are waiting\n" +
      "• Dr. Priya Roy is currently busy\n" +
      "• New appointment booked\n" +
      "• Payment pending for INV-1002",
  );
}

/* =====================================================
   REPORT
===================================================== */

function generateReport() {
  showToast("Report generated successfully!");
}

/* =====================================================
   SETTINGS
===================================================== */

function saveSettings() {
  showToast("Settings saved successfully!");
}

/* =====================================================
   LOGOUT
===================================================== */

document
  .getElementById("logoutBtn")
  .addEventListener("click", async function () {
    if (confirm("Are you sure you want to logout?")) {
      const response = await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      showToast("Logged out successfully.");

      if (response.ok) {
        window.location.href = "/";
      }
    }
  });

/* =====================================================
   MOBILE SIDEBAR
===================================================== */

document.getElementById("mobileMenu").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open");
});

/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =====================================================
   INITIALIZE
===================================================== */

renderPatients();

renderAppointments();

renderDoctors();

renderQueue();

renderBills();

updateDashboard();

populatePatientDropdowns();
