const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  today = new Date().toISOString().slice(0, 10);
let users = [
  ["olivia.m", "Olivia Martin", "Admin", "General", "Active"],
  ["amelia.chen", "Dr. Amelia Chen", "Doctor", "Cardiology", "Active"],
  ["noah.w", "Dr. Noah Williams", "Doctor", "Neurology", "Active"],
  ["priya.sharma", "Dr. Priya Sharma", "Doctor", "Orthopedics", "Active"],
  ["ethan.p", "Dr. Ethan Patel", "Doctor", "Pediatrics", "Active"],
  ["mia.johnson", "Mia Johnson", "Nurse", "Cardiology", "Active"],
  ["sophia.d", "Sophia Davis", "Nurse", "General", "Active"],
  ["james.w", "James Wilson", "Receptionist", "General", "Active"],
  ["ava.brown", "Ava Brown", "Receptionist", "General", "Inactive"],
  ["patient.lee", "Daniel Lee", "Patient", "General", "Active"],
  ["patient.khan", "Sara Khan", "Patient", "General", "Active"],
  ["admin.r", "Robert Green", "Admin", "General", "Active"],
];
let appts = [
  ["09:00", "Daniel Lee", "Dr. Amelia Chen", "Cardiology", "Confirmed"],
  ["09:30", "Sara Khan", "Dr. Noah Williams", "Neurology", "Waiting"],
  ["10:00", "Michael Turner", "Dr. Priya Sharma", "Orthopedics", "Confirmed"],
  ["10:30", "Emma Wilson", "Dr. Ethan Patel", "Pediatrics", "Completed"],
  ["11:00", "Lucas Martin", "Dr. Amelia Chen", "Cardiology", "Waiting"],
  ["11:30", "Isabella Clark", "Dr. Noah Williams", "Neurology", "Cancelled"],
  ["12:00", "Oliver White", "Dr. Priya Sharma", "Orthopedics", "Confirmed"],
  ["13:00", "Sophia Moore", "Dr. Ethan Patel", "Pediatrics", "Confirmed"],
].map((a) => ({
  time: a[0],
  patient: a[1],
  doctor: a[2],
  department: a[3],
  status: a[4],
  date: today,
}));
let bills = [
  ["Daniel Lee", "Consultation", 1200, "Paid"],
  ["Sara Khan", "Therapy", 2400, "Pending"],
  ["Michael Turner", "Lab test", 850, "Paid"],
  ["Emma Wilson", "Imaging", 3200, "Pending"],
  ["Lucas Martin", "Consultation", 1000, "Paid"],
].map((a) => ({
  patient: a[0],
  service: a[1],
  amount: a[2],
  status: a[3],
  date: today,
}));
let userSort = "username",
  userDir = 1,
  apptSort = "time",
  apptDir = 1,
  photo = $("#topPhoto").src;
function badge(s) {
  return `<span class="badge ${["Paid", "Completed", "Active"].includes(s) ? "green" : ["Waiting", "Pending"].includes(s) ? "amber" : ["Cancelled", "Inactive"].includes(s) ? "red" : ""}">${s}</span>`;
}
function person(n) {
  return `<b>${n}</b>`;
}
function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}
function go(p) {
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === p));
  $$(".nav button").forEach((b) =>
    b.classList.toggle("active", b.dataset.page === p),
  );
  $("#sidebar").classList.remove("open");
  $("#dropdown").classList.remove("open");
  if (p === "users") renderUsers();
  if (p === "appointments") renderAppts();
  if (p === "queue") renderQueue();
  if (p === "billing") renderBills();
}
$$("[data-page]").forEach((b) => (b.onclick = () => go(b.dataset.page)));
$("#mobile").onclick = () => $("#sidebar").classList.toggle("open");
$("#profileBtn").onclick = () => $("#dropdown").classList.toggle("open");
$("#logout").onclick = () =>
  confirm("Log out of Northstar HMS?") &&
  alert("Demo logout. Connect this action to authentication.");
