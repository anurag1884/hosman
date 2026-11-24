// =========================================================================
// STATE & MOCK DATA (Replace with API calls at [BACKEND HOOK] markers)
// =========================================================================
import { attachTableSorting, escapeHtml, sendRequest } from '../common/script.js';
export const DEFAULT_DEPARTMENT_NAME = "General Medicine";
// [BACKEND HOOK] Load logged-in user profile from /api/auth/me
export let loggedInUserId = 1;
export let users = [
    {
        id: 1,
        username: "dr.admin",
        role: "ADMIN",
        active: true,
        firstName: "Aarav",
        middleName: "Kumar",
        lastName: "Sen",
        gender: "Male",
        dob: "1982-04-12",
        email: "admin@medicore-hms.org",
        phone: "+1-555-0101",
        address: "100 Health Park Blvd, Suite 400"
    },
    {
        id: 2,
        username: "dr.chen",
        role: "DOCTOR",
        active: true,
        firstName: "Mei",
        middleName: "",
        lastName: "Chen",
        gender: "Female",
        dob: "1979-08-23",
        email: "m.chen@medicore-hms.org",
        phone: "+1-555-0102",
        address: "24 Maple Grove Lane",
        department: "Cardiology",
        qualification: "MBBS, MD, DM",
        specialization: "Interventional Cardiology",
        yearsOfExperience: 16,
        workingTimeStart: "09:00",
        workingTimeEnd: "17:00",
        isAvailable: true
    },
    {
        id: 3,
        username: "dr.patel",
        role: "DOCTOR",
        active: true,
        firstName: "Rohan",
        middleName: "Dev",
        lastName: "Patel",
        gender: "Male",
        dob: "1984-01-17",
        email: "r.patel@medicore-hms.org",
        phone: "+1-555-0103",
        address: "88 Cedar Ridge Ave",
        department: "Orthopedics",
        qualification: "MBBS, MS (Ortho)",
        specialization: "Joint Replacement & Trauma",
        yearsOfExperience: 12,
        workingTimeStart: "10:00",
        workingTimeEnd: "18:00",
        isAvailable: true
    },
    {
        id: 4,
        username: "nurse.claire",
        role: "NURSE",
        active: true,
        firstName: "Claire",
        middleName: "Anne",
        lastName: "Brooks",
        gender: "Female",
        dob: "1991-11-05",
        email: "c.brooks@medicore-hms.org",
        phone: "+1-555-0104",
        address: "12 Birch Terrace",
        department: "Emergency Medicine",
        qualification: "B.Sc. Nursing, RN",
        specialization: "Critical & Trauma Care",
        yearsOfExperience: 7,
        workingTimeStart: "07:00",
        workingTimeEnd: "19:00",
        isAvailable: true
    },
    {
        id: 5,
        username: "rec.liam",
        role: "RECEPTIONIST",
        active: true,
        firstName: "Liam",
        middleName: "",
        lastName: "Hayes",
        gender: "Male",
        dob: "1995-06-30",
        email: "l.hayes@medicore-hms.org",
        phone: "+1-555-0105",
        address: "405 Oakwood St",
        yearsOfExperience: 4,
        workingTimeStart: "08:00",
        workingTimeEnd: "16:00",
        isAvailable: true
    },
    {
        id: 6,
        username: "pharm.nina",
        role: "PHARMACIST",
        active: false,
        firstName: "Nina",
        middleName: "",
        lastName: "Roy",
        gender: "Female",
        dob: "1989-03-19",
        email: "n.roy@medicore-hms.org",
        phone: "+1-555-0106",
        address: "77 Pinecrest Dr",
        qualification: "Pharm.D",
        yearsOfExperience: 9,
        workingTimeStart: "09:30",
        workingTimeEnd: "17:30",
        isAvailable: false
    },
    {
        id: 7,
        username: "pat.oliver",
        role: "PATIENT",
        active: true,
        firstName: "Oliver",
        middleName: "James",
        lastName: "Reed",
        gender: "Male",
        dob: "1998-09-14",
        email: "o.reed@example.com",
        phone: "+1-555-0107",
        address: "512 Riverview Rd",
        bloodGroup: "O+"
    },
    {
        id: 8,
        username: "pat.sophia",
        role: "PATIENT",
        active: true,
        firstName: "Sophia",
        middleName: "",
        lastName: "Alvarez",
        gender: "Female",
        dob: "1974-02-27",
        email: "s.alvarez@example.com",
        phone: "+1-555-0108",
        address: "903 Sunset Way",
        bloodGroup: "A-"
    }
];
export let departments = [
    {
        id: 1,
        name: DEFAULT_DEPARTMENT_NAME,
        headDoctorId: 2,
        description: "Primary internal medicine, general outpatient care and diagnostics.",
        isDefault: true
    },
    { id: 2, name: "Cardiology", headDoctorId: 2, description: "Heart & vascular diagnostics and care." },
    { id: 3, name: "Orthopedics", headDoctorId: 3, description: "Bone, joint and musculoskeletal treatment." },
    { id: 4, name: "Emergency Medicine", headDoctorId: 2, description: "24/7 acute trauma and urgent stabilization." }
];
export let medications = [
    {
        id: 1,
        name: "Amoxil 500",
        genericName: "Amoxicillin",
        category: "Antibiotic",
        manufacturer: "HealthCorp Labs",
        batchNumber: "AMX-2026-09",
        price: 14.5,
        quantity: 180,
        reorderLevel: 40,
        expiryDate: "2027-10-31",
        description: "Broad-spectrum penicillin antibiotic.",
        sideEffects: "Mild nausea, diarrhea, rash.",
        prescriptionOnly: true
    },
    {
        id: 2,
        name: "Dolopar 650",
        genericName: "Acetaminophen",
        category: "Analgesic / Antipyretic",
        manufacturer: "MedLife Pharma",
        batchNumber: "DLP-2026-04",
        price: 5.25,
        quantity: 22,
        reorderLevel: 50,
        expiryDate: "2028-03-15",
        description: "Fever and mild-to-moderate pain relief.",
        sideEffects: "Rare liver strain if overdosed.",
        prescriptionOnly: false
    }
];
export let beds = [
    { id: 1, ward: "Emergency", bedNumber: "EME-101", pricePerDay: 250, occupied: true, patientName: "Oliver Reed" },
    { id: 2, ward: "Emergency", bedNumber: "EME-102", pricePerDay: 250, occupied: false, patientName: "" },
    { id: 3, ward: "General", bedNumber: "GEN-101", pricePerDay: 110, occupied: false, patientName: "" },
    { id: 4, ward: "General", bedNumber: "GEN-102", pricePerDay: 110, occupied: true, patientName: "Sophia Alvarez" },
    { id: 5, ward: "General", bedNumber: "GEN-103", pricePerDay: 110, occupied: false, patientName: "" },
    { id: 6, ward: "ICU", bedNumber: "ICU-201", pricePerDay: 480, occupied: false, patientName: "" },
    { id: 7, ward: "ICU", bedNumber: "ICU-202", pricePerDay: 480, occupied: true, patientName: "Marcus Vance" },
    { id: 8, ward: "Private", bedNumber: "PRV-301", pricePerDay: 320, occupied: false, patientName: "" }
];
// Explicit wards list so wards exist even with 0 beds until explicitly deleted
export let wardsList = [...new Set(beds.map((b) => b.ward))];
export let bloodStock = {
    "A+": 14,
    "A-": 5,
    "B+": 11,
    "B-": 3,
    "O+": 19,
    "O-": 4,
    "AB+": 6,
    "AB-": 2
};
export let donations = [
    {
        id: 1,
        donorName: "Elena Rostova",
        bloodGroup: "O+",
        units: 2,
        phone: "+1-555-0211",
        email: "elena.r@example.com",
        notes: "Voluntary camp donor"
    }
];
export let invoices = [
    {
        id: 1,
        invoiceNo: "INV-1001",
        patientName: "Oliver Reed",
        date: "2026-11-12",
        totalAmount: 1200,
        amountPaid: 1200,
        amountDue: 0,
        status: "Paid",
        itemsSummary: "Consultation + Lab Panel + Pharmacy"
    },
    {
        id: 2,
        invoiceNo: "INV-1002",
        patientName: "Sophia Alvarez",
        date: "2026-11-18",
        totalAmount: 2450,
        amountPaid: 1000,
        amountDue: 1450,
        status: "Partially Paid",
        itemsSummary: "General Ward (3 days) + Diagnostics"
    },
    {
        id: 3,
        invoiceNo: "INV-1003",
        patientName: "Marcus Vance",
        date: "2026-11-20",
        totalAmount: 3800,
        amountPaid: 0,
        amountDue: 3800,
        status: "Pending",
        itemsSummary: "ICU Admission + Monitoring"
    }
];
export let notifications = [
    {
        id: 1,
        text: "New user account 'pat.sophia' (PATIENT) was registered.",
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        unread: true
    },
    {
        id: 2,
        text: "Low stock alert: Dolopar 650 is below reorder level (22 units left).",
        timestamp: Date.now() - 35 * 60 * 1000,
        unread: true
    },
    {
        id: 3,
        text: "Department 'Cardiology' head doctor confirmed as dr.chen.",
        timestamp: Date.now() - 26 * 60 * 60 * 1000,
        unread: false
    }
];
export let activeNotificationFilter = "all";
export let hospitalSettings = {
    hospitalName: "Unnamed Hospital",
    contactEmail: "contact@medicore-hms.org",
    phoneNumber: "+1-800-555-0199",
    address: "100 Health Park Blvd, Metro City",
    notificationsEnabled: true
};
// Analytics datasets (replace via backend API)
export const analyticsData = {
    totalRevenueAllTime: 842500,
    newPatientsThisMonth: 148,
    totalAppointments: 1920,
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthlyRevenueK: [58, 62, 69, 65, 74, 79, 82, 77, 85, 88, 92, 95],
    monthlyAppointments: [140, 152, 165, 158, 174, 180, 190, 176, 188, 195, 204, 210],
    appointmentStatus: {
        Requested: 140,
        Confirmed: 420,
        Rejected: 55,
        Absent: 48,
        Cancelled: 92,
        "Checked In": 115,
        "In Progress": 80,
        Referred: 62,
        Completed: 1176
    }
};
// =========================================================================
// TOAST, CONFIRMATION DIALOG & MODAL UTILITIES
// =========================================================================
export function getTodayIsoDate() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
export function formatRelativeTime(timestamp) {
    const ts = Number(timestamp);
    if (!Number.isFinite(ts))
        return "Just now";
    const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (diffSec < 10)
        return "Just now";
    if (diffSec < 60)
        return `${diffSec} sec${diffSec === 1 ? "" : "s"} ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60)
        return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24)
        return `${diffHr} hr${diffHr === 1 ? "" : "s"} ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays === 1)
        return "Yesterday";
    if (diffDays < 30)
        return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12)
        return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
}
export function showToast(message, type = "success") {
    if (!hospitalSettings.notificationsEnabled && type !== "error")
        return;
    const container = document.getElementById("toastContainer");
    if (!container)
        return;
    const toast = document.createElement("div");
    toast.className = `toast ${type === "error" ? "error" : ""}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}"></i>
        <span>${escapeHtml(message)}</span>
      `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
}
export function addNotification(text) {
    if (!hospitalSettings.notificationsEnabled)
        return;
    notifications.unshift({
        id: Date.now(),
        text,
        timestamp: Date.now(),
        unread: true
    });
    renderNotifications();
    updateBellDot();
}
export function updateBellDot() {
    const dot = document.getElementById("bellRedDot");
    if (!dot)
        return;
    const hasUnread = hospitalSettings.notificationsEnabled && notifications.some((n) => n.unread);
    dot.classList.toggle("active", hasUnread);
}
export function openModal(modalId) {
    document.getElementById(modalId)?.classList.add("open");
}
export function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el)
        el.classList.remove("open");
}
/**
 * Reusable Confirmation Dialog Modal (prevents accidental deletions and confirms logout)
 */
