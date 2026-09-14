let patients = JSON.parse(localStorage.getItem("hospital_patients")) || [
  {
    idType: "Aadhar Card",
    idNumber: "52545254587",
    name: "Av",
    gender: "Male",
    disease: "Dengue",
    roomNumber: "200",
    deposit: "500",
    time: "09-03-2024 16:45",
  },
];

const rooms = [
  { no: "100", status: "Available", price: "500", type: "General Bed" },
  { no: "101", status: "Available", price: "500", type: "General Bed" },
  { no: "200", status: "Occupied", price: "1500", type: "Private Room" },
  { no: "201", status: "Available", price: "1500", type: "Private Room" },
  { no: "300", status: "Available", price: "3500", type: "ICU Bed" },
];

const employees = [
  {
    name: "Dr. Sharma",
    age: "30",
    gender: "Male",
    job: "Cardiologist",
    phone: "9876543210",
  },
  {
    name: "Dr. Roy",
    age: "32",
    gender: "Female",
    job: "Neurologist",
    phone: "9876543211",
  },
  {
    name: "Anita Das",
    age: "29",
    gender: "Female",
    job: "Receptionist",
    phone: "9876543212",
  },
];

async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (response.ok) {
    document.getElementById("login-view").classList.add("hidden");
    document.getElementById("app-view").classList.remove("hidden");
    switchTab("dashboard");
  } else {
    document.getElementById("login-error").textContent =
      "Wrong username or password.";
  }
}

function clearLogin() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-error").textContent = "";
}

function handleLogout() {
  document.getElementById("app-view").classList.add("hidden");
  document.getElementById("login-view").classList.remove("hidden");
  clearLogin();
}

function switchTab(page) {
  const box = document.getElementById("view-container");

  if (page === "dashboard") {
    showDashboard(box);
  } else if (page === "add-patient") {
    showAddPatient(box);
  } else if (page === "patient-info") {
    showPatients(box);
  } else if (page === "employees") {
    showEmployees(box);
  } else if (page === "room") {
    showRooms(box);
  } else if (page === "search-room") {
    showRoomSearch(box);
  } else if (page === "department") {
    showDepartments(box);
  } else if (page === "update-patient") {
    showUpdate(box);
  } else if (page === "discharge") {
    showDischarge(box);
  } else if (page === "ambulance") {
    showAmbulance(box);
  }
}

function showDashboard(box) {
  box.innerHTML = `
        <h2>HOSPITAL DASHBOARD</h2>
        <div class="dashboard-cards">
            <div class="dashboard-card">
                <strong>${patients.length}</strong>Patients
            </div>
            <div class="dashboard-card">
                <strong>12</strong>Doctors
            </div>
            <div class="dashboard-card">
                <strong>${patients.length}</strong>Occupied Rooms
            </div>
            <div class="dashboard-card">
                <strong>3</strong>Ambulances
            </div>
        </div>

      
    `;
}

function showAddPatient(box) {
  box.innerHTML = `
        <h2>NEW PATIENT FORM</h2>

        <form class="patient-form" onsubmit="savePatient(event)">
            <div class="form-row">
                <label>ID Type:</label>
                <select id="p-idType">
                    <option>Aadhar Card</option>
                    <option>Voter ID</option>
                    <option>Passport</option>
                </select>
            </div>

            <div class="form-row">
                <label>Number:</label>
                <input id="p-idNumber" required>
            </div>

            <div class="form-row">
                <label>Name:</label>
                <input id="p-name" required>
            </div>

            <div class="form-row">
                <label>Gender:</label>
                <div class="gender">
                    <label><input type="radio" name="gender" value="Male" checked> Male</label>
                    <label><input type="radio" name="gender" value="Female"> Female</label>
                </div>
            </div>

            <div class="form-row">
                <label>Disease & Symptoms:</label>
                <input id="p-disease" required>
            </div>

            <div class="form-row">
                <label>Room Number:</label>
                <select id="p-room">
                    <option>100</option>
                    <option>101</option>
                    <option>200</option>
                    <option>201</option>
                    <option>300</option>
                </select>
            </div>

            <div class="form-row">
                <label>Deposit (Rs):</label>
                <input id="p-deposit" type="number" value="0" required>
            </div>

            <div class="form-buttons">
                <button class="black-button" type="submit">ADD</button>
                <button class="black-button" type="button" onclick="switchTab('dashboard')">BACK</button>
            </div>
        </form>
    `;
}