function updateCounts() {
  let roles = ["Patient", "Doctor", "Nurse", "Admin", "Receptionist"];
  roles.forEach(
    (r) =>
      ($("#count" + r).textContent = users.filter((u) => u[2] === r).length),
  );
}
function renderDash() {
  $("#dashTable").innerHTML = appts
    .slice(0, 5)
    .map(
      (a) =>
        `<tr><td>${a.time}</td><td>${person(a.patient)}</td><td>${a.doctor}</td><td>${a.department}</td><td>${badge(a.status)}</td></tr>`,
    )
    .join("");
}
function renderUsers() {
  let q = $("#uSearch").value.toLowerCase(),
    role = $("#uRole").value,
    dept = $("#uDept").value,
    status = $("#uStatus").value,
    rows = users.filter(
      (u) =>
        u.join(" ").toLowerCase().includes(q) &&
        (!role || u[2] === role) &&
        (!dept || u[3] === dept) &&
        (!status || u[4] === status),
    );
  rows.sort(
    (a, b) =>
      a[["username", "name", "role"].indexOf(userSort)].localeCompare(
        b[["username", "name", "role"].indexOf(userSort)],
      ) * userDir,
  );
  $("#uCount").textContent =
    `User directory · ${rows.length} of ${users.length}`;
  $("#userTable").innerHTML =
    rows
      .map(
        (u) =>
          `<tr><td>${u[0]}</td><td>${person(u[1])}</td><td>${badge(u[2])}</td><td>${u[3]}</td><td>${badge(u[4])}</td><td><button class="action" onclick="alert('Demo user detail: ${u[0]}')">Edit</button></td></tr>`,
      )
      .join("") || `<tr><td colspan="6">No matching users</td></tr>`;
}
$$("[data-usort]").forEach(
  (b) =>
  (b.onclick = () => {
    let k = b.dataset.usort;
    userDir = userSort === k ? -userDir : 1;
    userSort = k;
    renderUsers();
  }),
);
["uSearch", "uRole", "uDept", "uStatus"].forEach(
  (id) => ($("#" + id).oninput = renderUsers),
);
$("#uClear").onclick = () => {
  ["uSearch", "uRole", "uDept", "uStatus"].forEach(
    (i) => ($("#" + i).value = ""),
  );
  renderUsers();
};
$("#userToggle").onclick = () => $("#userPanel").classList.toggle("open");
$$("[data-close]").forEach(
  (b) => (b.onclick = () => $("#" + b.dataset.close).classList.remove("open")),
);
$("#userForm").onsubmit = (e) => {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  if (users.some((u) => u[0] === d.username))
    return alert("Username already exists");
  users.push([d.username, d.name, d.role, d.department || "General", "Active"]);
  e.target.reset();
  $("#userPanel").classList.remove("open");
  updateCounts();
  renderUsers();
};
function renderAppts() {
  let q = $("#aSearch").value.toLowerCase(),
    date = $("#aDate").value,
    status = $("#aStatus").value,
    dept = $("#aDept").value,
    rows = appts.filter(
      (a) =>
        `${a.patient} ${a.doctor}`.toLowerCase().includes(q) &&
        (!date || a.date === date) &&
        (!status || a.status === status) &&
        (!dept || a.department === dept),
    );
  rows.sort((a, b) => a[apptSort].localeCompare(b[apptSort]) * apptDir);
  $("#aCount").textContent = `Appointment schedule · ${rows.length} records`;
  $("#apptTable").innerHTML =
    rows
      .map(
        (a) =>
          `<tr><td>${a.date} · ${a.time}</td><td>${person(a.patient)}</td><td>${a.doctor}</td><td>${a.department}</td><td>${badge(a.status)}</td><td>${a.status === "Cancelled" ? "—" : `<button class="action redtext" onclick="cancelAppt('${a.patient}')">Cancel</button>`}</td></tr>`,
      )
      .join("") || `<tr><td colspan="6">No appointments found</td></tr>`;
}
window.cancelAppt = (n) => {
  let a = appts.find((a) => a.patient === n);
  if (a && confirm("Cancel appointment for " + n + "?")) {
    a.status = "Cancelled";
    renderAppts();
    renderQueue();
  }
};
$$("[data-asort]").forEach(
  (b) =>
  (b.onclick = () => {
    let k = b.dataset.asort;
    apptDir = apptSort === k ? -apptDir : 1;
    apptSort = k;
    renderAppts();
  }),
);
["aSearch", "aDate", "aStatus", "aDept"].forEach(
  (i) => ($("#" + i).oninput = renderAppts),
);
$("#aClear").onclick = () => {
  ["aSearch", "aDate", "aStatus", "aDept"].forEach(
    (i) => ($("#" + i).value = ""),
  );
  renderAppts();
};
$("#apptToggle").onclick = () => $("#apptPanel").classList.toggle("open");
$("#apptForm").onsubmit = (e) => {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  appts.push({ ...d });
  e.target.reset();
  $("#apptPanel").classList.remove("open");
  renderAppts();
  renderQueue();
  renderDash();
};
function renderQueue() {
  let q = $("#qSearch").value.toLowerCase(),
    st = $("#qStatus").value,
    dp = $("#qDept").value,
    date = $("#qDate").value,
    rows = appts
      .filter(
        (a) =>
          `${a.patient} ${a.doctor}`.toLowerCase().includes(q) &&
          (!st || a.status === st) &&
          (!dp || a.department === dp) &&
          (!date || a.date === date),
      )
      .sort((a, b) => a.time.localeCompare(b.time));
  ["Waiting", "Confirmed", "Cancelled"].forEach(
    (s) =>
      ($("#q" + s).textContent = appts.filter((a) => a.status === s).length),
  );
  $("#queueTable").innerHTML =
    rows
      .map(
        (a, i) =>
          `<tr><td>${a.time}</td><td>${i + 1}</td><td>${person(a.patient)}</td><td>${a.doctor}</td><td>${a.department}</td><td>${badge(a.status)}</td></tr>`,
      )
      .join("") || `<tr><td colspan="6">Queue empty</td></tr>`;
}
["qSearch", "qStatus", "qDept", "qDate"].forEach(
  (i) => ($("#" + i).oninput = renderQueue),
);
$("#qClear").onclick = () => {
  ["qSearch", "qStatus", "qDept", "qDate"].forEach(
    (i) => ($("#" + i).value = ""),
  );
  renderQueue();
};
$("#refreshQueue").onclick = renderQueue;
function renderBills() {
  let q = $("#bSearch").value.toLowerCase(),
    st = $("#bStatus").value,
    date = $("#bDate").value,
    svc = $("#bService").value,
    rows = bills.filter(
      (b) =>
        `${b.patient} ${b.service}`.toLowerCase().includes(q) &&
        (!st || b.status === st) &&
        (!date || b.date === date) &&
        (!svc || b.service === svc),
    );
  $("#billTotal").textContent = money(bills.reduce((s, b) => s + b.amount, 0));
  $("#billPaid").textContent = money(
    bills.filter((b) => b.status === "Paid").reduce((s, b) => s + b.amount, 0),
  );
  $("#billDue").textContent = money(
    bills
      .filter((b) => b.status === "Pending")
      .reduce((s, b) => s + b.amount, 0),
  );
  $("#billCount").textContent = bills.length;
  $("#bCount").textContent = `Patient bills · ${rows.length} records`;
  $("#billTable").innerHTML =
    rows
      .map(
        (b) =>
          `<tr><td>${person(b.patient)}</td><td>${b.service}</td><td><b>${money(b.amount)}</b></td><td>${b.date}</td><td>${badge(b.status)}</td><td>${b.status === "Pending" ? `<button class="action" onclick="payBill(${bills.indexOf(b)})">Pay</button>` : ""}<button class="action" onclick="receipt(${bills.indexOf(b)})">Print receipt</button></td></tr>`,
      )
      .join("") || `<tr><td colspan="6">No bills found</td></tr>`;
}
window.payBill = (i) => {
  bills[i].status = "Paid";
  renderBills();
  alert("Payment recorded in demo");
};
window.receipt = (i) => {
  let b = bills[i],
    w = window.open("", "receipt", "width=500,height=600");
  if (!w) return;
  w.document.write(
    `<h2>Northstar Hospital Receipt</h2><p>Patient: ${b.patient}</p><p>Service: ${b.service}</p><p>Amount: ${money(b.amount)}</p><p>Date: ${b.date}</p><p>Status: ${b.status}</p>`,
  );
  w.document.close();
  w.print();
};
["bSearch", "bStatus", "bDate", "bService"].forEach(
  (i) => ($("#" + i).oninput = renderBills),
);
$("#bClear").onclick = () => {
  ["bSearch", "bStatus", "bDate", "bService"].forEach(
    (i) => ($("#" + i).value = ""),
  );
  renderBills();
};
$("#addBill").onclick = () => {
  let patient = prompt("Patient name");
  if (!patient) return;
  let service = prompt("Service name", "Consultation");
  let amount = Number(prompt("Amount in INR", "1000"));
  if (service && amount > 0) {
    bills.push({
      patient,
      service,
      amount,
      date: today,
      status: "Pending",
    });
    renderBills();
  }
};
function exportCsv(rows, name) {
  let csv = rows
    .map((r) =>
      r.map((x) => `"${String(x ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\r\n"),
    blob = new Blob([csv], { type: "text/csv" }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
$("#billExport").onclick = () =>
  exportCsv(
    [
      ["Patient", "Service", "Amount", "Date", "Status"],
      ...bills.map((b) => [b.patient, b.service, b.amount, b.date, b.status]),
    ],
    "hms-bills.csv",
  );
$("#reportExport").onclick = () =>
  exportCsv(
    [
      ["Metric", "Value"],
      ["Patients today", 126],
      [
        "Upcoming appointments",
        appts.filter((a) => !["Cancelled", "Completed"].includes(a.status))
          .length,
      ],
      [
        "Completed visits",
        appts.filter((a) => a.status === "Completed").length,
      ],
      [
        "Daily revenue",
        bills
          .filter((b) => b.status === "Paid")
          .reduce((s, b) => s + b.amount, 0),
      ],
      ["Outflow", 36200],
    ],
    "hms-report.csv",
  );
$("#period").onchange = (e) => {
  let p = e.target.value,
    m = p === "Today" ? 1 : p === "This week" ? 6 : 27;
  $("#rPatients").textContent = 126 * m;
  $("#rUpcoming").textContent = 34 * m;
  $("#rCompleted").textContent = 82 * m;
  $("#rRevenue").textContent = money(84250 * m);
};
$("#globalSearch").oninput = (e) => {
  let p = $(".view.active").id,
    v = e.target.value;
  if (p === "users") (($("#uSearch").value = v), renderUsers());
  if (p === "appointments") (($("#aSearch").value = v), renderAppts());
  if (p === "queue") (($("#qSearch").value = v), renderQueue());
  if (p === "billing") (($("#bSearch").value = v), renderBills());
};
$("#profileForm").onsubmit = (e) => {
  e.preventDefault();
  $("#topName").textContent = $("#pUsername").value;
  $("#profileNotice").textContent = "Profile changes saved in this demo.";
  $("#profileNotice").classList.add("show");
};
$("#photoInput").onchange = (e) => {
  let f = e.target.files[0];
  if (f) {
    photo = URL.createObjectURL(f);
    $("#topPhoto").src = photo;
    $("#photoPreview").src = photo;
  }
};
$("#profileForm").onreset = () =>
  setTimeout(() => {
    $("#topPhoto").src = photo;
    $("#photoPreview").src = photo;
  }, 0);
const profile = {
  pUsername: "Olivia Martin",
  pEmail: "olivia.martin@northstar.example",
  pFirst: "Olivia",
  pMiddle: "Rose",
  pLast: "Martin",
  pPhone: "+1 555 0184",
  pAddress: "24 Wellness Avenue, Springfield",
  pAge: "34",
  pDob: "1992-04-18",
  pGender: "Female",
};
Object.entries(profile).forEach(([id, val]) => ($("#" + id).value = val));
updateCounts();
renderDash();
renderUsers();
renderAppts();
renderQueue();
renderBills();