export let pendingConfirmAction = null;
export let pendingUserStatusAction = null;
export function openConfirmDialog({ title = "Confirm Action", message = "Are you sure you want to proceed?", subtext = "This action cannot be undone.", confirmText = "Delete", cancelText = "Cancel", variant = "danger", iconClass = "fa-triangle-exclamation", onConfirm }) {
    const header = document.getElementById("confirmDialogHeader");
    const iconWrap = document.getElementById("confirmDialogIcon");
    const proceedBtn = document.getElementById("confirmDialogProceedBtn");
    const cancelBtn = document.getElementById("confirmDialogCancelBtn");
    const titleEl = document.getElementById("confirmDialogTitle");
    const messageEl = document.getElementById("confirmDialogMessage");
    const subtextEl = document.getElementById("confirmDialogSubtext");
    if (titleEl)
        titleEl.textContent = title;
    if (messageEl)
        messageEl.textContent = message;
    if (subtextEl) {
        subtextEl.textContent = subtext || "";
        subtextEl.style.display = subtext ? "block" : "none";
    }
    header?.classList.toggle("danger", variant === "danger");
    if (iconWrap) {
        iconWrap.className = `confirm-dialog-icon ${variant === "warning" ? "warning" : ""}`;
        iconWrap.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    }
    if (proceedBtn) {
        proceedBtn.textContent = confirmText;
        proceedBtn.className = `btn ${variant === "danger" ? "btn-danger-solid" : "btn-primary"}`;
    }
    if (cancelBtn) {
        cancelBtn.textContent = cancelText;
    }
    pendingConfirmAction = typeof onConfirm === "function" ? onConfirm : null;
    openModal("confirmDialogModal");
}
document.getElementById("confirmDialogProceedBtn")?.addEventListener("click", () => {
    const action = pendingConfirmAction;
    pendingConfirmAction = null;
    closeModal("confirmDialogModal");
    if (action)
        action();
});
document.getElementById("userStatusConfirmBtn")?.addEventListener("click", () => {
    const action = pendingUserStatusAction;
    pendingUserStatusAction = null;
    closeModal("userStatusModal");
    if (action)
        action();
});
// Delegated click handler so both static and dynamically injected [data-close-modal] buttons work reliably
document.addEventListener("click", (e) => {
    const target = e.target;
    const closeBtn = target?.closest("[data-close-modal]");
    if (closeBtn) {
        const modalId = closeBtn.getAttribute("data-close-modal");
        if (modalId) {
            if (modalId === "confirmDialogModal")
                pendingConfirmAction = null;
            if (modalId === "userStatusModal")
                pendingUserStatusAction = null;
            closeModal(modalId);
        }
        return;
    }
    const pwdToggleBtn = target?.closest("[data-toggle-password]");
    if (pwdToggleBtn) {
        const targetId = pwdToggleBtn.getAttribute("data-toggle-password");
        const input = targetId ? document.getElementById(targetId) : null;
        const icon = pwdToggleBtn.querySelector("i");
        if (input) {
            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            pwdToggleBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
            pwdToggleBtn.setAttribute("title", isHidden ? "Hide password" : "Show password");
            if (icon) {
                icon.className = isHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
            }
        }
    }
});
export function resetPasswordVisibility(containerEl) {
    if (!containerEl)
        return;
    containerEl.querySelectorAll("[data-toggle-password]").forEach((btn) => {
        const targetId = btn.getAttribute("data-toggle-password");
        const input = targetId ? document.getElementById(targetId) : null;
        const icon = btn.querySelector("i");
        if (input)
            input.type = "password";
        btn.setAttribute("aria-label", "Show password");
        btn.setAttribute("title", "Show password");
        if (icon)
            icon.className = "fa-solid fa-eye";
    });
}
// Track mousedown target so dragging from inside a modal and releasing outside does NOT close the modal
export let modalMouseDownTarget = null;
document.addEventListener("mousedown", (e) => {
    modalMouseDownTarget = e.target;
});
document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop && modalMouseDownTarget === backdrop) {
            if (backdrop.id === "confirmDialogModal")
                pendingConfirmAction = null;
            if (backdrop.id === "userStatusModal")
                pendingUserStatusAction = null;
            backdrop.classList.remove("open");
        }
        modalMouseDownTarget = null;
    });
});
// Allow Escape key to close the topmost open modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const userStatusModal = document.getElementById("userStatusModal");
        if (userStatusModal?.classList.contains("open")) {
            pendingUserStatusAction = null;
            userStatusModal.classList.remove("open");
            return;
        }
        const confirmModal = document.getElementById("confirmDialogModal");
        if (confirmModal?.classList.contains("open")) {
            pendingConfirmAction = null;
            confirmModal.classList.remove("open");
            return;
        }
        document.querySelectorAll(".modal-backdrop.open").forEach((m) => m.classList.remove("open"));
    }
});
// =========================================================================
// NAVIGATION, TOPBAR PROFILE & BELL WIRING
// =========================================================================
export function navigateToSection(sectionKey) {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.section === sectionKey);
    });
    document.querySelectorAll(".section-view").forEach((sec) => {
        sec.classList.toggle("active", sec.id === `sec-${sectionKey}`);
    });
    document.getElementById("sidebar")?.classList.remove("open");
    if (sectionKey === "analytics") {
        renderAnalyticsCharts();
    }
    if (sectionKey === "notifications") {
        renderNotifications();
    }
}
document.getElementById("navList")?.addEventListener("click", (e) => {
    const target = e.target;
    const btn = target?.closest(".nav-btn");
    if (btn && btn.dataset.section) {
        navigateToSection(btn.dataset.section);
    }
});
document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.toggle("open");
});
// Bell button opens Notifications section
document.getElementById("bellBtn")?.addEventListener("click", () => {
    navigateToSection("notifications");
});
// Profile dropdown toggle
export const profileDropdown = document.getElementById("profileDropdown");
document.getElementById("profileTrigger")?.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown?.classList.toggle("open");
});
document.addEventListener("click", () => {
    profileDropdown?.classList.remove("open");
});
document.getElementById("openMyProfileBtn")?.addEventListener("click", () => {
    profileDropdown?.classList.remove("open");
    openUserProfileModal(loggedInUserId, true);
});
document.getElementById("openChangePasswordBtn")?.addEventListener("click", () => {
    profileDropdown?.classList.remove("open");
    const form = document.getElementById("changePasswordForm");
    if (form) {
        form.reset();
        resetPasswordVisibility(form);
    }
    openModal("changePasswordModal");
});
document.getElementById("changePasswordForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const currentPwd = document.getElementById("currentPasswordInput")?.value ?? "";
    const newPwd = document.getElementById("newPasswordInput")?.value ?? "";
    const repeatPwd = document.getElementById("repeatNewPasswordInput")?.value ?? "";
    if (!currentPwd) {
        showToast("Please enter your current password.", "error");
        return;
    }
    if (newPwd !== repeatPwd) {
        showToast("New password and repeat password do not match.", "error");
        return;
    }
    if (newPwd === currentPwd) {
        showToast("New password must be different from your current password.", "error");
        return;
    }
    // [BACKEND HOOK] POST /api/auth/change-password { currentPassword: currentPwd, newPassword: newPwd }
    closeModal("changePasswordModal");
    form.reset();
    resetPasswordVisibility(form);
    addNotification("Administrator account password was updated.");
    showToast("Password changed successfully.");
});
export function promptLogout() {
    profileDropdown?.classList.remove("open");
    openConfirmDialog({
        title: "Confirm Logout",
        message: "Are you sure you want to log out?",
        subtext: "Any unsaved form changes will be lost and you will need to sign in again.",
        confirmText: "Yes, Log Out",
        cancelText: "Stay Logged In",
        variant: "warning",
        iconClass: "fa-right-from-bracket",
        onConfirm: async () => {
            // [BACKEND HOOK] Call POST /api/auth/logout and redirect to login page
            try {
                const logoutResponse = await sendRequest("/logout", {
                    method: "POST",
                });
                if (!logoutResponse) {
                    showToast("Server request failed", "success");
                    return;
                }
                if (!logoutResponse.ok) {
                    showToast((await logoutResponse.json()).message, "success");
                    return;
                }
                showToast("Logged out of HMS session.", "success");
                window.location.href = "/";
            }
            catch {
                showToast("Network error. Please try again.", "success");
            }
        }
    });
}
document.getElementById("dropdownLogoutBtn")?.addEventListener("click", promptLogout);
document.getElementById("sidebarLogoutBtn")?.addEventListener("click", promptLogout);
export function getUserDisplayName(user) {
    if (!user)
        return "Administrator";
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return fullName || user.username || "User";
}
export function refreshTopbarProfile() {
    const me = users.find((u) => u.id === loggedInUserId) || users[0];
    const displayName = getUserDisplayName(me);
    const usernameEl = document.getElementById("topbarUsername");
    const roleEl = document.getElementById("topbarRole");
    const avatarEl = document.getElementById("topbarAvatar");
    const greetingEl = document.getElementById("welcomeGreeting");
    if (usernameEl)
        usernameEl.textContent = me.username;
    if (roleEl)
        roleEl.textContent = me.role;
    if (avatarEl) {
        avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0f766e&color=ffffff`;
    }
    if (greetingEl)
        greetingEl.textContent = `Welcome back, ${displayName}!`;
}
// =========================================================================
// SECTION 1: DASHBOARD OVERVIEW
// =========================================================================
export function renderDashboard() {
    const now = new Date();
    const dateDisplay = document.getElementById("currentDateDisplay");
    if (dateDisplay) {
        dateDisplay.textContent = now.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    const countByRole = (r) => users.filter((u) => u.role === r).length;
    const availableBeds = beds.filter((b) => !b.occupied).length;
    const monthlyRevenue = analyticsData.monthlyRevenueK[now.getMonth()] * 1000;
    const stats = [
        { label: "Patients", value: countByRole("PATIENT"), icon: "fa-hospital-user" },
        { label: "Doctors", value: countByRole("DOCTOR"), icon: "fa-user-doctor" },
        { label: "Nurses", value: countByRole("NURSE"), icon: "fa-user-nurse" },
        { label: "Receptionists", value: countByRole("RECEPTIONIST"), icon: "fa-user-tie" },
        { label: "Pharmacists", value: countByRole("PHARMACIST"), icon: "fa-prescription-bottle-medical" },
        { label: "Available Beds", value: availableBeds, icon: "fa-bed" },
        { label: "Monthly Revenue", value: `₹${monthlyRevenue.toLocaleString("en-IN")}`, icon: "fa-indian-rupee-sign" }
    ];
    const statsGrid = document.getElementById("dashboardStatsGrid");
    if (statsGrid) {
        statsGrid.innerHTML = stats
            .map((s) => `
              <div class="stat-card">
                <div>
                  <div class="stat-label">${escapeHtml(s.label)}</div>
                  <div class="stat-value">${escapeHtml(s.value)}</div>
                </div>
                <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
              </div>`)
            .join("");
    }
}
// =========================================================================
// SECTION 2: MANAGE USERS & PROFILE MODAL
// =========================================================================
export const CLINICAL_DEPT_ROLES = ["DOCTOR", "NURSE"];
export const QUALIFICATION_ROLES = ["DOCTOR", "NURSE", "PHARMACIST"];
export const SPECIALIZATION_ROLES = ["DOCTOR", "NURSE"];
export const STAFF_AVAILABILITY_EXP_ROLES = ["DOCTOR", "NURSE", "PHARMACIST", "RECEPTIONIST"];
export function populateUserDepartmentDropdowns(selectedDept = "") {
    const profDeptSelect = document.getElementById("profDepartment");
    if (profDeptSelect) {
        profDeptSelect.innerHTML =
            `<option value="" disabled>Select Department</option>` +
                departments.map((d) => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)}</option>`).join("");
        const validDept = departments.some((d) => d.name === selectedDept) ? selectedDept : "";
        profDeptSelect.value = validDept;
    }
    const filterDeptSelect = document.getElementById("userDepartmentFilter");
    if (filterDeptSelect) {
        const currentFilter = filterDeptSelect.value;
        filterDeptSelect.innerHTML =
            `<option value="">All Departments</option>` +
                departments.map((d) => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)}</option>`).join("") +
                `<option value="N/A">N/A</option>`;
        if ([...filterDeptSelect.options].some((opt) => opt.value === currentFilter)) {
            filterDeptSelect.value = currentFilter;
        }
    }
}
export function syncProfileRoleFields(role, userObj = {}) {
    const isPatient = role === "PATIENT";
    const hasDept = CLINICAL_DEPT_ROLES.includes(role);
    const hasQual = QUALIFICATION_ROLES.includes(role);
    const hasSpec = SPECIALIZATION_ROLES.includes(role);
    const hasStaffFields = STAFF_AVAILABILITY_EXP_ROLES.includes(role);
    const hasAnyRoleDetail = isPatient || hasDept || hasQual || hasSpec || hasStaffFields;
    const roleDetailsSection = document.getElementById("profRoleDetailsSection");
    if (roleDetailsSection) {
        roleDetailsSection.style.display = hasAnyRoleDetail ? "block" : "none";
    }
    const bloodWrap = document.getElementById("profBloodGroupWrap");
    const bloodSelect = document.getElementById("profBloodGroup");
    if (bloodWrap)
        bloodWrap.style.display = isPatient ? "flex" : "none";
    if (bloodSelect) {
        bloodSelect.required = isPatient;
        if (isPatient)
            bloodSelect.value = userObj.bloodGroup || "";
    }
    const deptWrap = document.getElementById("profDepartmentWrap");
    const deptSelect = document.getElementById("profDepartment");
    if (deptWrap)
        deptWrap.style.display = hasDept ? "flex" : "none";
    if (deptSelect) {
        deptSelect.required = hasDept;
        if (hasDept)
            populateUserDepartmentDropdowns(userObj.department || "");
    }
    const qualWrap = document.getElementById("profQualificationWrap");
    const qualInput = document.getElementById("profQualification");
    if (qualWrap)
        qualWrap.style.display = hasQual ? "flex" : "none";
    if (qualInput) {
        qualInput.required = hasQual;
        if (hasQual)
            qualInput.value = userObj.qualification || "";
    }
    const specWrap = document.getElementById("profSpecializationWrap");
    const specInput = document.getElementById("profSpecialization");
    if (specWrap)
        specWrap.style.display = hasSpec ? "flex" : "none";
    if (specInput) {
        specInput.required = hasSpec;
        if (hasSpec)
            specInput.value = userObj.specialization || "";
    }
    const expWrap = document.getElementById("profExperienceWrap");
    const expInput = document.getElementById("profExperience");
    if (expWrap)
        expWrap.style.display = hasStaffFields ? "flex" : "none";
    if (expInput) {
        expInput.required = hasStaffFields;
        if (hasStaffFields) {
            const hasExp = userObj.yearsOfExperience !== undefined &&
                userObj.yearsOfExperience !== null &&
                String(userObj.yearsOfExperience) !== "";
            expInput.value = hasExp ? String(userObj.yearsOfExperience) : "";
        }
    }
    const workTimeWrap = document.getElementById("profWorkingTimeWrap");
    const workStartInput = document.getElementById("profWorkStart");
    const workEndInput = document.getElementById("profWorkEnd");
    if (workTimeWrap)
        workTimeWrap.style.display = hasStaffFields ? "flex" : "none";
    if (workStartInput) {
        workStartInput.required = hasStaffFields;
        if (hasStaffFields)
            workStartInput.value = userObj.workingTimeStart || "";
    }
    if (workEndInput) {
        workEndInput.required = hasStaffFields;
        if (hasStaffFields)
            workEndInput.value = userObj.workingTimeEnd || "";
    }
    const availWrap = document.getElementById("profAvailabilityWrap");
    const availCheck = document.getElementById("profIsAvailable");
    if (availWrap)
        availWrap.style.display = hasStaffFields ? "flex" : "none";
    if (availCheck && hasStaffFields) {
        availCheck.checked = Boolean(userObj.isAvailable);
    }
}
document.getElementById("profRole")?.addEventListener("change", (e) => {
    const select = e.target;
    const id = Number(document.getElementById("profUserId")?.value);
    const existing = users.find((u) => u.id === id) || {};
    syncProfileRoleFields(select.value, existing);
});
export function enrichUserRecord(u) {
    const hasDept = CLINICAL_DEPT_ROLES.includes(u.role);
    const hasQual = QUALIFICATION_ROLES.includes(u.role);
    const hasSpec = SPECIALIZATION_ROLES.includes(u.role);
    const hasStaffFields = STAFF_AVAILABILITY_EXP_ROLES.includes(u.role);
    const trimmedFirst = (u.firstName || "").trim();
    const trimmedLast = (u.lastName || "").trim();
    const rawFullName = `${trimmedFirst} ${trimmedLast}`.trim();
    const fullNameDisplay = rawFullName || "—";
    const emailDisplay = (u.email || "").trim() || "—";
    const departmentDisplay = hasDept && (u.department || "").trim() ? u.department.trim() : "N/A";
    const availabilityDisplay = hasStaffFields ? (u.isAvailable ? "Available" : "Unavailable") : "N/A";
    const qualificationDisplay = hasQual && (u.qualification || "").trim() ? u.qualification.trim() : "N/A";
    const specializationDisplay = hasSpec && (u.specialization || "").trim() ? u.specialization.trim() : "N/A";
    const hasExpNum = hasStaffFields &&
        u.yearsOfExperience !== undefined &&
        u.yearsOfExperience !== null &&
        String(u.yearsOfExperience) !== "" &&
        Number.isFinite(Number(u.yearsOfExperience));
    const experienceDisplay = hasExpNum ? `${Number(u.yearsOfExperience)} yrs` : "N/A";
    const experienceSortVal = hasExpNum ? Number(u.yearsOfExperience) : -1;
    const startTime = (u.workingTimeStart || "").trim();
    const endTime = (u.workingTimeEnd || "").trim();
    const workingTimeDisplay = hasStaffFields && startTime && endTime ? `${startTime} – ${endTime}` : "N/A";
    return {
        ...u,
        fullName: rawFullName,
        fullNameDisplay,
        emailDisplay,
        departmentDisplay,
        availabilityDisplay,
        qualificationDisplay,
        specializationDisplay,
        experienceDisplay,
        experienceSortVal,
        workingTimeDisplay,
        statusLabel: u.active !== false ? "Active" : "Inactive"
    };
}
export function getFilteredUsers() {
    const query = document.getElementById("userSearchInput")?.value.trim().toLowerCase() ?? "";
    const role = document.getElementById("userRoleFilter")?.value ?? "";
    const deptFilter = document.getElementById("userDepartmentFilter")?.value ?? "";
    const availFilter = document.getElementById("userAvailabilityFilter")?.value ?? "";
    const statusFilter = document.getElementById("userStatusFilter")?.value ?? "";
    return users.map(enrichUserRecord).filter((u) => {
        const searchableName = `${u.firstName || ""} ${u.middleName || ""} ${u.lastName || ""}`.toLowerCase();
        const isActive = u.active !== false;
        const matchesQuery = !query || u.username.toLowerCase().includes(query) || searchableName.includes(query);
        const matchesRole = !role || u.role === role;
        const matchesDept = !deptFilter || u.departmentDisplay === deptFilter;
        let matchesAvail = true;
        if (availFilter === "available")
            matchesAvail = u.availabilityDisplay === "Available";
        else if (availFilter === "unavailable")
            matchesAvail = u.availabilityDisplay === "Unavailable";
        else if (availFilter === "na")
            matchesAvail = u.availabilityDisplay === "N/A";
        const matchesStatus = !statusFilter ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "inactive" && !isActive);
        return matchesQuery && matchesRole && matchesDept && matchesAvail && matchesStatus;
    });
}
export function renderUsersTable(list = getFilteredUsers()) {
    const tbody = document.getElementById("usersTableBody");
    if (!tbody)
        return;
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="12" style="text-align:center;color:var(--text-muted);">No matching users found.</td></tr>`;
        return;
    }
    tbody.innerHTML = list
        .map((u) => {
        const isSelf = u.id === loggedInUserId;
        const isActive = u.active !== false;
        const statusBadge = isActive
            ? `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Active</span>`
            : `<span class="badge badge-warning"><i class="fa-solid fa-circle-pause"></i> Inactive</span>`;
        const deptBadge = u.departmentDisplay === "N/A"
            ? `<span class="badge badge-gray">N/A</span>`
            : `<span class="badge badge-info">${escapeHtml(u.departmentDisplay)}</span>`;
        let availBadge = `<span class="badge badge-gray">N/A</span>`;
        if (u.availabilityDisplay === "Available") {
            availBadge = `<span class="badge badge-success">Available</span>`;
        }
        else if (u.availabilityDisplay === "Unavailable") {
            availBadge = `<span class="badge badge-danger">Unavailable</span>`;
        }
        const toggleStatusBtn = isActive
            ? `<button type="button" class="btn btn-sm btn-warning" onclick="promptToggleUserActiveStatus(${u.id})" title="Deactivate user">
                     <i class="fa-solid fa-user-slash"></i> Deactivate
                   </button>`
            : `<button type="button" class="btn btn-sm btn-success" onclick="promptToggleUserActiveStatus(${u.id})" title="Activate user">
                     <i class="fa-solid fa-user-check"></i> Activate
                   </button>`;
        const rowTitle = isSelf ? "Click to open My Profile Settings" : "Click to view/edit user profile";
        return `
              <tr class="clickable-row ${isActive ? "" : "user-inactive"}" data-user-id="${u.id}" title="${rowTitle}">
                <td><strong>${escapeHtml(u.username)}</strong></td>
                <td><span class="badge badge-teal">${escapeHtml(u.role)}</span></td>
                <td>${escapeHtml(u.fullNameDisplay)}</td>
                <td>${escapeHtml(u.emailDisplay)}</td>
                <td>${deptBadge}</td>
                <td>${availBadge}</td>
                <td>${escapeHtml(u.qualificationDisplay)}</td>
                <td>${escapeHtml(u.specializationDisplay)}</td>
                <td>${escapeHtml(u.experienceDisplay)}</td>
                <td>${escapeHtml(u.workingTimeDisplay)}</td>
                <td>${statusBadge}</td>
                <td onclick="event.stopPropagation();">
                  ${!isSelf
            ? `<div class="action-btn-group">
                             ${toggleStatusBtn}
                             <button type="button" class="btn btn-sm btn-danger" onclick="deleteUser(${u.id})">
                               <i class="fa-solid fa-trash"></i> Delete
                             </button>
                           </div>`
            : `<span class="badge badge-teal">Current User</span>`}
                </td>
              </tr>`;
    })
        .join("");
    tbody.querySelectorAll("tr.clickable-row").forEach((tr) => {
        tr.addEventListener("click", () => {
            const userId = Number(tr.dataset.userId);
            openUserProfileModal(userId, userId === loggedInUserId);
        });
    });
}
export function promptToggleUserActiveStatus(id) {
    const target = users.find((u) => u.id === id);
    if (!target || id === loggedInUserId)
        return;
    const currentlyActive = target.active !== false;
    const willActivate = !currentlyActive;
    const displayName = getUserDisplayName(target);
    const header = document.getElementById("userStatusModalHeader");
    const iconWrap = document.getElementById("userStatusModalIcon");
    const titleEl = document.getElementById("userStatusModalTitle");
    const messageEl = document.getElementById("userStatusModalMessage");
    const subtextEl = document.getElementById("userStatusModalSubtext");
    const summaryCard = document.getElementById("userStatusSummaryCard");
    const confirmBtn = document.getElementById("userStatusConfirmBtn");
    if (titleEl) {
        titleEl.textContent = willActivate ? "Activate User Account" : "Deactivate User Account";
    }
    if (header) {
        header.style.background = willActivate ? "var(--teal-800)" : "#b45309";
    }
    if (iconWrap) {
        iconWrap.className = `confirm-dialog-icon ${willActivate ? "success" : "warning"}`;
        iconWrap.innerHTML = `<i class="fa-solid ${willActivate ? "fa-user-check" : "fa-user-slash"}"></i>`;
    }
    if (messageEl) {
        messageEl.textContent = willActivate
            ? `Do you want to activate user account '${target.username}'?`
            : `Do you want to deactivate user account '${target.username}'?`;
    }
    if (subtextEl) {
        subtextEl.textContent = willActivate
            ? "Activating this user will restore their ability to sign in and access their HMS workspace."
            : "Deactivating this user will suspend their HMS login access until reactivated.";
    }
    if (summaryCard) {
        summaryCard.innerHTML = `
            <div><strong>Full Name:</strong> ${escapeHtml(displayName)}</div>
            <div><strong>Username:</strong> ${escapeHtml(target.username)}</div>
            <div><strong>Role:</strong> ${escapeHtml(target.role)}</div>
            <div><strong>Current Status:</strong> <span class="badge ${currentlyActive ? "badge-success" : "badge-warning"}">${currentlyActive ? "ACTIVE" : "INACTIVE"}</span></div>
        `;
    }
    if (confirmBtn) {
        confirmBtn.textContent = willActivate ? "Yes, Activate User" : "Yes, Deactivate User";
        confirmBtn.className = `btn ${willActivate ? "btn-primary" : "btn-warning-solid"}`;
    }
    pendingUserStatusAction = () => {
        target.active = willActivate;
        // [BACKEND HOOK] PATCH /api/admin/users/:id/status { active: willActivate }
        renderUsersTable();
        const actionPastTense = willActivate ? "Activated" : "Deactivated";
        addNotification(`User '${target.username}' (${target.role}) was ${actionPastTense.toLowerCase()}.`);
        showToast(`${actionPastTense} user '${target.username}'.`);
    };
    openModal("userStatusModal");
}
export function openUserProfileModal(userId, isSelf) {
    const user = users.find((u) => u.id === userId);
    if (!user)
        return;
    const modalTitle = document.getElementById("userProfileModalTitle");
    if (modalTitle) {
        modalTitle.textContent = isSelf ? "My Profile Settings" : `Edit User Profile — ${user.username}`;
    }
    document.getElementById("profUserId").value = String(user.id);
    document.getElementById("profUsername").value = user.username || "";
    document.getElementById("profRole").value = user.role;
    document.getElementById("profFirstName").value = user.firstName || "";
    document.getElementById("profMiddleName").value = user.middleName || "";
    document.getElementById("profLastName").value = user.lastName || "";
    document.getElementById("profGender").value = user.gender || "";
    const dobInput = document.getElementById("profDob");
    if (dobInput) {
        dobInput.max = getTodayIsoDate();
        dobInput.value = user.dob || "";
    }
    document.getElementById("profEmail").value = user.email || "";
    document.getElementById("profPhone").value = user.phone || "";
    document.getElementById("profAddress").value = user.address || "";
    syncProfileRoleFields(user.role, user);
    openModal("userProfileModal");
}
document.getElementById("userProfileForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("profUserId").value);
    const target = users.find((u) => u.id === id);
    if (!target)
        return;
    const dobVal = document.getElementById("profDob").value;
    if (dobVal && dobVal > getTodayIsoDate()) {
        showToast("Date of birth cannot be after today's date.", "error");
        return;
    }
    const newRole = document.getElementById("profRole").value;
    target.username = document.getElementById("profUsername").value.trim();
    target.role = newRole;
    target.firstName = document.getElementById("profFirstName").value.trim();
    target.middleName = document.getElementById("profMiddleName").value.trim();
    target.lastName = document.getElementById("profLastName").value.trim();
    target.gender = document.getElementById("profGender").value;
    target.dob = dobVal;
    target.email = document.getElementById("profEmail").value.trim();
    target.phone = document.getElementById("profPhone").value.trim();
    target.address = document.getElementById("profAddress").value.trim();
    if (newRole === "PATIENT") {
        target.bloodGroup = document.getElementById("profBloodGroup").value;
    }
    else {
        delete target.bloodGroup;
    }
    if (CLINICAL_DEPT_ROLES.includes(newRole)) {
        target.department = document.getElementById("profDepartment").value || "";
    }
    else {
        delete target.department;
    }
    if (QUALIFICATION_ROLES.includes(newRole)) {
        target.qualification = document.getElementById("profQualification").value.trim();
    }
    else {
        delete target.qualification;
    }
    if (SPECIALIZATION_ROLES.includes(newRole)) {
        target.specialization = document.getElementById("profSpecialization").value.trim();
    }
    else {
        delete target.specialization;
    }
    if (STAFF_AVAILABILITY_EXP_ROLES.includes(newRole)) {
        const expRaw = document.getElementById("profExperience").value;
        target.yearsOfExperience = expRaw === "" ? null : Number(expRaw);
        target.workingTimeStart = document.getElementById("profWorkStart").value;
        target.workingTimeEnd = document.getElementById("profWorkEnd").value;
        target.isAvailable = document.getElementById("profIsAvailable").checked;
    }
    else {
        delete target.yearsOfExperience;
        delete target.workingTimeStart;
        delete target.workingTimeEnd;
        delete target.isAvailable;
    }
    // [BACKEND HOOK] PUT /api/admin/users/:id with updated profile fields
    closeModal("userProfileModal");
    refreshTopbarProfile();
    renderUsersTable();
    renderDepartmentsTable();
    renderDashboard();
    addNotification(`Profile updated for user '${target.username}'.`);
    showToast(`Profile saved for ${target.username}`);
});
document.getElementById("openCreateUserBtn")?.addEventListener("click", () => {
    const form = document.getElementById("createUserForm");
    if (form) {
        form.reset();
        resetPasswordVisibility(form);
    }
    openModal("createUserModal");
});
document.getElementById("createUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = document.getElementById("newUsername").value.trim();
    const role = document.getElementById("newUserRole").value;
    // Dummy password captured for backend registration endpoint
    const _dummyPassword = document.getElementById("newDummyPassword").value;
    void _dummyPassword;
    const newUser = {
        id: Date.now(),
        username,
        role,
        active: true,
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        address: ""
    };
    if (role === "PATIENT") {
        newUser.bloodGroup = "";
    }
    if (CLINICAL_DEPT_ROLES.includes(role)) {
        newUser.department = "";
    }
    if (QUALIFICATION_ROLES.includes(role)) {
        newUser.qualification = "";
    }
    if (SPECIALIZATION_ROLES.includes(role)) {
        newUser.specialization = "";
    }
    if (STAFF_AVAILABILITY_EXP_ROLES.includes(role)) {
        newUser.yearsOfExperience = null;
        newUser.workingTimeStart = "";
        newUser.workingTimeEnd = "";
        newUser.isAvailable = false;
    }
    // [BACKEND HOOK] POST /api/admin/users { username, password: _dummyPassword, role }
    users.push(newUser);
    form.reset();
    closeModal("createUserModal");
    renderUsersTable();
    renderDashboard();
    addNotification(`New user '${username}' created with role ${role}.`);
    showToast(`Created user '${username}' (${role})`);
});
export function deleteUser(id) {
    const target = users.find((u) => u.id === id);
    if (!target || id === loggedInUserId)
        return;
    const displayName = getUserDisplayName(target);
    openConfirmDialog({
        title: "Delete User Account",
        message: `Are you sure you want to delete user '${target.username}' (${displayName})?`,
        subtext: `This will permanently remove the ${target.role} account and revoke system access.`,
        confirmText: "Delete User",
        variant: "danger",
        iconClass: "fa-user-xmark",
        onConfirm: () => {
            // [BACKEND HOOK] DELETE /api/admin/users/:id
            users = users.filter((u) => u.id !== id);
            renderUsersTable();
            renderDepartmentsTable();
            renderDashboard();
            addNotification(`User '${target.username}' (${target.role}) was deleted.`);
            showToast(`Deleted user '${target.username}'`);
        }
    });
}
document.getElementById("userSearchInput")?.addEventListener("input", () => renderUsersTable());
document.getElementById("userRoleFilter")?.addEventListener("change", () => renderUsersTable());
document.getElementById("userDepartmentFilter")?.addEventListener("change", () => renderUsersTable());
document.getElementById("userAvailabilityFilter")?.addEventListener("change", () => renderUsersTable());
document.getElementById("userStatusFilter")?.addEventListener("change", () => renderUsersTable());
document.getElementById("resetUserFiltersBtn")?.addEventListener("click", () => {
    document.getElementById("userSearchInput").value = "";
    document.getElementById("userRoleFilter").value = "";
    document.getElementById("userDepartmentFilter").value = "";
    document.getElementById("userAvailabilityFilter").value = "";
    document.getElementById("userStatusFilter").value = "";
    renderUsersTable();
});
// =========================================================================
// SECTION 3: MANAGE DEPARTMENTS
// =========================================================================
export function isDefaultDepartment(dept) {
    return Boolean(dept && (dept.isDefault || (dept.name && dept.name.toLowerCase() === DEFAULT_DEPARTMENT_NAME.toLowerCase())));
}
export function populateDoctorSelect(selectedId = "") {
    const doctors = users.filter((u) => u.role === "DOCTOR");
    const select = document.getElementById("deptHeadDoctor");
    if (!select)
        return;
    select.innerHTML = doctors
        .map((d) => {
        const label = `${getUserDisplayName(d)} (${d.username})`;
        return `<option value="${d.id}" ${Number(selectedId) === d.id ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
        .join("");
}
export function getEnrichedDepartments() {
    return departments.map((dept) => {
        const doc = users.find((u) => u.id === dept.headDoctorId);
        const headDoctorLabel = doc ? `${getUserDisplayName(doc)} (${doc.username})` : "Unassigned";
        return { ...dept, headDoctorLabel };
    });
}
export function renderDepartmentsTable(list = getEnrichedDepartments()) {
    const tbody = document.getElementById("departmentsTableBody");
    if (!tbody)
        return;
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">No departments configured.</td></tr>`;
        return;
    }
    tbody.innerHTML = list
        .map((d) => {
        const defaultDept = isDefaultDepartment(d);
        return `
              <tr class="clickable-row" data-dept-id="${d.id}" title="Click to edit department">
                <td>
                  <strong>${escapeHtml(d.name)}</strong>
                  ${defaultDept ? `<span class="badge badge-teal" style="margin-left:6px;">Default</span>` : ""}
                </td>
                <td>${escapeHtml(d.headDoctorLabel)}</td>
                <td>${escapeHtml(d.description || "—")}</td>
                <td onclick="event.stopPropagation();">
                  ${defaultDept
            ? `<span class="badge badge-gray">Protected</span>`
            : `<button type="button" class="btn btn-sm btn-danger" onclick="deleteDepartment(${d.id})">
                             <i class="fa-solid fa-trash"></i> Delete
                           </button>`}
                </td>
              </tr>`;
    })
        .join("");
    tbody.querySelectorAll("tr.clickable-row").forEach((tr) => {
        tr.addEventListener("click", () => openDepartmentModal(Number(tr.dataset.deptId)));
    });
}
export function openDepartmentModal(deptId = null) {
    document.getElementById("departmentForm")?.reset();
    const deptNameInput = document.getElementById("deptName");
    const modalTitle = document.getElementById("departmentModalTitle");
    const deptIdInput = document.getElementById("deptId");
    const descInput = document.getElementById("deptDescription");
    if (deptId) {
        const dept = departments.find((d) => d.id === deptId);
        if (!dept)
            return;
        if (modalTitle)
            modalTitle.textContent = "Edit Department";
        if (deptIdInput)
            deptIdInput.value = String(dept.id);
        if (deptNameInput) {
            deptNameInput.value = dept.name;
            deptNameInput.readOnly = isDefaultDepartment(dept);
        }
        populateDoctorSelect(dept.headDoctorId);
        if (descInput)
            descInput.value = dept.description || "";
    }
    else {
        if (modalTitle)
            modalTitle.textContent = "Add Department";
        if (deptIdInput)
            deptIdInput.value = "";
        if (deptNameInput)
            deptNameInput.readOnly = false;
        populateDoctorSelect();
    }
    openModal("departmentModal");
}
document.getElementById("openAddDeptBtn")?.addEventListener("click", () => openDepartmentModal(null));
document.getElementById("departmentForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("deptId").value);
    const name = document.getElementById("deptName").value.trim();
    const headDoctorId = Number(document.getElementById("deptHeadDoctor").value);
    const description = document.getElementById("deptDescription").value.trim();
    if (id) {
        const dept = departments.find((d) => d.id === id);
        if (dept) {
            const oldName = dept.name;
            const finalName = isDefaultDepartment(dept) ? DEFAULT_DEPARTMENT_NAME : name;
            // [BACKEND HOOK] PUT /api/admin/departments/:id
            dept.name = finalName;
            dept.headDoctorId = headDoctorId;
            dept.description = description;
            if (oldName !== finalName) {
                users.forEach((u) => {
                    if (CLINICAL_DEPT_ROLES.includes(u.role) && u.department === oldName) {
                        u.department = finalName;
                    }
                });
            }
            showToast(`Updated department '${finalName}'`);
        }
    }
    else {
        const exists = departments.some((d) => d.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            showToast(`Department '${name}' already exists.`, "error");
            return;
        }
        // [BACKEND HOOK] POST /api/admin/departments
        departments.push({ id: Date.now(), name, headDoctorId, description });
        showToast(`Added department '${name}'`);
    }
    closeModal("departmentModal");
    populateUserDepartmentDropdowns();
    renderDepartmentsTable();
    renderUsersTable();
});
export function deleteDepartment(id) {
    const dept = departments.find((d) => d.id === id);
    if (!dept)
        return;
    if (isDefaultDepartment(dept)) {
        showToast(`'${DEFAULT_DEPARTMENT_NAME}' is a default department and cannot be deleted.`, "error");
        return;
    }
    const affectedStaffCount = users.filter((u) => CLINICAL_DEPT_ROLES.includes(u.role) && u.department === dept.name).length;
    const reassignmentNote = affectedStaffCount > 0
        ? ` ${affectedStaffCount} Doctor(s)/Nurse(s) in this department will be reassigned to '${DEFAULT_DEPARTMENT_NAME}'.`
        : ` Any Doctors or Nurses assigned here will be moved to '${DEFAULT_DEPARTMENT_NAME}'.`;
    openConfirmDialog({
        title: "Delete Department",
        message: `Are you sure you want to delete the '${dept.name}' department?`,
        subtext: `This will remove the department record from hospital configuration.${reassignmentNote}`,
        confirmText: "Delete Department",
        variant: "danger",
        iconClass: "fa-building-circle-xmark",
        onConfirm: () => {
            // [BACKEND HOOK] DELETE /api/admin/departments/:id
            users.forEach((u) => {
                if (CLINICAL_DEPT_ROLES.includes(u.role) && u.department === dept.name) {
                    u.department = DEFAULT_DEPARTMENT_NAME;
                }
            });
            departments = departments.filter((d) => d.id !== id);
            populateUserDepartmentDropdowns();
            renderDepartmentsTable();
            renderUsersTable();
            addNotification(`Department '${dept.name}' was deleted${affectedStaffCount > 0 ? ` and ${affectedStaffCount} staff member(s) were reassigned to '${DEFAULT_DEPARTMENT_NAME}'` : ""}.`);
            showToast(`Removed department '${dept.name}'.`);
        }
    });
}
// =========================================================================
// SECTION 4: PHARMACY
// =========================================================================
export function computeMedStatus(med) {
    if (Number(med.quantity) <= 0)
        return "Out of Stock";
    if (Number(med.quantity) <= Number(med.reorderLevel))
        return "Low Stock";
    return "In Stock";
}
export function getEnrichedMedications() {
    return medications.map((m) => ({
        ...m,
        displayName: `${m.name} (${m.genericName})`,
        status: computeMedStatus(m)
    }));
}
export function renderPharmacyTable(list = getEnrichedMedications()) {
    const tbody = document.getElementById("pharmacyTableBody");
    if (!tbody)
        return;
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);">No medications in inventory.</td></tr>`;
        return;
    }
    tbody.innerHTML = list
        .map((m) => {
        const badgeClass = m.status === "In Stock" ? "badge-success" : m.status === "Low Stock" ? "badge-warning" : "badge-danger";
        return `
            <tr class="clickable-row" data-med-id="${m.id}" title="Click to edit medication">
              <td>
                <strong>${escapeHtml(m.name)}</strong><br/>
                <span style="color:var(--text-muted);font-size:0.82rem;">Generic: ${escapeHtml(m.genericName)}</span>
                ${m.prescriptionOnly ? `<br/><span class="badge badge-info" style="margin-top:3px;">Rx Required</span>` : ""}
              </td>
              <td>${escapeHtml(m.category)}</td>
              <td>${escapeHtml(m.batchNumber)}</td>
              <td>₹${Number(m.price).toFixed(2)}</td>
              <td>${Number(m.quantity)}</td>
              <td><span class="badge ${badgeClass}">${escapeHtml(m.status)}</span></td>
              <td>${escapeHtml(m.expiryDate)}</td>
              <td onclick="event.stopPropagation();">
                <button type="button" class="btn btn-sm btn-danger" onclick="deleteMedication(${m.id})">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>`;
    })
        .join("");
    tbody.querySelectorAll("tr.clickable-row").forEach((tr) => {
        tr.addEventListener("click", () => openMedicationModal(Number(tr.dataset.medId)));
    });
}
export function openMedicationModal(medId = null) {
    document.getElementById("medicationForm")?.reset();
    const modalTitle = document.getElementById("medicationModalTitle");
    const medIdInput = document.getElementById("medId");
    if (medId) {
        const med = medications.find((m) => m.id === medId);
        if (!med)
            return;
        if (modalTitle)
            modalTitle.textContent = "Edit Medication";
        if (medIdInput)
            medIdInput.value = String(med.id);
        document.getElementById("medName").value = med.name;
        document.getElementById("medGenericName").value = med.genericName;
        document.getElementById("medCategory").value = med.category;
        document.getElementById("medManufacturer").value = med.manufacturer;
        document.getElementById("medBatchNumber").value = med.batchNumber;
        document.getElementById("medPrice").value = String(med.price);
        document.getElementById("medQuantity").value = String(med.quantity);
        document.getElementById("medReorderLevel").value = String(med.reorderLevel);
        document.getElementById("medExpiryDate").value = med.expiryDate;
        document.getElementById("medDescription").value =
            med.description || "";
        document.getElementById("medSideEffects").value =
            med.sideEffects || "";
        document.getElementById("medPrescriptionOnly").checked = Boolean(med.prescriptionOnly);
    }
    else {
        if (modalTitle)
            modalTitle.textContent = "Add Medication";
        if (medIdInput)
            medIdInput.value = "";
    }
    openModal("medicationModal");
}
document.getElementById("openAddMedBtn")?.addEventListener("click", () => openMedicationModal(null));
document.getElementById("medicationForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("medId").value);
    const payload = {
        name: document.getElementById("medName").value.trim(),
        genericName: document.getElementById("medGenericName").value.trim(),
        category: document.getElementById("medCategory").value.trim(),
        manufacturer: document.getElementById("medManufacturer").value.trim(),
        batchNumber: document.getElementById("medBatchNumber").value.trim(),
        price: Number(document.getElementById("medPrice").value),
        quantity: Number(document.getElementById("medQuantity").value),
        reorderLevel: Number(document.getElementById("medReorderLevel").value),
        expiryDate: document.getElementById("medExpiryDate").value,
        description: document.getElementById("medDescription").value.trim(),
        sideEffects: document.getElementById("medSideEffects").value.trim(),
        prescriptionOnly: document.getElementById("medPrescriptionOnly").checked
    };
    if (id) {
        const idx = medications.findIndex((m) => m.id === id);
        if (idx !== -1) {
            // [BACKEND HOOK] PUT /api/pharmacy/medications/:id
            medications[idx] = { id, ...payload };
            showToast(`Updated '${payload.name}'`);
        }
    }
    else {
        // [BACKEND HOOK] POST /api/pharmacy/medications
        medications.push({ id: Date.now(), ...payload });
        showToast(`Added '${payload.name}' to pharmacy`);
    }
    closeModal("medicationModal");
    renderPharmacyTable();
});
export function deleteMedication(id) {
    const med = medications.find((m) => m.id === id);
    if (!med)
        return;
    openConfirmDialog({
        title: "Delete Medication",
        message: `Are you sure you want to delete '${med.name}' (${med.genericName})?`,
        subtext: `Batch #${med.batchNumber} (${med.quantity} units) will be permanently removed from pharmacy inventory.`,
        confirmText: "Delete Medication",
        variant: "danger",
        iconClass: "fa-pills",
        onConfirm: () => {
            // [BACKEND HOOK] DELETE /api/pharmacy/medications/:id
            medications = medications.filter((m) => m.id !== id);
            renderPharmacyTable();
            addNotification(`Medication '${med.name}' (Batch #${med.batchNumber}) was deleted.`);
            showToast(`Deleted '${med.name}'.`);
        }
    });
}
// =========================================================================
// SECTION 5: BED MANAGEMENT (ADD/REMOVE WARDS & BEDS, ASSIGN & RELEASE)
// =========================================================================
export let bedModalMode = "ward";
export function syncWardsList() {
    beds.forEach((b) => {
        if (!wardsList.includes(b.ward)) {
            wardsList.push(b.ward);
        }
    });
}
export function renderBeds() {
    syncWardsList();
    const total = beds.length;
    const occupied = beds.filter((b) => b.occupied).length;
    const available = total - occupied;
    const statsGrid = document.getElementById("bedStatsGrid");
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="stat-card">
              <div><div class="stat-label">Total Beds</div><div class="stat-value">${total}</div></div>
              <div class="stat-icon"><i class="fa-solid fa-bed"></i></div>
            </div>
            <div class="stat-card">
              <div><div class="stat-label">Available Beds</div><div class="stat-value">${available}</div></div>
              <div class="stat-icon"><i class="fa-solid fa-door-open"></i></div>
            </div>
            <div class="stat-card">
              <div><div class="stat-label">Occupied Beds</div><div class="stat-value">${occupied}</div></div>
              <div class="stat-icon"><i class="fa-solid fa-user-injured"></i></div>
            </div>`;
    }
    const wardsContainer = document.getElementById("wardsContainer");
    if (!wardsContainer)
        return;
    if (!wardsList.length) {
        wardsContainer.innerHTML = `
          <div class="card ward-empty-state">
            <span>No hospital wards configured yet.</span>
            <button type="button" class="btn btn-primary btn-sm" onclick="openAddWardModal()">
              <i class="fa-solid fa-plus"></i> Add Ward
            </button>
          </div>`;
        return;
    }
    wardsContainer.innerHTML = wardsList
        .map((ward) => {
        const wardBeds = beds.filter((b) => b.ward === ward);
        const encodedWard = encodeURIComponent(ward);
        const bedsGridHtml = wardBeds.length
            ? `<div class="beds-grid">
                    ${wardBeds
                .map((b) => `
                        <div class="bed-card ${b.occupied ? "occupied" : "available"}" onclick="onBedClick(${b.id})">
                          <div>
                            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
                              <strong>${escapeHtml(b.bedNumber)}</strong>
                              <span class="badge ${b.occupied ? "badge-danger" : "badge-success"}">
                                ${b.occupied ? "Occupied" : "Available"}
                              </span>
                            </div>
                            <div style="margin-top:6px;font-size:0.9rem;font-weight:600;">₹${b.pricePerDay} / day</div>
                            <div style="margin-top:4px;font-size:0.82rem;color:var(--text-muted);">
                              ${b.occupied ? `Patient: ${escapeHtml(b.patientName)}` : "Click to assign patient"}
                            </div>
                          </div>
                          <div class="bed-card-footer" onclick="event.stopPropagation();">
                            <button type="button" class="btn btn-sm btn-danger" onclick="promptDeleteBed(${b.id})" title="Remove bed ${escapeHtml(b.bedNumber)}">
                              <i class="fa-solid fa-trash"></i> Remove Bed
                            </button>
                          </div>
                        </div>`)
                .join("")}
                  </div>`
            : `<div class="ward-empty-state">
                    <span>No beds added to ${escapeHtml(ward)} Ward yet.</span>
                  </div>`;
        return `
            <div class="card ward-section">
              <div class="ward-heading">
                <h2 class="card-title">${escapeHtml(ward)} Ward</h2>
                <div class="ward-heading-actions">
                  <span class="badge badge-teal">${wardBeds.length} ${wardBeds.length === 1 ? "Bed" : "Beds"}</span>
                  <button type="button" class="btn btn-sm btn-outline" onclick="openAddBedToWardModal(decodeURIComponent('${encodedWard}'))">
                    <i class="fa-solid fa-plus"></i> Add Bed
                  </button>
                  <button type="button" class="btn btn-sm btn-danger" onclick="promptDeleteWard(decodeURIComponent('${encodedWard}'))">
                    <i class="fa-solid fa-trash"></i> Remove Ward
                  </button>
                </div>
              </div>
              ${bedsGridHtml}
            </div>`;
    })
        .join("");
}
export function getWardPrefix(wardName) {
    const cleaned = String(wardName || "")
        .trim()
        .replace(/[^A-Za-z0-9]/g, "");
    if (!cleaned)
        return "BED";
    return cleaned.slice(0, 3).toUpperCase();
}
export function updateBedPrefixBadge(wardName) {
    const badge = document.getElementById("newBedPrefixBadge");
    if (badge) {
        badge.textContent = `${getWardPrefix(wardName)}-`;
    }
}
export function getSuggestedBedDefaults(wardName) {
    const wardBeds = beds.filter((b) => b.ward.toLowerCase() === wardName.toLowerCase());
    if (!wardBeds.length) {
        return { nextInteger: 101, defaultPrice: 150 };
    }
    const defaultPrice = wardBeds[wardBeds.length - 1].pricePerDay || 150;
    let maxNum = 100;
    wardBeds.forEach((b) => {
        const match = b.bedNumber.match(/(\d+)$/);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxNum)
                maxNum = num;
        }
    });
    return {
        nextInteger: maxNum + 1,
        defaultPrice
    };
}
export function openAddWardModal() {
    syncWardsList();
    bedModalMode = "ward";
    document.getElementById("addBedForm")?.reset();
    const modalTitle = document.getElementById("addBedModalTitle");
    if (modalTitle)
        modalTitle.textContent = "Add Ward";
    const wardSelectGroup = document.getElementById("wardSelectGroup");
    const wardSelect = document.getElementById("newBedWardSelect");
    if (wardSelectGroup)
        wardSelectGroup.style.display = "none";
    if (wardSelect)
        wardSelect.required = false;
    const customWardGroup = document.getElementById("customWardGroup");
    const customInput = document.getElementById("newBedCustomWard");
    if (customWardGroup)
        customWardGroup.style.display = "flex";
    if (customInput) {
        customInput.required = true;
        customInput.value = "";
    }
    const bedDetailsGroup = document.getElementById("bedDetailsRowGroup");
    const bedNumInput = document.getElementById("newBedNumber");
    const priceInput = document.getElementById("newBedPrice");
    if (bedDetailsGroup)
        bedDetailsGroup.style.display = "none";
    if (bedNumInput)
        bedNumInput.required = false;
    if (priceInput)
        priceInput.required = false;
    const submitBtn = document.getElementById("addBedSubmitBtn");
    if (submitBtn)
        submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Save Ward`;
    openModal("addBedModal");
}
export function openAddBedToWardModal(targetWard) {
    syncWardsList();
    bedModalMode = "bed";
    document.getElementById("addBedForm")?.reset();
    const modalTitle = document.getElementById("addBedModalTitle");
    if (modalTitle)
        modalTitle.textContent = `Add Bed — ${targetWard} Ward`;
    const wardSelectGroup = document.getElementById("wardSelectGroup");
    const wardSelect = document.getElementById("newBedWardSelect");
    if (wardSelectGroup)
        wardSelectGroup.style.display = "none";
    if (wardSelect)
        wardSelect.required = false;
    const customWardGroup = document.getElementById("customWardGroup");
    const customInput = document.getElementById("newBedCustomWard");
    if (customWardGroup)
        customWardGroup.style.display = "none";
    if (customInput) {
        customInput.required = false;
        customInput.value = targetWard;
    }
    const bedDetailsGroup = document.getElementById("bedDetailsRowGroup");
    const bedNumInput = document.getElementById("newBedNumber");
    const priceInput = document.getElementById("newBedPrice");
    if (bedDetailsGroup)
        bedDetailsGroup.style.display = "flex";
    if (bedNumInput)
        bedNumInput.required = true;
    if (priceInput)
        priceInput.required = true;
    const { nextInteger, defaultPrice } = getSuggestedBedDefaults(targetWard);
    if (bedNumInput)
        bedNumInput.value = String(nextInteger);
    if (priceInput)
        priceInput.value = String(defaultPrice);
    updateBedPrefixBadge(targetWard);
    const submitBtn = document.getElementById("addBedSubmitBtn");
    if (submitBtn)
        submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Bed`;
    openModal("addBedModal");
}
document.getElementById("openAddWardBtn")?.addEventListener("click", () => openAddWardModal());
document.getElementById("addBedForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (bedModalMode === "ward") {
        const wardName = document.getElementById("newBedCustomWard").value.trim();
        if (!wardName) {
            showToast("Please enter a ward name.", "error");
            return;
        }
        const duplicateWard = wardsList.some((w) => w.toLowerCase() === wardName.toLowerCase());
        if (duplicateWard) {
            showToast(`Ward '${wardName}' already exists.`, "error");
            return;
        }
        // [BACKEND HOOK] POST /api/wards { name: wardName }
        wardsList.push(wardName);
        closeModal("addBedModal");
        renderBeds();
        addNotification(`Added new ward '${wardName}'.`);
        showToast(`Added ${wardName} Ward`);
        return;
    }
    const ward = document.getElementById("newBedCustomWard").value.trim();
    const rawBedInt = parseInt(document.getElementById("newBedNumber").value, 10);
    const pricePerDay = Number(document.getElementById("newBedPrice").value);
    if (!ward || !Number.isInteger(rawBedInt) || rawBedInt < 1 || !(pricePerDay > 0)) {
        showToast("Please specify a valid bed number and daily price.", "error");
        return;
    }
    const prefix = getWardPrefix(ward);
    const bedNumber = `${prefix}-${rawBedInt}`;
    const duplicate = beds.some((b) => b.bedNumber.toLowerCase() === bedNumber.toLowerCase());
    if (duplicate) {
        showToast(`Bed '${bedNumber}' already exists. Please use a unique bed number.`, "error");
        return;
    }
    // [BACKEND HOOK] POST /api/beds { ward, bedNumber, pricePerDay }
    beds.push({
        id: Date.now(),
        ward,
        bedNumber,
        pricePerDay,
        occupied: false,
        patientName: ""
    });
    closeModal("addBedModal");
    renderBeds();
    renderDashboard();
    addNotification(`Added new bed '${bedNumber}' to ${ward} Ward (₹${pricePerDay}/day).`);
    showToast(`Added bed ${bedNumber} to ${ward} Ward`);
});
export function promptDeleteBed(bedId, closeActionModalFirst = false) {
    const bed = beds.find((b) => b.id === bedId);
    if (!bed)
        return;
    const occupiedWarning = bed.occupied
        ? ` Warning: This bed is currently occupied by ${bed.patientName}. Removing it will also clear their bed assignment.`
        : " This bed will be permanently removed from the ward.";
    openConfirmDialog({
        title: "Remove Hospital Bed",
        message: `Are you sure you want to remove bed '${bed.bedNumber}' from ${bed.ward} Ward?`,
        subtext: occupiedWarning,
        confirmText: "Remove Bed",
        variant: "danger",
        iconClass: "fa-bed",
        onConfirm: () => {
            if (closeActionModalFirst) {
                closeModal("bedActionModal");
            }
            // [BACKEND HOOK] DELETE /api/beds/:id
            beds = beds.filter((b) => b.id !== bedId);
            renderBeds();
            renderDashboard();
            addNotification(`Bed '${bed.bedNumber}' was removed from ${bed.ward} Ward.`);
            showToast(`Removed bed ${bed.bedNumber} from ${bed.ward} Ward`);
        }
    });
}
export function promptDeleteWard(wardName) {
    if (!wardsList.includes(wardName))
        return;
    const wardBeds = beds.filter((b) => b.ward === wardName);
    const occupiedCount = wardBeds.filter((b) => b.occupied).length;
    const subtext = occupiedCount > 0
        ? `Warning: This ward has ${wardBeds.length} bed(s), including ${occupiedCount} currently occupied bed(s). All beds and patient assignments in this ward will be removed.`
        : wardBeds.length > 0
            ? `All ${wardBeds.length} bed(s) in ${wardName} Ward will be permanently removed.`
            : `'${wardName} Ward' will be permanently removed.`;
    openConfirmDialog({
        title: "Remove Ward",
        message: `Are you sure you want to remove '${wardName} Ward'?`,
        subtext,
        confirmText: "Remove Ward",
        variant: "danger",
        iconClass: "fa-hospital",
        onConfirm: () => {
            // [BACKEND HOOK] DELETE /api/wards/:wardName
            beds = beds.filter((b) => b.ward !== wardName);
            wardsList = wardsList.filter((w) => w !== wardName);
            renderBeds();
            renderDashboard();
            addNotification(`Removed '${wardName} Ward'.`);
            showToast(`Removed ${wardName} Ward`);
        }
    });
}
export function onBedClick(bedId) {
    const bed = beds.find((b) => b.id === bedId);
    if (!bed)
        return;
    const patientList = users.filter((u) => u.role === "PATIENT");
    const titleEl = document.getElementById("bedActionTitle");
    const bodyEl = document.getElementById("bedActionBody");
    const footerEl = document.getElementById("bedActionFooter");
    if (titleEl)
        titleEl.textContent = `${bed.bedNumber} (${bed.ward} Ward)`;
    if (!bed.occupied) {
        const optionsHtml = patientList
            .map((p) => {
            const name = getUserDisplayName(p);
            return `<option value="${escapeHtml(name)}">${escapeHtml(name)} (${escapeHtml(p.username)})</option>`;
        })
            .join("");
        if (bodyEl) {
            bodyEl.innerHTML = `
              <p style="margin-bottom:10px;">Bed <strong>${escapeHtml(bed.bedNumber)}</strong> is currently available at <strong>₹${bed.pricePerDay}/day</strong>.</p>
              <div class="form-group">
                <label class="form-label req" for="assignPatientSelect">Select Patient</label>
                <select id="assignPatientSelect" class="select">
                  ${optionsHtml}
                  <option value="Walk-in Patient">Walk-in Patient</option>
                </select>
              </div>`;
        }
        if (footerEl) {
            footerEl.innerHTML = `
              <button type="button" class="btn btn-outline" data-close-modal="bedActionModal">Cancel</button>
              <button type="button" class="btn btn-primary" onclick="confirmAssignBed(${bed.id})">Assign Bed</button>`;
        }
    }
    else {
        if (bodyEl) {
            bodyEl.innerHTML = `
              <p>Bed <strong>${escapeHtml(bed.bedNumber)}</strong> is currently occupied by <strong>${escapeHtml(bed.patientName)}</strong>.</p>
              <p style="margin-top:6px;color:var(--text-muted);">Release this bed upon patient discharge?</p>`;
        }
        if (footerEl) {
            footerEl.innerHTML = `
              <button type="button" class="btn btn-outline" data-close-modal="bedActionModal">Cancel</button>
              <button type="button" class="btn btn-danger-solid" onclick="confirmReleaseBed(${bed.id})">Release Bed on Discharge</button>`;
        }
    }
    openModal("bedActionModal");
}
export function confirmAssignBed(bedId) {
    const bed = beds.find((b) => b.id === bedId);
    const patientName = document.getElementById("assignPatientSelect")?.value;
    if (!bed || !patientName)
        return;
    // [BACKEND HOOK] POST /api/beds/:id/assign { patientName }
    bed.occupied = true;
    bed.patientName = patientName;
    closeModal("bedActionModal");
    renderBeds();
    renderDashboard();
    showToast(`Assigned ${bed.bedNumber} to ${patientName}`);
}
export function confirmReleaseBed(bedId) {
    const bed = beds.find((b) => b.id === bedId);
    if (!bed)
        return;
    // [BACKEND HOOK] POST /api/beds/:id/release
    const prevPatient = bed.patientName;
    bed.occupied = false;
    bed.patientName = "";
    closeModal("bedActionModal");
    renderBeds();
    renderDashboard();
    showToast(`Released ${bed.bedNumber} (${prevPatient} discharged)`);
}
// =========================================================================
// SECTION 6: BLOOD BANK
// =========================================================================
export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export function isBloodGroup(val) {
    return BLOOD_TYPES.includes(val);
}
export function renderBloodBank() {
    const grid = document.getElementById("bloodCardsGrid");
    if (grid) {
        grid.innerHTML = BLOOD_TYPES.map((type) => {
            const units = bloodStock[type] ?? 0;
            const statusBadge = units <= 3
                ? `<span class="badge badge-danger">Critical</span>`
                : units <= 6
                    ? `<span class="badge badge-warning">Low</span>`
                    : `<span class="badge badge-success">Adequate</span>`;
            return `
              <div class="blood-card" onclick="openBloodAdjustModal('${type}')">
                <div class="blood-type-tag">${type}</div>
                <div class="blood-units">${units} Units</div>
                ${statusBadge}
                <div style="margin-top:6px;font-size:0.78rem;color:var(--text-muted);">Click to Add / Issue</div>
              </div>`;
        }).join("");
    }
    renderDonationsTable(donations);
}
export function renderDonationsTable(list) {
    const tbody = document.getElementById("donationsTableBody");
    if (!tbody)
        return;
    tbody.innerHTML = list
        .map((d) => `
          <tr>
            <td><strong>${escapeHtml(d.donorName)}</strong></td>
            <td><span class="badge badge-teal">${escapeHtml(d.bloodGroup)}</span></td>
            <td>${Number(d.units)}</td>
            <td>${escapeHtml(d.phone)}</td>
            <td>${escapeHtml(d.email)}</td>
            <td>${escapeHtml(d.notes || "—")}</td>
          </tr>`)
        .join("");
}
export function openBloodAdjustModal(type) {
    document.getElementById("adjustBloodGroup").value = type;
    const titleEl = document.getElementById("bloodAdjustTitle");
    const currentUnitsEl = document.getElementById("bloodCurrentUnitsText");
    if (titleEl)
        titleEl.textContent = `Blood Group ${type}`;
    if (currentUnitsEl)
        currentUnitsEl.textContent = `Current Available Stock: ${bloodStock[type] ?? 0} Units`;
    document.getElementById("bloodUnitsDelta").value = "1";
    openModal("bloodAdjustModal");
}
document.getElementById("bloodAdjustForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const rawType = document.getElementById("adjustBloodGroup").value;
    if (!isBloodGroup(rawType))
        return;
    const mode = document.getElementById("bloodActionMode").value;
    const delta = Number(document.getElementById("bloodUnitsDelta").value);
    const current = bloodStock[rawType] ?? 0;
    if (mode === "issue" && delta > current) {
        showToast(`Cannot issue ${delta} units; only ${current} units of ${rawType} available.`, "error");
        return;
    }
    // [BACKEND HOOK] POST /api/blood-bank/adjust { bloodGroup: type, mode, units: delta }
    bloodStock[rawType] = mode === "add" ? current + delta : current - delta;
    closeModal("bloodAdjustModal");
    renderBloodBank();
    showToast(`${mode === "add" ? "Added" : "Issued"} ${delta} unit(s) of ${rawType}`);
});
document.getElementById("openRecordDonationBtn")?.addEventListener("click", () => {
    document.getElementById("donationForm")?.reset();
    openModal("donationModal");
});
document.getElementById("donationForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const bloodGroup = document.getElementById("donorBloodGroup").value;
    const entry = {
        id: Date.now(),
        donorName: document.getElementById("donorName").value.trim(),
        bloodGroup,
        units: Number(document.getElementById("donorUnits").value),
        phone: document.getElementById("donorPhone").value.trim(),
        email: document.getElementById("donorEmail").value.trim(),
        notes: document.getElementById("donorNotes").value.trim()
    };
    // [BACKEND HOOK] POST /api/blood-bank/donations
    donations.unshift(entry);
    if (isBloodGroup(bloodGroup)) {
        bloodStock[bloodGroup] = (bloodStock[bloodGroup] ?? 0) + entry.units;
    }
    closeModal("donationModal");
    renderBloodBank();
    showToast(`Recorded ${entry.units} unit(s) from ${entry.donorName}`);
});
// =========================================================================
// SECTION 7: BILLING & CSV EXPORT
// =========================================================================
export function renderBillingStats() {
    const totalBilled = invoices.reduce((sum, i) => sum + Number(i.totalAmount), 0);
    const totalCollected = invoices.reduce((sum, i) => sum + Number(i.amountPaid), 0);
    const totalDue = invoices.reduce((sum, i) => sum + Number(i.amountDue), 0);
    const statsGrid = document.getElementById("billingStatsGrid");
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="stat-card">
              <div><div class="stat-label">Total Billed</div><div class="stat-value">₹${totalBilled.toLocaleString("en-IN")}</div></div>
              <div class="stat-icon"><i class="fa-solid fa-file-invoice"></i></div>
            </div>
            <div class="stat-card">
              <div><div class="stat-label">Amount Collected</div><div class="stat-value">₹${totalCollected.toLocaleString("en-IN")}</div></div>
              <div class="stat-icon"><i class="fa-solid fa-check-circle"></i></div>
            </div>
            <div class="stat-card">
              <div><div class="stat-label">Amount Due</div><div class="stat-value">₹${totalDue.toLocaleString("en-IN")}</div></div>
              <div class="stat-icon"><i class="fa-solid fa-clock"></i></div>
            </div>`;
    }
}
export function renderBillingTable(list = invoices) {
    renderBillingStats();
    const tbody = document.getElementById("billingTableBody");
    if (!tbody)
        return;
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);">No invoices recorded.</td></tr>`;
        return;
    }
    tbody.innerHTML = list
        .map((inv) => {
        const badge = inv.status === "Paid"
            ? "badge-success"
            : inv.status === "Partially Paid"
                ? "badge-warning"
                : "badge-danger";
        return `
            <tr>
              <td><strong>${escapeHtml(inv.invoiceNo)}</strong></td>
              <td>${escapeHtml(inv.patientName)}</td>
              <td>${escapeHtml(inv.date)}</td>
              <td>₹${Number(inv.totalAmount).toFixed(2)}</td>
              <td>₹${Number(inv.amountPaid).toFixed(2)}</td>
              <td>₹${Number(inv.amountDue).toFixed(2)}</td>
              <td><span class="badge ${badge}">${escapeHtml(inv.status)}</span></td>
              <td>
                <button type="button" class="btn btn-sm btn-outline" onclick="viewInvoice(${inv.id})">
                  <i class="fa-solid fa-eye"></i> View
                </button>
                <button type="button" class="btn btn-sm btn-danger" onclick="deleteInvoice(${inv.id})">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>`;
    })
        .join("");
}
export function viewInvoice(id) {
    const inv = invoices.find((i) => i.id === id);
    if (!inv)
        return;
    const titleEl = document.getElementById("invoiceModalTitle");
    const bodyEl = document.getElementById("invoiceModalBody");
    if (titleEl)
        titleEl.textContent = `Invoice ${inv.invoiceNo}`;
    if (bodyEl) {
        bodyEl.innerHTML = `
            <p><strong>Patient:</strong> ${escapeHtml(inv.patientName)}</p>
            <p><strong>Date:</strong> ${escapeHtml(inv.date)}</p>
            <p><strong>Status:</strong> ${escapeHtml(inv.status)}</p>
            <p><strong>Summary:</strong> ${escapeHtml(inv.itemsSummary || "Hospital Services")}</p>
            <hr style="margin:10px 0;border:none;border-top:1px solid var(--border-color);"/>
            <p><strong>Total Amount:</strong> ₹${Number(inv.totalAmount).toFixed(2)}</p>
            <p><strong>Amount Paid:</strong> ₹${Number(inv.amountPaid).toFixed(2)}</p>
            <p><strong>Amount Due:</strong> ₹${Number(inv.amountDue).toFixed(2)}</p>`;
    }
    openModal("invoiceModal");
}
export function deleteInvoice(id) {
    const inv = invoices.find((i) => i.id === id);
    if (!inv)
        return;
    openConfirmDialog({
        title: "Delete Invoice",
        message: `Are you sure you want to delete invoice '${inv.invoiceNo}' for ${inv.patientName}?`,
        subtext: `Total amount: ₹${Number(inv.totalAmount).toFixed(2)}. This billing record will be permanently deleted.`,
        confirmText: "Delete Invoice",
        variant: "danger",
        iconClass: "fa-file-invoice-dollar",
        onConfirm: () => {
            // [BACKEND HOOK] DELETE /api/billing/invoices/:id
            invoices = invoices.filter((i) => i.id !== id);
            renderBillingTable();
            addNotification(`Invoice '${inv.invoiceNo}' (${inv.patientName}) was deleted.`);
            showToast(`Deleted invoice ${inv.invoiceNo}.`);
        }
    });
}
document.getElementById("exportBillingCsvBtn")?.addEventListener("click", () => {
    const headers = ["Invoice #", "Patient Name", "Date", "Total Amount", "Amount Paid", "Amount Due", "Status"];
    const csvRows = [
        headers.join(","),
        ...invoices.map((inv) => [
            inv.invoiceNo,
            `"${inv.patientName}"`,
            inv.date,
            inv.totalAmount,
            inv.amountPaid,
            inv.amountDue,
            `"${inv.status}"`
        ].join(","))
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hms-invoices.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Exported invoices to hms-invoices.csv");
});
// =========================================================================
// SECTION 8: ANALYTICS (KPI CARDS + CANVAS CHARTS)
// =========================================================================
export function renderAnalyticsStats() {
    const statsGrid = document.getElementById("analyticsStatsGrid");
    if (!statsGrid)
        return;
    statsGrid.innerHTML = `
        <div class="stat-card">
          <div><div class="stat-label">Total Revenue (All Time)</div><div class="stat-value">₹${analyticsData.totalRevenueAllTime.toLocaleString("en-IN")}</div></div>
          <div class="stat-icon"><i class="fa-solid fa-indian-rupee-sign"></i></div>
        </div>
        <div class="stat-card">
          <div><div class="stat-label">New Patients (Month)</div><div class="stat-value">${analyticsData.newPatientsThisMonth}</div></div>
          <div class="stat-icon"><i class="fa-solid fa-user-plus"></i></div>
        </div>
        <div class="stat-card">
          <div><div class="stat-label">Total Appointments</div><div class="stat-value">${analyticsData.totalAppointments}</div></div>
          <div class="stat-icon"><i class="fa-solid fa-calendar-check"></i></div>
        </div>
        <div class="stat-card">
          <div><div class="stat-label">Departments</div><div class="stat-value">${departments.length}</div></div>
          <div class="stat-icon"><i class="fa-solid fa-building"></i></div>
        </div>`;
}
export function renderAnalyticsCharts() {
    renderAnalyticsStats();
    requestAnimationFrame(() => {
        drawRevenueVsAppointmentsBarChart();
        drawAppointmentStatusPieChart();
        drawDepartmentPatientsHorizontalChart();
    });
}
// Helper: Synchronize internal canvas resolution with CSS display size & DPR to prevent squashing/blur
export function prepareHiDpiCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas)
        return null;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(260, Math.floor(rect.width));
    const height = Math.max(220, Math.floor(rect.height));
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    return { ctx, w: width, h: height };
}
// Vertical Bar Chart: Monthly Revenue ($k) vs Appointments
export function drawRevenueVsAppointmentsBarChart() {
    const surface = prepareHiDpiCanvas("revApptChart");
    if (!surface)
        return;
    const { ctx, w, h } = surface;
    const pad = { top: 34, right: 16, bottom: 36, left: 44 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;
    const maxVal = Math.max(...analyticsData.monthlyRevenueK, ...analyticsData.monthlyAppointments, 100);
    const stepX = plotW / analyticsData.months.length;
    // Legend
    ctx.font = "12px 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#0f766e";
    ctx.fillRect(pad.left, 8, 12, 12);
    ctx.fillStyle = "#0f292a";
    ctx.fillText("Revenue (₹k)", pad.left + 17, 18);
    ctx.fillStyle = "#5eead4";
    ctx.fillRect(pad.left + 115, 8, 12, 12);
    ctx.fillStyle = "#0f292a";
    ctx.fillText("Appointments", pad.left + 132, 18);
    // Horizontal gridlines & Y-axis ticks
    ctx.font = "11px 'Segoe UI', Roboto, sans-serif";
    for (let i = 0; i <= 4; i++) {
        const val = Math.round((maxVal / 4) * i);
        const y = h - pad.bottom - (plotH / 4) * i;
        ctx.strokeStyle = i === 0 ? "#cbd5e1" : "#eef5f5";
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
        ctx.fillStyle = "#64748b";
        ctx.textAlign = "right";
        ctx.fillText(String(val), pad.left - 6, y + 4);
    }
    ctx.textAlign = "left";
    // Y-axis line
    ctx.strokeStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, h - pad.bottom);
    ctx.stroke();
    analyticsData.months.forEach((m, idx) => {
        const groupX = pad.left + idx * stepX;
        const barW = Math.max(5, Math.min(18, (stepX - 8) / 2));
        const totalBarsW = barW * 2 + 3;
        const offsetX = groupX + (stepX - totalBarsW) / 2;
        const revH = (analyticsData.monthlyRevenueK[idx] / maxVal) * plotH;
        ctx.fillStyle = "#0f766e";
        ctx.fillRect(offsetX, h - pad.bottom - revH, barW, revH);
        const apptH = (analyticsData.monthlyAppointments[idx] / maxVal) * plotH;
        ctx.fillStyle = "#5eead4";
        ctx.fillRect(offsetX + barW + 3, h - pad.bottom - apptH, barW, apptH);
        ctx.fillStyle = "#475569";
        ctx.font = "11px 'Segoe UI', Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(m, groupX + stepX / 2, h - pad.bottom + 18);
    });
    ctx.textAlign = "left";
}
// Pie Chart: Appointment Statuses (Responsive layout prevents legend clipping)
export function drawAppointmentStatusPieChart() {
    const surface = prepareHiDpiCanvas("apptStatusPieChart");
    if (!surface)
        return;
    const { ctx, w, h } = surface;
    const entries = Object.entries(analyticsData.appointmentStatus);
    const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
    const palette = [
        "#0f766e", "#14b8a6", "#ef4444", "#f59e0b",
        "#64748b", "#0284c7", "#8b5cf6", "#ec4899", "#10b981"
    ];
    const isCompact = w < 440;
    const cx = isCompact ? w * 0.5 : Math.min(135, w * 0.27);
    const cy = isCompact ? h * 0.34 : h * 0.5;
    const radius = isCompact ? Math.min(68, h * 0.25) : Math.min(92, h * 0.36, w * 0.19);
    let startAngle = -Math.PI / 2;
    entries.forEach(([, count], idx) => {
        const sliceAngle = (count / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = palette[idx % palette.length];
        ctx.fill();
        startAngle += sliceAngle;
    });
    // White inner donut ring for cleaner visual proportion
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.font = "11.5px 'Segoe UI', Roboto, sans-serif";
    if (isCompact) {
        // Two-column legend below chart on narrow viewports
        const startY = cy + radius + 22;
        const colW = (w - 24) / 2;
        entries.forEach(([label, count], idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const lx = 14 + col * colW;
            const ly = startY + row * 18;
            ctx.fillStyle = palette[idx % palette.length];
            ctx.fillRect(lx, ly - 8, 9, 9);
            ctx.fillStyle = "#0f292a";
            ctx.fillText(`${label}: ${count}`, lx + 14, ly);
        });
    }
    else {
        // Two-column legend on the right so all 9 statuses fit comfortably
        const legendStartX = cx + radius + 22;
        const availW = w - legendStartX - 10;
        const useTwoCols = availW >= 250;
        const colW = useTwoCols ? availW / 2 : availW;
        const rowsPerCol = useTwoCols ? Math.ceil(entries.length / 2) : entries.length;
        const totalLegendH = rowsPerCol * 24;
        const startY = Math.max(24, (h - totalLegendH) / 2 + 10);
        entries.forEach(([label, count], idx) => {
            const col = useTwoCols ? Math.floor(idx / rowsPerCol) : 0;
            const row = useTwoCols ? idx % rowsPerCol : idx;
            const lx = legendStartX + col * colW;
            const ly = startY + row * 24;
            ctx.fillStyle = palette[idx % palette.length];
            ctx.fillRect(lx, ly - 9, 10, 10);
            ctx.fillStyle = "#0f292a";
            ctx.fillText(`${label}: ${count}`, lx + 16, ly);
        });
    }
}
// Horizontal Bar Chart: Department Statistics (Patients per Department)
export function drawDepartmentPatientsHorizontalChart() {
    const surface = prepareHiDpiCanvas("deptPatientsBarChart");
    if (!surface)
        return;
    const { ctx, w, h } = surface;
    // [BACKEND HOOK] Replace sample counts with live per-department patient counts
    const deptRows = departments.map((d, i) => ({
        name: d.name,
        patients: 85 + (((i + 1) * 37) % 140)
    }));
    const maxPatients = Math.max(...deptRows.map((r) => r.patients), 50);
    const leftLabelW = Math.min(165, Math.max(115, w * 0.22));
    const rightPad = 85;
    const plotW = Math.max(80, w - leftLabelW - rightPad);
    const rowH = Math.min(54, (h - 28) / Math.max(deptRows.length, 1));
    const barH = Math.min(26, Math.max(16, rowH - 18));
    deptRows.forEach((row, i) => {
        const y = 18 + i * rowH;
        const barW = (row.patients / maxPatients) * plotW;
        const barY = y + (rowH - barH) / 2;
        ctx.fillStyle = "#0f292a";
        ctx.font = "12.5px 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(row.name, 10, barY + barH / 2 + 4);
        ctx.fillStyle = "#eef5f5";
        ctx.fillRect(leftLabelW, barY, plotW, barH);
        ctx.fillStyle = "#0d9488";
        ctx.fillRect(leftLabelW, barY, barW, barH);
        ctx.fillStyle = "#0f766e";
        ctx.font = "bold 12px 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(`${row.patients} patients`, leftLabelW + barW + 10, barY + barH / 2 + 4);
    });
}
// Re-render analytics charts cleanly on window resize
export let analyticsResizeTimer;
window.addEventListener("resize", () => {
    if (!document.getElementById("sec-analytics")?.classList.contains("active"))
        return;
    clearTimeout(analyticsResizeTimer);
    analyticsResizeTimer = setTimeout(renderAnalyticsCharts, 100);
});
// =========================================================================
// SECTION 9: NOTIFICATIONS (REAL-TIME RELATIVE TIMESTAMPS & FILTERS)
// =========================================================================
export function setNotificationFilter(filterKey) {
    if (filterKey === "all" || filterKey === "unread" || filterKey === "read") {
        activeNotificationFilter = filterKey;
    }
    document.querySelectorAll("[data-notif-filter]").forEach((btn) => {
        btn.classList.toggle("active-filter", btn.dataset.notifFilter === activeNotificationFilter);
    });
    renderNotifications();
}
document.querySelectorAll("[data-notif-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.dataset.notifFilter) {
            setNotificationFilter(btn.dataset.notifFilter);
        }
    });
});
export function renderNotifications() {
    const container = document.getElementById("notificationsList");
    if (!container)
        return;
    const filtered = notifications.filter((n) => {
        if (activeNotificationFilter === "read")
            return !n.unread;
        if (activeNotificationFilter === "unread")
            return Boolean(n.unread);
        return true;
    });
    if (!filtered.length) {
        const emptyMsg = activeNotificationFilter === "all"
            ? "No notifications to display."
            : `No ${activeNotificationFilter} notifications to display.`;
        container.innerHTML = `<p style="color:var(--text-muted);">${emptyMsg}</p>`;
        updateBellDot();
        return;
    }
    container.innerHTML = filtered
        .map((n) => `
          <div class="notif-item ${n.unread ? "unread" : ""}">
            <div>
              <div>${escapeHtml(n.text)}</div>
              <div class="notif-rel-time" data-timestamp="${n.timestamp}" style="font-size:0.78rem;color:var(--text-muted);margin-top:3px;">
                ${escapeHtml(formatRelativeTime(n.timestamp))}
              </div>
            </div>
            <div class="notif-actions">
              ${n.unread
        ? `<button type="button" class="btn btn-success btn-icon-sm" onclick="markNotificationRead(${n.id})" title="Mark as read" aria-label="Mark as read">
                         <i class="fa-solid fa-check"></i>
                       </button>`
        : `<span class="badge badge-teal">Read</span>`}
              <button type="button" class="btn btn-danger btn-icon-sm" onclick="deleteNotification(${n.id})" title="Delete notification" aria-label="Delete notification">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>`)
        .join("");
    updateBellDot();
}
export function refreshNotificationRelativeTimes() {
    document.querySelectorAll(".notif-rel-time[data-timestamp]").forEach((el) => {
        const ts = Number(el.getAttribute("data-timestamp"));
        el.textContent = formatRelativeTime(ts);
    });
}
setInterval(refreshNotificationRelativeTimes, 15000);
export function markNotificationRead(id) {
    const item = notifications.find((n) => n.id === id);
    if (item)
        item.unread = false;
    renderNotifications();
}
export function deleteNotification(id) {
    notifications = notifications.filter((n) => n.id !== id);
    renderNotifications();
}
document.getElementById("markAllReadBtn")?.addEventListener("click", () => {
    notifications.forEach((n) => {
        n.unread = false;
    });
    renderNotifications();
    showToast("All notifications marked as read.");
});
document.getElementById("clearNotificationsBtn")?.addEventListener("click", () => {
    if (!notifications.length)
        return;
    openConfirmDialog({
        title: "Clear All Notifications",
        message: "Are you sure you want to delete all administrative notifications?",
        subtext: `All ${notifications.length} notification log(s) will be permanently cleared.`,
        confirmText: "Clear All",
        variant: "danger",
        iconClass: "fa-bell-slash",
        onConfirm: () => {
            notifications = [];
            renderNotifications();
            showToast("Notifications cleared.");
        }
    });
});
// =========================================================================
// SECTION 10: SETTINGS
// =========================================================================
export function populateSettingsForm() {
    document.getElementById("setHospitalName").value = hospitalSettings.hospitalName;
    document.getElementById("setContactEmail").value = hospitalSettings.contactEmail;
    document.getElementById("setPhoneNumber").value = hospitalSettings.phoneNumber;
    document.getElementById("setAddress").value = hospitalSettings.address;
    document.getElementById("setNotificationsEnabled").checked = Boolean(hospitalSettings.notificationsEnabled);
    const topbarHospitalName = document.getElementById("topbarHospitalName");
    if (topbarHospitalName)
        topbarHospitalName.textContent = hospitalSettings.hospitalName;
}
document.getElementById("settingsForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    hospitalSettings = {
        hospitalName: document.getElementById("setHospitalName").value.trim(),
        contactEmail: document.getElementById("setContactEmail").value.trim(),
        phoneNumber: document.getElementById("setPhoneNumber").value.trim(),
        address: document.getElementById("setAddress").value.trim(),
        notificationsEnabled: document.getElementById("setNotificationsEnabled").checked
    };
    // [BACKEND HOOK] PUT /api/admin/settings
    const topbarHospitalName = document.getElementById("topbarHospitalName");
    if (topbarHospitalName)
        topbarHospitalName.textContent = hospitalSettings.hospitalName;
    updateBellDot();
    showToast("HMS settings saved.");
});
window.promptToggleUserActiveStatus = promptToggleUserActiveStatus;
window.deleteUser = deleteUser;
window.deleteDepartment = deleteDepartment;
window.deleteMedication = deleteMedication;
window.openAddWardModal = openAddWardModal;
window.openAddBedToWardModal = openAddBedToWardModal;
window.promptDeleteWard = promptDeleteWard;
window.promptDeleteBed = promptDeleteBed;
window.onBedClick = onBedClick;
window.confirmAssignBed = confirmAssignBed;
window.confirmReleaseBed = confirmReleaseBed;
window.openBloodAdjustModal = openBloodAdjustModal;
window.viewInvoice = viewInvoice;
window.deleteInvoice = deleteInvoice;
window.markNotificationRead = markNotificationRead;
window.deleteNotification = deleteNotification;
// =========================================================================
// INITIALIZATION
// =========================================================================
export function initAdminDashboard() {
    refreshTopbarProfile();
    populateSettingsForm();
    populateUserDepartmentDropdowns();
    renderDashboard();
    renderUsersTable();
    renderDepartmentsTable();
    renderPharmacyTable();
    renderBeds();
    renderBloodBank();
    renderBillingTable();
    renderNotifications();
    attachTableSorting("usersTable", getFilteredUsers, renderUsersTable);
    attachTableSorting("departmentsTable", getEnrichedDepartments, renderDepartmentsTable);
    attachTableSorting("pharmacyTable", getEnrichedMedications, renderPharmacyTable);
    attachTableSorting("donationsTable", () => donations, renderDonationsTable);
    attachTableSorting("billingTable", () => invoices, renderBillingTable);
}
initAdminDashboard();
export const socket = new WebSocket("ws://localhost:8080/ws");
export const client = Stomp.over(socket);
client.connect({}, () => {
    // Receive messages from server
    client.subscribe("/topic/notifications", (message) => {
        console.log("Received:", JSON.parse(message.body));
    });
}, (error) => console.error("STOMP Error:", error));
// Send message through HTTP
export function sendNotification() {
    fetch("http://localhost:8080/notify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "User1",
            content: "Hello everyone!"
        })
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to send notification");
        }
        console.log("Notification sent!");
    })
        .catch((error) => console.error(error));
}
window.sendNotification = sendNotification;
