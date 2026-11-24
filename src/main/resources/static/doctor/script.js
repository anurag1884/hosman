// =========================================================================
// STATE & REALISTIC CLINICAL MOCK DATA
// =========================================================================
import { attachTableSorting, escapeHtml, renderSorted } from '../common/script.js';
export function getTodayIsoDate() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
export function getOffsetIsoDate(dayOffset) {
    const dt = new Date();
    dt.setDate(dt.getDate() + dayOffset);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
export const TODAY_ISO = getTodayIsoDate();
// Strict Status Priority for OPD Queue: Confirmed -> Pending -> Completed -> Cancelled
export const OPD_STATUS_PRIORITY = {
    Confirmed: 1,
    Pending: 2,
    Completed: 3,
    Cancelled: 4
};
// Logged-in Doctor Profile
export let doctorProfile = {
    id: 2,
    username: "dr.chen",
    role: "DOCTOR",
    licenseNumber: "MCI-2006-44918",
    firstName: "Mei",
    middleName: "",
    lastName: "Chen",
    gender: "Female",
    dob: "1979-08-23",
    department: "Cardiology",
    qualification: "MBBS, MD, DM (Cardiology)",
    specialization: "Interventional Cardiology & Heart Failure",
    yearsOfExperience: 16,
    consultationFee: 800,
    workingTimeStart: "09:00",
    workingTimeEnd: "17:00",
    isAvailable: true,
    email: "m.chen@medicore-hms.org",
    phone: "+91-98301-44210",
    address: "24 Maple Grove Lane, Sector V, Kolkata"
};
// Hospital Pharmacy Medication Formulary
export const pharmacyCatalog = [
    { id: 1, name: "Atorva 20mg", genericName: "Atorvastatin", form: "Tablet" },
    { id: 2, name: "Telma 40mg", genericName: "Telmisartan", form: "Tablet" },
    { id: 3, name: "Ecosprin 75mg", genericName: "Aspirin", form: "Tablet" },
    { id: 4, name: "Metpure XL 50mg", genericName: "Metoprolol Succinate", form: "Tablet" },
    { id: 5, name: "Amoxil 500mg", genericName: "Amoxicillin", form: "Capsule" },
    { id: 6, name: "Pan-D", genericName: "Pantoprazole + Domperidone", form: "Capsule" },
    { id: 7, name: "Dolopar 650mg", genericName: "Paracetamol", form: "Tablet" },
    { id: 8, name: "Clopilet 75mg", genericName: "Clopidogrel", form: "Tablet" },
    { id: 9, name: "Rosuvas 10mg", genericName: "Rosuvastatin", form: "Tablet" },
    { id: 10, name: "Lasix 40mg", genericName: "Furosemide", form: "Tablet" }
];
// Patients directory (My Patients table filters to those with >= 1 Completed appointment)
export let patients = [
    {
        id: 101,
        fullName: "Oliver Reed",
        age: 28,
        gender: "Male",
        phone: "+91-98765-43210",
        email: "o.reed@example.com",
        bloodGroup: "O+",
        allergies: "Penicillin",
        chronicCondition: "Mild Arrhythmia / Palpitations",
        emergencyContact: "Clara Reed (+91-98765-43219)",
        lastVisit: TODAY_ISO
    },
    {
        id: 102,
        fullName: "Sophia Alvarez",
        age: 52,
        gender: "Female",
        phone: "+91-98312-77410",
        email: "s.alvarez@example.com",
        bloodGroup: "A-",
        allergies: "None known",
        chronicCondition: "Essential Hypertension",
        emergencyContact: "Carlos Alvarez (+91-98312-77411)",
        lastVisit: TODAY_ISO
    },
    {
        id: 103,
        fullName: "Marcus Vance",
        age: 61,
        gender: "Male",
        phone: "+91-99034-11289",
        email: "m.vance@example.com",
        bloodGroup: "B+",
        allergies: "Sulfa drugs",
        chronicCondition: "Coronary Artery Disease (Post-Stent)",
        emergencyContact: "Helena Vance (+91-99034-11290)",
        lastVisit: TODAY_ISO
    },
    {
        id: 104,
        fullName: "Ananya Chatterjee",
        age: 39,
        gender: "Female",
        phone: "+91-98300-65821",
        email: "ananya.c@example.com",
        bloodGroup: "O-",
        allergies: "Aspirin sensitivity",
        chronicCondition: "Gestational Hypertension Follow-up",
        emergencyContact: "Debashis Chatterjee (+91-98300-65822)",
        lastVisit: TODAY_ISO
    },
    {
        id: 105,
        fullName: "Vikramaditya Sen",
        age: 47,
        gender: "Male",
        phone: "+91-97481-30945",
        email: "v.sen@example.com",
        bloodGroup: "AB+",
        allergies: "None known",
        chronicCondition: "Hyperlipidemia",
        emergencyContact: "Rhea Sen (+91-97481-30946)",
        lastVisit: getOffsetIsoDate(-4)
    },
    {
        id: 106,
        fullName: "Meera Krishnan",
        age: 66,
        gender: "Female",
        phone: "+91-98364-88210",
        email: "meera.k@example.com",
        bloodGroup: "A+",
        allergies: "Latex",
        chronicCondition: "Atrial Fibrillation",
        emergencyContact: "Suresh Krishnan (+91-98364-88211)",
        lastVisit: getOffsetIsoDate(-10)
    }
];
// Doctor's Appointments
export let appointments = [
    {
        id: 501,
        patientId: 101,
        patientName: "Oliver Reed",
        date: TODAY_ISO,
        time: "09:30",
        type: "Consultation",
        reason: "Intermittent chest tightness & resting tachycardia",
        status: "Completed",
        cancellationReason: "",
        prescription: {
            issuedAt: `${TODAY_ISO} 09:55`,
            diagnosis: "Sinus Tachycardia & Anxiety-induced Palpitations",
            notes: "ECG normal sinus rhythm. Avoid excess caffeine, ensure hydration, repeat Holter if symptoms persist.",
            medications: [
                {
                    medicineId: 4,
                    medicineName: "Metpure XL 50mg (Metoprolol Succinate)",
                    dosage: "25 mg (1/2 tab)",
                    frequency: "Once daily (OD)",
                    duration: "14 days",
                    instructions: "After breakfast"
                },
                {
                    medicineId: 6,
                    medicineName: "Pan-D (Pantoprazole + Domperidone)",
                    dosage: "1 capsule",
                    frequency: "Once daily (OD)",
                    duration: "10 days",
                    instructions: "30 mins before breakfast"
                }
            ]
        }
    },
    {
        id: 502,
        patientId: 102,
        patientName: "Sophia Alvarez",
        date: TODAY_ISO,
        time: "10:45",
        type: "Follow-up",
        reason: "Blood pressure review & lipid profile evaluation",
        status: "Confirmed",
        cancellationReason: "",
        prescription: null
    },
    {
        id: 503,
        patientId: 103,
        patientName: "Marcus Vance",
        date: TODAY_ISO,
        time: "12:15",
        type: "Follow-up",
        reason: "Post-angioplasty 3-month routine cardiac checkup",
        status: "Pending",
        cancellationReason: "",
        prescription: null
    },
    {
        id: 504,
        patientId: 104,
        patientName: "Ananya Chatterjee",
        date: TODAY_ISO,
        time: "15:00",
        type: "Consultation",
        reason: "Elevated blood pressure readings at home (148/94 mmHg)",
        status: "Pending",
        cancellationReason: "",
        prescription: null
    },
    {
        id: 507,
        patientId: 106,
        patientName: "Meera Krishnan",
        date: TODAY_ISO,
        time: "16:15",
        type: "Consultation",
        reason: "Mild ankle edema & shortness of breath on exertion",
        status: "Cancelled",
        cancellationReason: "Patient requested reschedule to next week.",
        prescription: null
    },
    {
        id: 505,
        patientId: 105,
        patientName: "Vikramaditya Sen",
        date: getOffsetIsoDate(1),
        time: "11:00",
        type: "Follow-up",
        reason: "Statin tolerance & fasting lipid panel review",
        status: "Confirmed",
        cancellationReason: "",
        prescription: null
    }
];
// Doctor-specific Notifications
export let notifications = [
    {
        id: 1,
        text: "New Follow-up appointment requested by Marcus Vance for today at 12:15.",
        timestamp: Date.now() - 18 * 60 * 1000,
        unread: true
    },
    {
        id: 2,
        text: "New Consultation booked by Ananya Chatterjee for today at 15:00.",
        timestamp: Date.now() - 55 * 60 * 1000,
        unread: true
    },
    {
        id: 3,
        text: "Digital prescription for Oliver Reed (Appt #501) was transmitted to Pharmacy.",
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        unread: false
    },
    {
        id: 4,
        text: "Patient Meera Krishnan cancelled her consultation scheduled for today at 16:15.",
        timestamp: Date.now() - 3 * 60 * 60 * 1000,
        unread: false
    }
];
export let activeNotificationFilter = "all";
// =========================================================================
// TOAST, CONFIRMATION DIALOG & MODAL UTILITIES
// =========================================================================
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
export function formatTime12h(time24) {
    if (!time24 || !time24.includes(":"))
        return time24 || "";
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${mStr} ${ampm}`;
}
export function formatReadableDate(isoDate) {
    if (!isoDate)
        return "";
    if (isoDate === TODAY_ISO)
        return "Today";
    const [y, m, d] = isoDate.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
export function showToast(message, type = "success") {
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
    const hasUnread = notifications.some((n) => n.unread);
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
export let pendingConfirmAction = null;
export function openConfirmDialog({ title = "Confirm Action", message = "Are you sure you want to proceed?", subtext = "", confirmText = "Confirm", cancelText = "Cancel", variant = "danger", iconClass = "fa-triangle-exclamation", allowCancellationReason = false, defaultReason = "", onConfirm }) {
    const header = document.getElementById("confirmDialogHeader");
    const iconWrap = document.getElementById("confirmDialogIcon");
    const proceedBtn = document.getElementById("confirmDialogProceedBtn");
    const cancelBtn = document.getElementById("confirmDialogCancelBtn");
    const reasonBox = document.getElementById("cancelReasonBox");
    const reasonInput = document.getElementById("cancelReasonInput");
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
    if (reasonBox && reasonInput) {
        if (allowCancellationReason) {
            reasonBox.classList.add("active");
            reasonInput.value = defaultReason || "";
        }
        else {
            reasonBox.classList.remove("active");
            reasonInput.value = "";
        }
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
    const reasonInput = document.getElementById("cancelReasonInput");
    const reasonBox = document.getElementById("cancelReasonBox");
    const reasonVal = reasonBox?.classList.contains("active") && reasonInput ? reasonInput.value.trim() : "";
    const action = pendingConfirmAction;
    pendingConfirmAction = null;
    closeModal("confirmDialogModal");
    if (action)
        action(reasonVal);
});
document.addEventListener("click", (e) => {
    const target = e.target;
    const closeBtn = target?.closest("[data-close-modal]");
    if (closeBtn) {
        const modalId = closeBtn.getAttribute("data-close-modal");
        if (modalId) {
            if (modalId === "confirmDialogModal")
                pendingConfirmAction = null;
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
export let modalMouseDownTarget = null;
document.addEventListener("mousedown", (e) => {
    modalMouseDownTarget = e.target;
});
document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop && modalMouseDownTarget === backdrop) {
            if (backdrop.id === "confirmDialogModal")
                pendingConfirmAction = null;
            backdrop.classList.remove("open");
        }
        modalMouseDownTarget = null;
    });
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
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
// NAVIGATION, TOPBAR DOCTOR PROFILE & BELL WIRING
// =========================================================================
export function navigateToSection(sectionKey) {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.section === sectionKey);
    });
    document.querySelectorAll(".section-view").forEach((sec) => {
        sec.classList.toggle("active", sec.id === `sec-${sectionKey}`);
    });
    document.getElementById("sidebar")?.classList.remove("open");
    if (sectionKey === "dashboard")
        renderDashboard();
    if (sectionKey === "opdqueue")
        renderOpdQueueSection();
    if (sectionKey === "appointments")
        renderSorted("appointmentsTable", getFilteredAppointments(), renderAppointmentsTable);
    if (sectionKey === "patients")
        renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable);
    if (sectionKey === "notifications")
        renderNotifications();
}
document.getElementById("navList")?.addEventListener("click", (e) => {
    const target = e.target;
    const btn = target?.closest(".nav-btn");
    if (btn && btn.dataset.section) {
        navigateToSection(btn.dataset.section);
    }
});
document.getElementById("openFullOpdQueueBtn")?.addEventListener("click", () => {
    navigateToSection("opdqueue");
});
document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.toggle("open");
});
document.getElementById("bellBtn")?.addEventListener("click", () => {
    navigateToSection("notifications");
});
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
    openDoctorProfileModal();
});
export function getDoctorDisplayName(profileObj = doctorProfile) {
    const full = `${profileObj.firstName || ""} ${profileObj.lastName || ""}`.trim();
    return full ? `Dr. ${full}` : profileObj.username;
}
export function refreshTopbarProfile() {
    const displayName = getDoctorDisplayName();
    const usernameEl = document.getElementById("topbarUsername");
    const roleEl = document.getElementById("topbarRole");
    const avatarEl = document.getElementById("topbarAvatar");
    const greetingEl = document.getElementById("welcomeGreeting");
    const deptBadge = document.getElementById("doctorDeptBadge");
    if (usernameEl)
        usernameEl.textContent = doctorProfile.username;
    if (roleEl)
        roleEl.textContent = "DOCTOR";
    if (avatarEl) {
        avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0f766e&color=ffffff`;
    }
    if (greetingEl)
        greetingEl.textContent = `Welcome back, ${displayName}!`;
    if (deptBadge) {
        deptBadge.innerHTML = `<i class="fa-solid fa-stethoscope"></i> ${escapeHtml(doctorProfile.department)}`;
    }
}
export function openDoctorProfileModal() {
    document.getElementById("docUsername").value = doctorProfile.username || "";
    document.getElementById("docRole").value = "DOCTOR";
    document.getElementById("docLicenseNo").value = doctorProfile.licenseNumber || "";
    document.getElementById("docFirstName").value = doctorProfile.firstName || "";
    document.getElementById("docMiddleName").value = doctorProfile.middleName || "";
    document.getElementById("docLastName").value = doctorProfile.lastName || "";
    document.getElementById("docGender").value =
        doctorProfile.gender || "Female";
    const dobInput = document.getElementById("docDob");
    if (dobInput) {
        dobInput.max = TODAY_ISO;
        dobInput.value = doctorProfile.dob || "";
    }
    document.getElementById("docDepartment").value =
        doctorProfile.department || "Cardiology";
    document.getElementById("docQualification").value = doctorProfile.qualification || "";
    document.getElementById("docSpecialization").value =
        doctorProfile.specialization || "";
    document.getElementById("docExperience").value = String(doctorProfile.yearsOfExperience ?? 0);
    document.getElementById("docConsultationFee").value = String(doctorProfile.consultationFee ?? 500);
    document.getElementById("docWorkStart").value =
        doctorProfile.workingTimeStart || "09:00";
    document.getElementById("docWorkEnd").value =
        doctorProfile.workingTimeEnd || "17:00";
    document.getElementById("docIsAvailable").checked = Boolean(doctorProfile.isAvailable);
    document.getElementById("docEmail").value = doctorProfile.email || "";
    document.getElementById("docPhone").value = doctorProfile.phone || "";
    document.getElementById("docAddress").value =
        doctorProfile.address || "";
    openModal("doctorProfileModal");
}
export function applyDoctorProfileSave(updatedFields, cancelActiveAppointments, defaultCancelReason = "") {
    doctorProfile = {
        ...doctorProfile,
        ...updatedFields
    };
    let cancelledCount = 0;
    if (cancelActiveAppointments) {
        appointments.forEach((appt) => {
            if (appt.status === "Pending" || appt.status === "Confirmed") {
                appt.status = "Cancelled";
                appt.cancellationReason = defaultCancelReason;
                cancelledCount += 1;
            }
        });
    }
    closeModal("doctorProfileModal");
    refreshTopbarProfile();
    syncAllAppointmentViews();
    if (cancelledCount > 0) {
        addNotification(`Availability disabled: ${cancelledCount} active appointment(s) cancelled. Reason: "${defaultCancelReason}"`);
        showToast(`Profile saved and ${cancelledCount} active appointment(s) cancelled.`);
    }
    else {
        addNotification(`Doctor profile settings updated for ${getDoctorDisplayName()}.`);
        showToast("Doctor profile settings saved.");
    }
}
document.getElementById("doctorProfileForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const dobInput = document.getElementById("docDob");
    const dobVal = dobInput?.value ?? "";
    if (dobVal && dobVal > TODAY_ISO) {
        showToast("Date of birth cannot be after today's date.", "error");
        return;
    }
    const wasAvailable = Boolean(doctorProfile.isAvailable);
    const willBeAvailable = Boolean(document.getElementById("docIsAvailable")?.checked);
    const updatedFields = {
        username: document.getElementById("docUsername")?.value.trim() ?? "",
        licenseNumber: document.getElementById("docLicenseNo")?.value.trim() ?? "",
        firstName: document.getElementById("docFirstName")?.value.trim() ?? "",
        middleName: document.getElementById("docMiddleName")?.value.trim() ?? "",
        lastName: document.getElementById("docLastName")?.value.trim() ?? "",
        gender: document.getElementById("docGender")?.value.trim() ?? "",
        dob: dobVal,
        department: document.getElementById("docDepartment")?.value.trim() ??
            "",
        qualification: document.getElementById("docQualification")?.value.trim() ?? "",
        specialization: document.getElementById("docSpecialization")?.value.trim() ?? "",
        yearsOfExperience: Number(document.getElementById("docExperience")?.value ?? 0),
        consultationFee: Number(document.getElementById("docConsultationFee")?.value ?? 0),
        workingTimeStart: document.getElementById("docWorkStart")?.value ?? "09:00",
        workingTimeEnd: document.getElementById("docWorkEnd")?.value ?? "17:00",
        isAvailable: willBeAvailable,
        email: document.getElementById("docEmail")?.value.trim() ?? "",
        phone: document.getElementById("docPhone")?.value.trim() ?? "",
        address: document.getElementById("docAddress")?.value.trim() ?? ""
    };
    if (wasAvailable && !willBeAvailable) {
        const activeAppts = appointments.filter((a) => a.status === "Pending" || a.status === "Confirmed");
        const pendingCount = activeAppts.filter((a) => a.status === "Pending").length;
        const confirmedCount = activeAppts.filter((a) => a.status === "Confirmed").length;
        const docLabel = getDoctorDisplayName({ ...doctorProfile, ...updatedFields });
        const autoReason = `${docLabel} is currently unavailable to take appointments.`;
        const breakdownText = activeAppts.length > 0
            ? `This will cancel ${activeAppts.length} assigned appointment(s) (${confirmedCount} Confirmed, ${pendingCount} Pending) with reason: "${autoReason}"`
            : "There are currently no Pending or Confirmed appointments to cancel.";
        openConfirmDialog({
            title: "Mark Unavailable & Cancel Appointments?",
            message: "Unchecking 'Available for Patient Appointments' will cancel all currently assigned Pending and Confirmed appointments.",
            subtext: breakdownText,
            confirmText: activeAppts.length > 0 ? "Yes, Cancel & Save" : "Mark Unavailable",
            cancelText: "Keep Available",
            variant: "danger",
            iconClass: "fa-calendar-xmark",
            onConfirm: () => {
                applyDoctorProfileSave(updatedFields, true, autoReason);
            }
        });
        return;
    }
    applyDoctorProfileSave(updatedFields, false, "");
});
// Change Password
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
    if (newPwd !== repeatPwd) {
        showToast("New password and repeat password do not match.", "error");
        return;
    }
    if (newPwd === currentPwd) {
        showToast("New password must be different from your current password.", "error");
        return;
    }
    closeModal("changePasswordModal");
    form.reset();
    resetPasswordVisibility(form);
    addNotification("Account password was updated.");
    showToast("Password changed successfully.");
});
// Logout Confirmation
export function promptLogout() {
    profileDropdown?.classList.remove("open");
    openConfirmDialog({
        title: "Confirm Logout",
        message: "Are you sure you want to log out?",
        subtext: "Any unsaved clinical notes will be lost and you will need to sign in again.",
        confirmText: "Yes, Log Out",
        cancelText: "Stay Logged In",
        variant: "warning",
        iconClass: "fa-right-from-bracket",
        onConfirm: () => {
            showToast("Logged out of Doctor Portal.", "success");
        }
    });
}
document.getElementById("dropdownLogoutBtn")?.addEventListener("click", promptLogout);
document.getElementById("sidebarLogoutBtn")?.addEventListener("click", promptLogout);
// =========================================================================
// STATUS, TYPE & ACTION BUTTON HELPERS
// =========================================================================
export function getAppointmentStatusBadge(status, cancellationReason = "") {
    let badgeHtml = "";
    switch (status) {
        case "Confirmed":
            badgeHtml = `<span class="badge badge-info"><i class="fa-solid fa-calendar-check"></i> Confirmed</span>`;
            break;
        case "Pending":
            badgeHtml = `<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> Pending</span>`;
            break;
        case "Completed":
            badgeHtml = `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Completed</span>`;
            break;
        case "Cancelled":
            badgeHtml = `<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Cancelled</span>`;
            break;
        default:
            badgeHtml = `<span class="badge badge-gray">${escapeHtml(status)}</span>`;
    }
    if (status === "Cancelled" && cancellationReason) {
        return `
          ${badgeHtml}
          <div class="cancel-reason-badge" title="${escapeHtml(cancellationReason)}">
            <strong>Reason:</strong> ${escapeHtml(cancellationReason)}
          </div>`;
    }
    return badgeHtml;
}
export function getAppointmentTypeBadge(type) {
    return type === "Consultation"
        ? `<span class="badge badge-teal"><i class="fa-solid fa-stethoscope"></i> Consultation</span>`
        : `<span class="badge badge-gray"><i class="fa-solid fa-rotate"></i> Follow-up</span>`;
}
export function buildAppointmentActionsHtml(appt) {
    if (appt.status === "Pending") {
        return `
          <div class="action-btn-group">
            <button type="button" class="btn btn-sm btn-success" onclick="confirmAppointment(${appt.id})">
              <i class="fa-solid fa-check"></i> Confirm
            </button>
            <button type="button" class="btn btn-sm btn-danger" onclick="promptCancelAppointment(${appt.id})">
              <i class="fa-solid fa-xmark"></i> Cancel
            </button>
          </div>`;
    }
    if (appt.status === "Confirmed") {
        return `
          <div class="action-btn-group">
            <button type="button" class="btn btn-sm btn-primary" onclick="completeAppointment(${appt.id})">
              <i class="fa-solid fa-circle-check"></i> Complete Appointment
            </button>
            <button type="button" class="btn btn-sm btn-danger" onclick="promptCancelAppointment(${appt.id})">
              <i class="fa-solid fa-xmark"></i> Cancel
            </button>
          </div>`;
    }
    if (appt.status === "Completed") {
        if (appt.prescription) {
            return `
              <div class="action-btn-group">
                <button type="button" class="btn btn-sm btn-outline" onclick="openPrescriptionModal(${appt.id})">
                  <i class="fa-solid fa-file-medical"></i> View / Edit Prescription
                </button>
              </div>`;
        }
        return `
          <div class="action-btn-group">
            <button type="button" class="btn btn-sm btn-primary" onclick="openPrescriptionModal(${appt.id})">
              <i class="fa-solid fa-file-prescription"></i> Add Prescription
            </button>
          </div>`;
    }
    return `<span style="color:var(--text-muted);font-size:0.82rem;">No actions available</span>`;
}
// =========================================================================
// OPD QUEUE ORDERING & RENDERING (Confirmed -> Pending -> Completed -> Cancelled)
// =========================================================================
export function getOrderedOpdQueue(onlyToday = true) {
    const source = onlyToday ? appointments.filter((a) => a.date === TODAY_ISO) : [...appointments];
    return source.sort((a, b) => {
        const prioA = OPD_STATUS_PRIORITY[a.status] ?? 99;
        const prioB = OPD_STATUS_PRIORITY[b.status] ?? 99;
        if (prioA !== prioB)
            return prioA - prioB;
        const dateCmp = String(a.date).localeCompare(String(b.date));
        if (dateCmp !== 0)
            return dateCmp;
        return String(a.time).localeCompare(String(b.time));
    });
}
export function renderOpdQueueRows(tbodyId, queueList, includeDate = false) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody)
        return;
    if (!queueList.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);">No appointments in the OPD queue.</td></tr>`;
        return;
    }
    tbody.innerHTML = queueList
        .map((appt, idx) => {
        const tokenNumber = `OPD-${String(idx + 1).padStart(2, "0")}`;
        const rowClass = appt.status === "Confirmed"
            ? "opd-row-confirmed"
            : appt.status === "Cancelled"
                ? "opd-row-cancelled"
                : "";
        const timeDisplay = includeDate
            ? `<strong>${escapeHtml(formatReadableDate(appt.date))}</strong><br/><span style="color:var(--text-muted);font-size:0.82rem;">${escapeHtml(formatTime12h(appt.time))}</span>`
            : `<strong>${escapeHtml(formatTime12h(appt.time))}</strong>`;
        return `
              <tr class="${rowClass}">
                <td><span class="queue-token-badge">${tokenNumber}</span></td>
                <td><strong>${escapeHtml(appt.patientName)}</strong></td>
                <td>${timeDisplay}</td>
                <td>${getAppointmentTypeBadge(appt.type)}</td>
                <td style="max-width: 240px;">${escapeHtml(appt.reason)}</td>
                <td>${getAppointmentStatusBadge(appt.status, appt.cancellationReason)}</td>
                <td>${buildAppointmentActionsHtml(appt)}</td>
              </tr>`;
    })
        .join("");
}
export function renderOpdQueueSection() {
    const queue = getOrderedOpdQueue(true);
    const confirmedCount = queue.filter((a) => a.status === "Confirmed").length;
    const pendingCount = queue.filter((a) => a.status === "Pending").length;
    const completedCount = queue.filter((a) => a.status === "Completed").length;
    const cancelledCount = queue.filter((a) => a.status === "Cancelled").length;
    const statsGrid = document.getElementById("opdQueueStatsGrid");
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="stat-card" style="border-left-color: var(--info);">
              <div><div class="stat-label">Confirmed (Ready)</div><div class="stat-value">${confirmedCount}</div></div>
              <div class="stat-icon" style="background: var(--info-bg); color: var(--info);"><i class="fa-solid fa-calendar-check"></i></div>
            </div>
            <div class="stat-card" style="border-left-color: var(--warning);">
              <div><div class="stat-label">Pending Approval</div><div class="stat-value">${pendingCount}</div></div>
              <div class="stat-icon" style="background: var(--warning-bg); color: var(--warning);"><i class="fa-solid fa-clock"></i></div>
            </div>
            <div class="stat-card" style="border-left-color: var(--success);">
              <div><div class="stat-label">Completed</div><div class="stat-value">${completedCount}</div></div>
              <div class="stat-icon" style="background: var(--success-bg); color: var(--success);"><i class="fa-solid fa-circle-check"></i></div>
            </div>
            <div class="stat-card" style="border-left-color: var(--danger);">
              <div><div class="stat-label">Cancelled</div><div class="stat-value">${cancelledCount}</div></div>
              <div class="stat-icon" style="background: var(--danger-bg); color: var(--danger);"><i class="fa-solid fa-ban"></i></div>
            </div>`;
    }
    renderOpdQueueRows("opdQueueTableBody", queue, false);
}
// =========================================================================
// SECTION 1: DOCTOR DASHBOARD OVERVIEW (USES OPD QUEUE)
// =========================================================================
export function getCompletedEligiblePatients() {
    const completedPatientIds = new Set(appointments.filter((a) => a.status === "Completed").map((a) => a.patientId));
    return patients.filter((p) => completedPatientIds.has(p.id));
}
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
    const todaysOpdQueue = getOrderedOpdQueue(true);
    const totalPatients = getCompletedEligiblePatients().length;
    const pendingAppointments = appointments.filter((a) => a.status === "Pending").length;
    const completedToday = todaysOpdQueue.filter((a) => a.status === "Completed").length;
    const prescriptionsWritten = appointments.filter((a) => Boolean(a.prescription)).length;
    const stats = [
        { label: "Appointments Today", value: todaysOpdQueue.length, icon: "fa-calendar-day" },
        { label: "Total Patients", value: totalPatients, icon: "fa-hospital-user" },
        { label: "Pending Appointments", value: pendingAppointments, icon: "fa-hourglass-half" },
        { label: "Completed Today", value: completedToday, icon: "fa-clipboard-check" },
        { label: "Prescriptions Written", value: prescriptionsWritten, icon: "fa-file-prescription" }
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
    renderOpdQueueRows("dashboardOpdTableBody", todaysOpdQueue, false);
}
// =========================================================================
// SECTION 3: MY APPOINTMENTS & WORKFLOW ACTIONS (SORTABLE EXCEPT ACTIONS)
// =========================================================================
export function getFilteredAppointments() {
    const query = document.getElementById("apptSearchInput")?.value.trim().toLowerCase() ?? "";
    const typeFilter = document.getElementById("apptTypeFilter")?.value
        .trim()
        .toLowerCase() ?? "";
    const statusFilter = document.getElementById("apptStatusFilter")?.value
        .trim()
        .toLowerCase() ?? "";
    return appointments
        .map((a) => ({
        ...a,
        dateTimeSort: `${a.date} ${a.time}`
    }))
        .filter((a) => {
        const matchesQuery = !query || a.patientName.toLowerCase().includes(query);
        const matchesType = !typeFilter || a.type.toLowerCase().includes(typeFilter);
        const matchesStatus = !statusFilter || a.status.toLowerCase().includes(statusFilter);
        return matchesQuery && matchesType && matchesStatus;
    });
}
export function renderAppointmentsTable(list = getFilteredAppointments()) {
    const tbody = document.getElementById("appointmentsTableBody");
    if (!tbody)
        return;
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">No matching appointments found.</td></tr>`;
        return;
    }
    tbody.innerHTML = list
        .map((appt) => {
        return `
              <tr>
                <td><strong>${escapeHtml(appt.patientName)}</strong></td>
                <td>
                  <strong>${escapeHtml(formatReadableDate(appt.date))}</strong><br/>
                  <span style="color:var(--text-muted);font-size:0.82rem;">${escapeHtml(formatTime12h(appt.time))}</span>
                </td>
                <td>${getAppointmentTypeBadge(appt.type)}</td>
                <td style="max-width: 240px;">${escapeHtml(appt.reason)}</td>
                <td>${getAppointmentStatusBadge(appt.status, appt.cancellationReason)}</td>
                <td>${buildAppointmentActionsHtml(appt)}</td>
              </tr>`;
    })
        .join("");
}
export function syncAllAppointmentViews() {
    renderDashboard();
    renderOpdQueueSection();
    renderSorted("appointmentsTable", getFilteredAppointments(), renderAppointmentsTable);
}
export function confirmAppointment(apptId) {
    const appt = appointments.find((a) => a.id === apptId);
    if (!appt || appt.status !== "Pending")
        return;
    appt.status = "Confirmed";
    appt.cancellationReason = "";
    syncAllAppointmentViews();
    addNotification(`Confirmed ${appt.type.toLowerCase()} appointment for ${appt.patientName} (${formatReadableDate(appt.date)} at ${formatTime12h(appt.time)}).`);
    showToast(`Appointment confirmed for ${appt.patientName}.`);
}
export function promptCancelAppointment(apptId) {
    const appt = appointments.find((a) => a.id === apptId);
    if (!appt)
        return;
    openConfirmDialog({
        title: "Cancel Appointment",
        message: `Are you sure you want to cancel ${appt.patientName}'s appointment?`,
        subtext: `Scheduled for ${formatReadableDate(appt.date)} at ${formatTime12h(appt.time)} (${appt.type}).`,
        confirmText: "Yes, Cancel Appointment",
        variant: "danger",
        iconClass: "fa-calendar-xmark",
        allowCancellationReason: true,
        defaultReason: "",
        onConfirm: (reasonText) => {
            appt.status = "Cancelled";
            appt.cancellationReason = reasonText || "";
            syncAllAppointmentViews();
            const notifMsg = reasonText
                ? `Cancelled appointment for ${appt.patientName} (${formatReadableDate(appt.date)} at ${formatTime12h(appt.time)}). Reason: "${reasonText}"`
                : `Cancelled appointment for ${appt.patientName} (${formatReadableDate(appt.date)} at ${formatTime12h(appt.time)}).`;
            addNotification(notifMsg);
            showToast(`Appointment cancelled for ${appt.patientName}.`);
        }
    });
}
export function completeAppointment(apptId) {
    const appt = appointments.find((a) => a.id === apptId);
    if (!appt || appt.status !== "Confirmed")
        return;
    appt.status = "Completed";
    const patient = patients.find((p) => p.id === appt.patientId);
    if (patient) {
        patient.lastVisit = appt.date;
    }
    syncAllAppointmentViews();
    renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable);
    addNotification(`Completed consultation for ${appt.patientName}. Ready for digital prescription.`);
    showToast(`Marked ${appt.patientName}'s appointment as Completed.`);
}
document.getElementById("apptSearchInput")?.addEventListener("input", () => renderSorted("appointmentsTable", getFilteredAppointments(), renderAppointmentsTable));
document.getElementById("apptTypeFilter")?.addEventListener("input", () => renderSorted("appointmentsTable", getFilteredAppointments(), renderAppointmentsTable));
document.getElementById("apptStatusFilter")?.addEventListener("input", () => renderSorted("appointmentsTable", getFilteredAppointments(), renderAppointmentsTable));
document.getElementById("resetApptFiltersBtn")?.addEventListener("click", () => {
    const searchEl = document.getElementById("apptSearchInput");
    const typeEl = document.getElementById("apptTypeFilter");
    const statusEl = document.getElementById("apptStatusFilter");
    if (searchEl)
        searchEl.value = "";
    if (typeEl)
        typeEl.value = "";
    if (statusEl)
        statusEl.value = "";
    renderSorted("appointmentsTable", getFilteredAppointments(), renderAppointmentsTable);
});
// =========================================================================
// PRESCRIPTION MODAL (DUPLICATE MEDICINE PREVENTION & INLINE ERROR)
// =========================================================================
export let rxMedicineRowCounter = 0;
export function renderMedicineDatalist() {
    let dl = document.getElementById("pharmacyCatalogDatalist");
    if (!dl) {
        dl = document.createElement("datalist");
        dl.id = "pharmacyCatalogDatalist";
        document.body.appendChild(dl);
    }
    dl.innerHTML = pharmacyCatalog
        .map((med) => `<option value="${escapeHtml(`${med.name} (${med.genericName}) — ${med.form}`)}"></option>`)
        .join("");
}
export function formatCatalogMedLabel(med) {
    return `${med.name} (${med.genericName}) — ${med.form}`;
}
export function normalizeMedicineKey(rawVal) {
    const trimmed = String(rawVal ?? "").trim();
    if (!trimmed)
        return "";
    const matchedCatalog = pharmacyCatalog.find((m) => formatCatalogMedLabel(m).toLowerCase() === trimmed.toLowerCase() ||
        m.name.toLowerCase() === trimmed.toLowerCase() ||
        `${m.name} (${m.genericName})`.toLowerCase() === trimmed.toLowerCase());
    if (matchedCatalog) {
        return `med-${matchedCatalog.id}`;
    }
    return `custom-${trimmed.toLowerCase()}`;
}
export function setMedicineRowError(card, message) {
    const input = card.querySelector(".rx-med-input");
    const errEl = card.querySelector(".rx-med-error");
    const errText = card.querySelector(".rx-med-error-msg");
    if (message) {
        input?.classList.add("input-error");
        if (errText)
            errText.textContent = message;
        errEl?.classList.add("active");
    }
    else {
        input?.classList.remove("input-error");
        if (errText)
            errText.textContent = "";
        errEl?.classList.remove("active");
    }
}
export function validatePrescriptionForm() {
    let isValid = true;
    const diagInput = document.getElementById("rxDiagnosis");
    const diagErrEl = document.getElementById("rxDiagnosisError");
    if (diagInput) {
        if (!diagInput.value.trim()) {
            diagInput.classList.add("input-error");
            diagErrEl?.classList.add("active");
            isValid = false;
        }
        else {
            diagInput.classList.remove("input-error");
            diagErrEl?.classList.remove("active");
        }
    }
    const medCards = [...document.querySelectorAll("#rxMedicationsContainer .rx-med-card")];
    const seenMedKeys = new Map();
    medCards.forEach((card) => {
        const medInput = card.querySelector(".rx-med-input");
        const dosageInput = card.querySelector(".rx-med-dosage");
        const freqInput = card.querySelector(".rx-med-frequency");
        const durInput = card.querySelector(".rx-med-duration");
        const rawMed = medInput?.value.trim() ?? "";
        if (!rawMed) {
            setMedicineRowError(card, "Please select or enter a medicine.");
            isValid = false;
        }
        else {
            const medKey = normalizeMedicineKey(rawMed);
            if (seenMedKeys.has(medKey)) {
                setMedicineRowError(card, `"${rawMed}" is already added to this prescription. Choose a different medicine.`);
                isValid = false;
            }
            else {
                seenMedKeys.set(medKey, card);
                setMedicineRowError(card, "");
            }
        }
        [dosageInput, freqInput, durInput].forEach((ctrl) => {
            if (!ctrl)
                return;
            if (!ctrl.value.trim()) {
                ctrl.classList.add("input-error");
                isValid = false;
            }
            else {
                ctrl.classList.remove("input-error");
            }
        });
    });
    return isValid;
}
export function addPrescriptionMedicineRow(medData = {}) {
    rxMedicineRowCounter += 1;
    const container = document.getElementById("rxMedicationsContainer");
    if (!container)
        return;
    const rowIdx = container.children.length + 1;
    let initialMedText = medData.medicineName || "";
    if (!initialMedText && medData.medicineId) {
        const found = pharmacyCatalog.find((m) => m.id === Number(medData.medicineId));
        if (found)
            initialMedText = formatCatalogMedLabel(found);
    }
    const card = document.createElement("div");
    card.className = "rx-med-card";
    card.innerHTML = `
      <div class="rx-med-header">
        <span><i class="fa-solid fa-pills"></i> Medication #<span class="rx-med-num">${rowIdx}</span></span>
        <button type="button" class="btn btn-sm btn-danger remove-rx-med-btn" title="Remove medication">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group full-width">
          <label class="form-label req">Medicine (Type or select from formulary)</label>
          <input type="text" list="pharmacyCatalogDatalist" class="input rx-med-input" required
            value="${escapeHtml(initialMedText)}"
            placeholder="Type or pick medicine from formulary..." autocomplete="off" />
          <div class="field-error-text rx-med-error">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span class="rx-med-error-msg"></span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label req">Dosage</label>
          <input type="text" class="input rx-med-dosage" required
            value="${escapeHtml(medData.dosage || "")}"
            placeholder="e.g., 1 tablet / 500 mg / 5 ml" />
        </div>
        <div class="form-group">
          <label class="form-label req">Frequency</label>
          <input type="text" list="frequencyOptionsList" class="input rx-med-frequency" required
            value="${escapeHtml(medData.frequency || "")}"
            placeholder="Type or pick frequency (e.g., Twice daily BD)..." autocomplete="off" />
        </div>
        <div class="form-group">
          <label class="form-label req">Duration</label>
          <input type="text" class="input rx-med-duration" required
            value="${escapeHtml(medData.duration || "")}"
            placeholder="e.g., 7 days / 14 days / 1 month" />
        </div>
        <div class="form-group">
          <label class="form-label">Additional Instructions</label>
          <input type="text" class="input rx-med-instructions"
            value="${escapeHtml(medData.instructions || "")}"
            placeholder="e.g., After meals, Avoid alcohol" />
        </div>
      </div>
    `;
    const medInput = card.querySelector(".rx-med-input");
    medInput?.addEventListener("input", () => {
        setMedicineRowError(card, "");
    });
    card.querySelectorAll(".rx-med-dosage, .rx-med-frequency, .rx-med-duration").forEach((inp) => {
        inp.addEventListener("input", () => inp.classList.remove("input-error"));
    });
    card.querySelector(".remove-rx-med-btn")?.addEventListener("click", () => {
        if (container.children.length <= 1) {
            showToast("At least one prescribed medicine is required.", "error");
            return;
        }
        card.remove();
        renumberPrescriptionRows();
        validatePrescriptionForm();
    });
    container.appendChild(card);
}
export function renumberPrescriptionRows() {
    document.querySelectorAll("#rxMedicationsContainer .rx-med-num").forEach((el, idx) => {
        el.textContent = String(idx + 1);
    });
}
document.getElementById("addRxMedicineRowBtn")?.addEventListener("click", () => {
    addPrescriptionMedicineRow();
});
document.getElementById("rxDiagnosis")?.addEventListener("input", (e) => {
    const target = e.target;
    target.classList.remove("input-error");
    document.getElementById("rxDiagnosisError")?.classList.remove("active");
});
export function openPrescriptionModal(apptId) {
    const appt = appointments.find((a) => a.id === apptId);
    if (!appt || appt.status !== "Completed")
        return;
    const patient = patients.find((p) => p.id === appt.patientId);
    const apptIdInput = document.getElementById("rxAppointmentId");
    const modalTitle = document.getElementById("prescriptionModalTitle");
    const diagInput = document.getElementById("rxDiagnosis");
    const notesInput = document.getElementById("rxAdditionalNotes");
    const contextEl = document.getElementById("rxPatientContext");
    const saveBtn = document.getElementById("savePrescriptionBtn");
    const container = document.getElementById("rxMedicationsContainer");
    if (apptIdInput)
        apptIdInput.value = String(appt.id);
    if (modalTitle) {
        modalTitle.textContent = appt.prescription
            ? `Edit Prescription — ${appt.patientName}`
            : `Add Prescription — ${appt.patientName}`;
    }
    diagInput?.classList.remove("input-error");
    document.getElementById("rxDiagnosisError")?.classList.remove("active");
    if (contextEl) {
        contextEl.innerHTML = `
          <div>
            <strong>Patient:</strong> ${escapeHtml(appt.patientName)}
            ${patient ? `(${patient.age} yrs, ${escapeHtml(patient.gender)}, Blood Group: <strong>${escapeHtml(patient.bloodGroup)}</strong>)` : ""}
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">
              <strong>Visit Reason:</strong> ${escapeHtml(appt.reason)}
              ${patient && patient.allergies ? ` • <strong>Allergies:</strong> <span style="color:var(--danger);font-weight:600;">${escapeHtml(patient.allergies)}</span>` : ""}
            </div>
          </div>
          <span class="badge badge-teal">${escapeHtml(formatReadableDate(appt.date))} • ${escapeHtml(formatTime12h(appt.time))}</span>
        `;
    }
    if (!container)
        return;
    container.innerHTML = "";
    if (appt.prescription) {
        if (diagInput)
            diagInput.value = appt.prescription.diagnosis || "";
        if (notesInput)
            notesInput.value = appt.prescription.notes || "";
        (appt.prescription.medications || []).forEach((m) => addPrescriptionMedicineRow(m));
        if (saveBtn)
            saveBtn.innerHTML = `<i class="fa-solid fa-check"></i> Update Prescription`;
    }
    else {
        if (diagInput)
            diagInput.value = "";
        if (notesInput)
            notesInput.value = "";
        addPrescriptionMedicineRow();
        if (saveBtn)
            saveBtn.innerHTML = `<i class="fa-solid fa-file-prescription"></i> Issue Prescription`;
    }
    openModal("prescriptionModal");
}
document.getElementById("prescriptionForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validatePrescriptionForm()) {
        return;
    }
    const apptId = Number(document.getElementById("rxAppointmentId")?.value);
    const appt = appointments.find((a) => a.id === apptId);
    if (!appt)
        return;
    const diagnosis = document.getElementById("rxDiagnosis")?.value.trim() ?? "";
    const notes = document.getElementById("rxAdditionalNotes")?.value.trim() ??
        "";
    const medCards = [...document.querySelectorAll("#rxMedicationsContainer .rx-med-card")];
    const prescribedMeds = medCards.map((card) => {
        const medRaw = card.querySelector(".rx-med-input")?.value.trim() ?? "";
        const matchedCatalog = pharmacyCatalog.find((m) => formatCatalogMedLabel(m).toLowerCase() === medRaw.toLowerCase() ||
            m.name.toLowerCase() === medRaw.toLowerCase());
        return {
            medicineId: matchedCatalog ? matchedCatalog.id : null,
            medicineName: matchedCatalog ? `${matchedCatalog.name} (${matchedCatalog.genericName})` : medRaw,
            dosage: card.querySelector(".rx-med-dosage")?.value.trim() ?? "",
            frequency: card.querySelector(".rx-med-frequency")?.value.trim() ?? "",
            duration: card.querySelector(".rx-med-duration")?.value.trim() ?? "",
            instructions: card.querySelector(".rx-med-instructions")?.value.trim() ?? ""
        };
    });
    const isUpdate = Boolean(appt.prescription);
    appt.prescription = {
        issuedAt: `${TODAY_ISO} ${new Date().toTimeString().slice(0, 5)}`,
        diagnosis,
        notes,
        medications: prescribedMeds
    };
    closeModal("prescriptionModal");
    syncAllAppointmentViews();
    renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable);
    addNotification(`${isUpdate ? "Updated" : "Issued"} prescription for ${appt.patientName} (Diagnosis: ${diagnosis}).`);
    showToast(`Prescription ${isUpdate ? "updated" : "issued"} for ${appt.patientName}.`);
});
// =========================================================================
// SECTION 4: MY PATIENTS (ONLY >= 1 COMPLETED APPOINTMENT; SORTABLE EXCEPT ACTIONS)
// =========================================================================
export function getFilteredPatients() {
    const query = document.getElementById("patientSearchInput")?.value.trim().toLowerCase() ?? "";
    const bloodFilter = document.getElementById("patientBloodFilter")?.value
        .trim()
        .toLowerCase() ?? "";
    const genderFilter = document.getElementById("patientGenderFilter")?.value
        .trim()
        .toLowerCase() ?? "";
    return getCompletedEligiblePatients().filter((p) => {
        const matchesQuery = !query ||
            p.fullName.toLowerCase().includes(query) ||
            p.phone.toLowerCase().includes(query) ||
            (p.chronicCondition || "").toLowerCase().includes(query);
        const matchesBlood = !bloodFilter || p.bloodGroup.toLowerCase() === bloodFilter || p.bloodGroup.toLowerCase().includes(bloodFilter);
        const matchesGender = !genderFilter || p.gender.toLowerCase() === genderFilter || p.gender.toLowerCase().includes(genderFilter);
        return matchesQuery && matchesBlood && matchesGender;
    });
}
export function renderPatientsTable(list = getFilteredPatients()) {
    const tbody = document.getElementById("patientsTableBody");
    if (!tbody)
        return;
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);">No patients with completed appointments found.</td></tr>`;
        return;
    }
    tbody.innerHTML = list
        .map((p) => {
        const completedApptsCount = appointments.filter((a) => a.patientId === p.id && a.status === "Completed").length;
        const rxCount = appointments.filter((a) => a.patientId === p.id && Boolean(a.prescription)).length;
        return `
              <tr class="clickable-row" data-patient-id="${p.id}" title="Click to view clinical history & prescriptions">
                <td>
                  <strong>${escapeHtml(p.fullName)}</strong><br/>
                  <span style="font-size:0.78rem;color:var(--text-muted);">${escapeHtml(p.email)}</span>
                </td>
                <td>${Number(p.age)} yrs</td>
                <td>${escapeHtml(p.gender)}</td>
                <td>${escapeHtml(p.phone)}</td>
                <td><span class="badge badge-danger"><i class="fa-solid fa-droplet"></i> ${escapeHtml(p.bloodGroup)}</span></td>
                <td>
                  <div style="font-weight:600;">${escapeHtml(p.chronicCondition || "None")}</div>
                  <div style="font-size:0.78rem;color:var(--text-muted);">Allergies: ${escapeHtml(p.allergies || "None known")}</div>
                </td>
                <td>
                  ${escapeHtml(formatReadableDate(p.lastVisit))}<br/>
                  <span class="badge badge-success" style="margin-top:2px;">${completedApptsCount} Completed</span>
                </td>
                <td onclick="event.stopPropagation();">
                  <button type="button" class="btn btn-sm btn-outline" onclick="openPatientRecordModal(${p.id})">
                    <i class="fa-solid fa-folder-open"></i> History (${rxCount} Rx)
                  </button>
                </td>
              </tr>`;
    })
        .join("");
    tbody.querySelectorAll("tr.clickable-row").forEach((tr) => {
        tr.addEventListener("click", () => {
            openPatientRecordModal(Number(tr.dataset.patientId));
        });
    });
}
export function openPatientRecordModal(patientId) {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient)
        return;
    const patientAppts = appointments.filter((a) => a.patientId === patientId);
    const rxAppts = patientAppts.filter((a) => Boolean(a.prescription));
    const titleEl = document.getElementById("patientRecordModalTitle");
    const bodyEl = document.getElementById("patientRecordModalBody");
    if (titleEl)
        titleEl.textContent = `Clinical Record — ${patient.fullName}`;
    const rxHtml = rxAppts.length
        ? rxAppts
            .map((a) => `
                  <div class="rx-med-card">
                    <div class="rx-med-header">
                      <span><i class="fa-solid fa-file-prescription"></i> Issued: ${escapeHtml(a.prescription.issuedAt)}</span>
                      <span class="badge badge-success">Diagnosis: ${escapeHtml(a.prescription.diagnosis)}</span>
                    </div>
                    ${a.prescription.notes
            ? `<p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:8px;"><strong>Doctor's Advice:</strong> ${escapeHtml(a.prescription.notes)}</p>`
            : ""}
                    <div style="display:grid;gap:6px;">
                      ${a.prescription.medications
            .map((m) => `
                              <div style="padding:7px 10px;background:var(--bg-subtle);border-radius:6px;font-size:0.84rem;">
                                <strong>${escapeHtml(m.medicineName)}</strong> — ${escapeHtml(m.dosage)} • ${escapeHtml(m.frequency)} for <strong>${escapeHtml(m.duration)}</strong>
                                ${m.instructions ? `<span style="color:var(--teal-800);"> (${escapeHtml(m.instructions)})</span>` : ""}
                              </div>`)
            .join("")}
                    </div>
                  </div>`)
            .join("")
        : `<p style="color:var(--text-muted);font-size:0.88rem;">No prescriptions written for this patient yet.</p>`;
    if (bodyEl) {
        bodyEl.innerHTML = `
          <div class="patient-detail-grid">
            <div class="detail-tile">
              <div class="detail-tile-label">Age &amp; Gender</div>
              <div class="detail-tile-value">${patient.age} yrs • ${escapeHtml(patient.gender)}</div>
            </div>
            <div class="detail-tile">
              <div class="detail-tile-label">Blood Group</div>
              <div class="detail-tile-value" style="color:var(--danger);">${escapeHtml(patient.bloodGroup)}</div>
            </div>
            <div class="detail-tile">
              <div class="detail-tile-label">Phone Number</div>
              <div class="detail-tile-value">${escapeHtml(patient.phone)}</div>
            </div>
            <div class="detail-tile">
              <div class="detail-tile-label">Known Allergies</div>
              <div class="detail-tile-value">${escapeHtml(patient.allergies || "None known")}</div>
            </div>
            <div class="detail-tile" style="grid-column: 1 / -1;">
              <div class="detail-tile-label">Primary Condition &amp; Emergency Contact</div>
              <div class="detail-tile-value">${escapeHtml(patient.chronicCondition || "None")} • Emergency: ${escapeHtml(patient.emergencyContact || "N/A")}</div>
            </div>
          </div>

          <div class="profile-section">
            <div class="profile-section-title">
              <span><i class="fa-solid fa-prescription"></i> Prescription History (${rxAppts.length})</span>
            </div>
            ${rxHtml}
          </div>
        `;
    }
    openModal("patientRecordModal");
}
document.getElementById("patientSearchInput")?.addEventListener("input", () => renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable));
document.getElementById("patientBloodFilter")?.addEventListener("input", () => renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable));
document.getElementById("patientGenderFilter")?.addEventListener("input", () => renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable));
document.getElementById("resetPatientFiltersBtn")?.addEventListener("click", () => {
    const searchEl = document.getElementById("patientSearchInput");
    const bloodEl = document.getElementById("patientBloodFilter");
    const genderEl = document.getElementById("patientGenderFilter");
    if (searchEl)
        searchEl.value = "";
    if (bloodEl)
        bloodEl.value = "";
    if (genderEl)
        genderEl.value = "";
    renderSorted("patientsTable", getFilteredPatients(), renderPatientsTable);
});
// =========================================================================
// SECTION 5: NOTIFICATIONS (REAL-TIME RELATIVE TIMESTAMPS & FILTERS)
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
        message: "Are you sure you want to delete all clinical notifications?",
        subtext: `All ${notifications.length} notification(s) will be permanently cleared.`,
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
window.confirmAppointment = confirmAppointment;
window.promptCancelAppointment = promptCancelAppointment;
window.completeAppointment = completeAppointment;
window.openPrescriptionModal = openPrescriptionModal;
window.openPatientRecordModal = openPatientRecordModal;
window.markNotificationRead = markNotificationRead;
window.deleteNotification = deleteNotification;
// =========================================================================
// INITIALIZATION
// =========================================================================
export function initDoctorDashboard() {
    renderMedicineDatalist();
    refreshTopbarProfile();
    renderDashboard();
    renderOpdQueueSection();
    renderAppointmentsTable();
    renderPatientsTable();
    renderNotifications();
    attachTableSorting("appointmentsTable", getFilteredAppointments, renderAppointmentsTable);
    attachTableSorting("patientsTable", getFilteredPatients, renderPatientsTable);
}
initDoctorDashboard();