function savePatient(event) {
  event.preventDefault();

  const patient = {
    idType: document.getElementById("p-idType").value,
    idNumber: document.getElementById("p-idNumber").value,
    name: document.getElementById("p-name").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    disease: document.getElementById("p-disease").value,
    roomNumber: document.getElementById("p-room").value,
    deposit: document.getElementById("p-deposit").value,
    time: new Date().toLocaleString(),
  };

  patients.push(patient);
  localStorage.setItem("hospital_patients", JSON.stringify(patients));

  alert("Patient added successfully.");
  switchTab("patient-info");
}

function showPatients(box) {
  box.innerHTML = `
        <h2>PATIENT INFORMATION</h2>
        <input class="search-box" id="patient-search"
               oninput="searchPatients()"
               placeholder="Search by patient name">

        <div id="patient-table"></div>
    `;

  searchPatients();
}

function searchPatients() {
  const search = document.getElementById("patient-search").value.toLowerCase();

  const list = patients.filter(function (patient) {
    return patient.name.toLowerCase().includes(search);
  });

  let rows = "";

  list.forEach(function (patient, index) {
    rows += `
            <tr>
                <td>${index + 1}</td>
                <td>${patient.name}</td>
                <td>${patient.gender}</td>
                <td>${patient.disease}</td>
                <td>${patient.roomNumber}</td>
                <td>Rs. ${patient.deposit}</td>
            </tr>
        `;
  });

  if (rows === "") {
    rows = `<tr><td colspan="6">No patient found.</td></tr>`;
  }

  document.getElementById("patient-table").innerHTML = `
        <table>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Disease</th>
                <th>Room</th>
                <th>Deposit</th>
            </tr>
            ${rows}
        </table>
    `;
}

function showEmployees(box) {
  let rows = "";

  employees.forEach(function (employee, index) {
    rows += `
            <tr>
                <td>${index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.gender}</td>
                <td>${employee.job}</td>
                <td>${employee.phone}</td>
            </tr>
        `;
  });

  box.innerHTML = `
        <h2>ALL EMPLOYEE INFORMATION</h2>
        <table>
            <tr>
                <th>No.</th><th>Name</th><th>Age</th>
                <th>Gender</th><th>Job</th><th>Phone</th>
            </tr>
            ${rows}
        </table>
    `;
}

function showRooms(box) {
  let rows = "";

  rooms.forEach(function (room) {
    rows += `
            <div class="room-item ${room.status === "Available" ? "available" : "occupied"}">
                Room ${room.no}
                <small>${room.status}</small>
                <small>Rs. ${room.price}</small>
                <small>${room.type}</small>
            </div>
        `;
  });

  box.innerHTML = `
        <h2>ROOM INFORMATION</h2>
        <div class="room-list">${rows}</div>
    `;
}

function showRoomSearch(box) {
  box.innerHTML = `
        <h2>SEARCH ROOM</h2>

        <div class="form-row">
            <label>Bed Type:</label>
            <select id="room-type">
                <option>General Bed</option>
                <option>Private Room</option>
                <option>ICU Bed</option>
            </select>
        </div>

        <label>
            <input type="checkbox" id="available-only">
            Show available rooms only
        </label>

        <div class="form-buttons">
            <button class="black-button" onclick="searchRooms()">SEARCH</button>
        </div>

        <div id="room-results"></div>
    `;
}

