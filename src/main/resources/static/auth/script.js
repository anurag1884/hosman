/* ==========================================================
   HMS Login & Register - Behaviour
   Sections:
     1. Element references
     2. View switching & optional safety block
     3. Editable custom select (viewport-aware positioning)
     4. Password visibility toggle & Caps Lock warning
     5. Validation, submit lock & backend request helpers
     6. Form submit handlers
     7. Init
   ========================================================== */
import { normalizeBloodGroup, normalizeEmergencyContactRelation, normalizeGender, sendRequest } from "../common/script.js";
/* ---------- Element references ---------- */
export const authCard = document.getElementById("authCard");
export const loginForm = document.getElementById("loginForm");
export const registerForm = document.getElementById("registerForm");
export const tabs = document.querySelectorAll(".tab");
export const panels = document.querySelectorAll(".panel");
/* ---------- View switching & optional safety block ---------- */
export function showView(view) {
    if (authCard) {
        authCard.dataset.view = view;
    }
    panels.forEach((panel) => {
        panel.hidden = panel.id !== `panel-${view}`;
    });
    tabs.forEach((tab) => {
        const isActive = tab.dataset.switchView === view;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });
}
document.querySelectorAll("[data-switch-view]").forEach((el) => {
    el.addEventListener("click", () => {
        const view = el.dataset.switchView;
        if (view === "login" || view === "register") {
            showView(view);
        }
    });
});
export const toggleSafetyBtn = document.getElementById("toggleSafetyInfo");
export const safetySection = document.getElementById("safetyInfoSection");
export const toggleSafetyIcon = document.getElementById("toggleSafetyIcon");
toggleSafetyBtn?.addEventListener("click", () => {
    if (!safetySection)
        return;
    const expanded = toggleSafetyBtn.getAttribute("aria-expanded") === "true";
    toggleSafetyBtn.setAttribute("aria-expanded", String(!expanded));
    safetySection.hidden = expanded;
    if (toggleSafetyIcon) {
        toggleSafetyIcon.textContent = expanded ? "+" : "−";
    }
});
/* ---------- Editable Custom Select ---------- */
export function initCustomSelects() {
    const selects = document.querySelectorAll(".custom-select");
    const closeAll = (except = null) => {
        selects.forEach((sel) => {
            if (sel !== except)
                sel.classList.remove("is-open");
        });
    };
    selects.forEach((wrapper) => {
        const input = wrapper.querySelector(".custom-select__input");
        const toggleBtn = wrapper.querySelector(".custom-select__toggle");
        const menu = wrapper.querySelector(".custom-select__menu");
        if (!input || !menu)
            return;
        const options = (wrapper.dataset.options ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        let activeIndex = -1;
        const updateDirection = () => {
            const rect = input.getBoundingClientRect();
            const menuHeight = Math.min(menu.scrollHeight || 200, 210);
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            wrapper.classList.toggle("open-upward", spaceBelow < menuHeight && spaceAbove > spaceBelow);
        };
        const renderOptions = (filterText = "") => {
            const query = filterText.trim().toLowerCase();
            const currentVal = input.value.trim().toLowerCase();
            const filtered = query
                ? options.filter((opt) => opt.toLowerCase().includes(query))
                : options;
            menu.innerHTML = "";
            activeIndex = -1;
            if (!filtered.length) {
                const empty = document.createElement("li");
                empty.className = "custom-select__empty";
                empty.textContent = `Custom value: "${input.value.trim()}"`;
                menu.appendChild(empty);
                return;
            }
            filtered.forEach((opt) => {
                const li = document.createElement("li");
                li.className = "custom-select__option";
                li.setAttribute("role", "option");
                li.textContent = opt;
                if (opt.toLowerCase() === currentVal)
                    li.classList.add("is-selected");
                li.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    input.value = opt;
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    wrapper.classList.remove("is-open");
                });
                menu.appendChild(li);
            });
        };
        const openMenu = (showAll = false) => {
            closeAll(wrapper);
            renderOptions(showAll ? "" : input.value);
            wrapper.classList.add("is-open");
            updateDirection();
        };
        input.addEventListener("focus", () => openMenu(true));
        input.addEventListener("input", () => {
            renderOptions(input.value);
            if (!wrapper.classList.contains("is-open"))
                wrapper.classList.add("is-open");
            updateDirection();
        });
        toggleBtn?.addEventListener("click", () => {
            if (wrapper.classList.contains("is-open")) {
                wrapper.classList.remove("is-open");
            }
            else {
                input.focus();
                openMenu(true);
            }
        });
        input.addEventListener("keydown", (e) => {
            const items = menu.querySelectorAll(".custom-select__option");
            if (!items.length)
                return;
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                if (!wrapper.classList.contains("is-open"))
                    openMenu(true);
                activeIndex =
                    e.key === "ArrowDown"
                        ? (activeIndex + 1) % items.length
                        : (activeIndex - 1 + items.length) % items.length;
                items.forEach((el, idx) => el.classList.toggle("is-highlighted", idx === activeIndex));
                items[activeIndex].scrollIntoView({ block: "nearest" });
            }
            else if (e.key === "Enter" && wrapper.classList.contains("is-open") && activeIndex >= 0) {
                e.preventDefault();
                items[activeIndex].dispatchEvent(new Event("mousedown"));
            }
            else if (e.key === "Escape") {
                wrapper.classList.remove("is-open");
            }
        });
        window.addEventListener("resize", () => {
            if (wrapper.classList.contains("is-open"))
                updateDirection();
        }, { passive: true });
    });
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!target?.closest(".custom-select"))
            closeAll();
    });
}
/* ---------- Password visibility toggle & Caps Lock warning ---------- */
export function togglePasswordVisibility(button) {
    const input = button.parentElement?.querySelector("input");
    if (!input)
        return;
    const willShow = input.type === "password";
    input.type = willShow ? "text" : "password";
    button.classList.toggle("is-visible", willShow);
    button.setAttribute("aria-pressed", String(willShow));
    button.setAttribute("aria-label", willShow ? "Hide password" : "Show password");
}
document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => togglePasswordVisibility(button));
});
document.querySelectorAll(".password-field input").forEach((input) => {
    const warningEl = input.closest(".field")?.querySelector("[data-caps-warning]");
    if (!warningEl)
        return;
    const syncCaps = (e) => {
        if (typeof e.getModifierState === "function") {
            warningEl.hidden = !e.getModifierState("CapsLock");
        }
    };
    input.addEventListener("keydown", syncCaps);
    input.addEventListener("keyup", syncCaps);
    input.addEventListener("blur", () => {
        warningEl.hidden = true;
    });
});
/* ---------- Validation, submit lock & backend request helpers ---------- */
export function setMessage(form, text, isSuccess = false) {
    const messageEl = form.querySelector(".form-message");
    if (!messageEl)
        return;
    messageEl.textContent = text;
    messageEl.classList.toggle("is-success", isSuccess);
}
export function setSubmitting(form, isSubmitting) {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn)
        return;
    const labelSpan = btn.querySelector("span");
    btn.disabled = isSubmitting;
    if (labelSpan) {
        labelSpan.textContent = isSubmitting
            ? btn.dataset.loadingLabel || "Submitting..."
            : btn.dataset.defaultLabel || "Submit";
    }
}
export function checkPasswordsMatch() {
    if (!registerForm)
        return;
    const password = registerForm.elements.namedItem("password");
    const confirm = registerForm.elements.namedItem("confirmPassword");
    if (!password || !confirm)
        return;
    const mismatch = confirm.value !== "" && password.value !== confirm.value;
    confirm.setCustomValidity(mismatch ? "Passwords do not match." : "");
}
export function validateForm(form) {
    form.classList.add("was-validated");
    if (form.checkValidity()) {
        setMessage(form, "");
        return true;
    }
    const firstInvalid = form.querySelector(":invalid");
    setMessage(form, firstInvalid?.validationMessage || "Please fill in all required fields.");
    firstInvalid?.focus();
    return false;
}
if (registerForm) {
    const passwordInput = registerForm.elements.namedItem("password");
    const confirmInput = registerForm.elements.namedItem("confirmPassword");
    passwordInput?.addEventListener("input", checkPasswordsMatch);
    confirmInput?.addEventListener("input", checkPasswordsMatch);
}
/* ---------- Form submit handlers ---------- */
// [BACKEND HOOK] POST /login
loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm(loginForm))
        return;
    setSubmitting(loginForm, true);
    try {
        const loginResponse = await sendRequest("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(new FormData(loginForm))),
        });
        if (!loginResponse) {
            setMessage(loginForm, "Server request failed", false);
            setSubmitting(loginForm, false);
            return;
        }
        if (!loginResponse.ok) {
            setMessage(loginForm, (await loginResponse.json()).message, false);
            setSubmitting(loginForm, false);
            return;
        }
        setMessage(loginForm, "");
        window.location.href = "/dashboard";
    }
    catch {
        setMessage(loginForm, "Network error. Please try again.", false);
        setSubmitting(loginForm, false);
    }
});
// [BACKEND HOOK] POST /register
registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    checkPasswordsMatch();
    if (!validateForm(registerForm))
        return;
    const details = Object.fromEntries(new FormData(registerForm));
    details.gender = normalizeGender(details.gender ?? "");
    details.bloodGroup = normalizeBloodGroup(details.bloodGroup ?? "");
    // Keep optional safety fields clean if left blank
    if (!details.emergencyContactName?.trim()) {
        delete details.emergencyContactName;
    }
    if (details.emergencyContactRelation?.trim()) {
        details.emergencyContactRelation = normalizeEmergencyContactRelation(details.emergencyContactRelation ?? "");
    }
    else {
        delete details.emergencyContactRelation;
    }
    if (!details.emergencyContactPhone?.trim()) {
        delete details.emergencyContactPhone;
    }
    if (!details.allergies?.trim()) {
        delete details.allergies;
    }
    const regReq = {
        username: details.username ?? "",
        password: details.password ?? "",
        details,
    };
    delete details.username;
    delete details.password;
    delete details.confirmPassword;
    setSubmitting(registerForm, true);
    try {
        const registerResponse = await sendRequest("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(regReq),
        });
        if (!registerResponse) {
            setMessage(registerForm, "Server request failed", false);
            setSubmitting(registerForm, false);
            return;
        }
        if (!registerResponse.ok) {
            setMessage(registerForm, (await registerResponse.json()).message, false);
            setSubmitting(registerForm, false);
            return;
        }
        if (loginForm) {
            setMessage(loginForm, "Account created! Please sign in.", true);
        }
        registerForm.reset();
        registerForm.classList.remove("was-validated");
        if (safetySection)
            safetySection.hidden = true;
        toggleSafetyBtn?.setAttribute("aria-expanded", "false");
        if (toggleSafetyIcon)
            toggleSafetyIcon.textContent = "+";
        showView("login");
    }
    catch {
        setMessage(registerForm, "Network error. Please try again.", false);
    }
    finally {
        setSubmitting(registerForm, false);
    }
});
/* ---------- Init ---------- */
export function limitDateOfBirth() {
    const dobInput = registerForm?.elements.namedItem("dob");
    if (!dobInput)
        return;
    const today = new Date().toISOString().split("T")[0];
    dobInput.max = today;
}
limitDateOfBirth();
initCustomSelects();
showView("login");