function searchRooms() {
  const type = document.getElementById("room-type").value;
  const onlyAvailable = document.getElementById("available-only").checked;

  const found = rooms.filter(function (room) {
    return (
      room.type === type && (!onlyAvailable || room.status === "Available")
    );
  });

  let rows = "";

  found.forEach(function (room) {
    rows += `
            <tr>
                <td>${room.no}</td>
                <td>${room.status}</td>
                <td>Rs. ${room.price}</td>
                <td>${room.type}</td>
            </tr>
        `;
  });

  if (!rows) {
    rows = `<tr><td colspan="4">No room found.</td></tr>`;
  }

  document.getElementById("room-results").innerHTML = `
        <table>
            <tr><th>Room</th><th>Status</th><th>Price</th><th>Type</th></tr>
            ${rows}
        </table>
    `;
}

function showDepartments(box) {
  const departments = [
    "Outpatient Department",
    "Nursing Department",
    "Surgical Department",
    "Cardiology",
    "Neurology",
    "Emergency",
  ];

  let html = "";

  departments.forEach(function (department) {
    html += `<div class="department-item">${department}</div>`;
  });

  box.innerHTML = `
        <h2>HOSPITAL DEPARTMENTS</h2>
        <div class="department-list">${html}</div>
    `;
}

function showUpdate(box) {
  box.innerHTML = `
        <h2>UPDATE PATIENT DETAILS</h2>

        <div class="form-row">
            <label>Patient Number:</label>
            <input id="update-number" placeholder="Enter ID number">
        </div>

        <div class="form-row">
            <label>New Name:</label>
            <input id="update-name">
        </div>

        <div class="form-row">
            <label>New Disease:</label>
            <input id="update-disease">
        </div>

        <div class="form-buttons">
            <button class="black-button" onclick="updatePatient()">UPDATE</button>
        </div>

        <p id="update-message"></p>
    `;
}

function updatePatient() {
  const number = document.getElementById("update-number").value;
  const patient = patients.find(function (p) {
    return p.idNumber === number;
  });

  const message = document.getElementById("update-message");

  if (!patient) {
    message.textContent = "Patient not found.";
    return;
  }

  const newName = document.getElementById("update-name").value;
  const newDisease = document.getElementById("update-disease").value;

  if (newName) patient.name = newName;
  if (newDisease) patient.disease = newDisease;

  localStorage.setItem("hospital_patients", JSON.stringify(patients));
  message.textContent = "Patient details updated.";
}

function showDischarge(box) {
  box.innerHTML = `
        <h2>PATIENT DISCHARGE</h2>

        <div class="form-row">
            <label>Patient Number:</label>
            <input id="discharge-number" placeholder="Enter ID number">
        </div>

        <div class="form-buttons">
            <button class="black-button" onclick="dischargePatient()">DISCHARGE</button>
        </div>

        <p id="discharge-message"></p>
    `;
}

function dischargePatient() {
  const number = document.getElementById("discharge-number").value;
  const index = patients.findIndex(function (p) {
    return p.idNumber === number;
  });

  const message = document.getElementById("discharge-message");

  if (index === -1) {
    message.textContent = "Patient not found.";
    return;
  }

  patients.splice(index, 1);
  localStorage.setItem("hospital_patients", JSON.stringify(patients));
  message.textContent = "Patient discharged successfully.";
}

function showAmbulance(box) {
  box.innerHTML = `
        <div class="ambulance">
            <h2>HOSPITAL AMBULANCE</h2>
            <div class="ambulance-icon">🚑</div>
            <p>Available Ambulances: 3</p>
            <p>Emergency Number: 108</p>
            <button class="black-button"
                    onclick="alert('Ambulance request added.')">
                REQUEST AMBULANCE
            </button>
        </div>
    `;
}

function updateTime() {
  document.getElementById("time").textContent = new Date().toLocaleString();
}

setInterval(updateTime, 1000);
updateTime();
