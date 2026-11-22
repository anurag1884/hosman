
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

/* ---------- 1. Element references ---------- */
const authCard = document.getElementById("authCard");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

/* ---------- 2. View switching & optional safety block ---------- */
function showView(view) {
  authCard.dataset.view = view;

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
  el.addEventListener("click", () => showView(el.dataset.switchView));
});

const toggleSafetyBtn = document.getElementById("toggleSafetyInfo");
const safetySection = document.getElementById("safetyInfoSection");
const toggleSafetyIcon = document.getElementById("toggleSafetyIcon");

toggleSafetyBtn.addEventListener("click", () => {
  const expanded = toggleSafetyBtn.getAttribute("aria-expanded") === "true";
  toggleSafetyBtn.setAttribute("aria-expanded", String(!expanded));
  safetySection.hidden = expanded;
  toggleSafetyIcon.textContent = expanded ? "+" : "−";
});

/* ---------- 3. Editable Custom Select ---------- */
function initCustomSelects() {
  const selects = document.querySelectorAll(".custom-select");

  const closeAll = (except = null) => {
    selects.forEach((sel) => {
      if (sel !== except) sel.classList.remove("is-open");
    });
  };

  selects.forEach((wrapper) => {
    const input = wrapper.querySelector(".custom-select__input");
    const toggleBtn = wrapper.querySelector(".custom-select__toggle");
    const menu = wrapper.querySelector(".custom-select__menu");
    const options = wrapper.dataset.options.split(",").map((s) => s.trim());
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
        if (opt.toLowerCase() === currentVal) li.classList.add("is-selected");

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
      if (!wrapper.classList.contains("is-open")) wrapper.classList.add("is-open");
      updateDirection();
    });

    toggleBtn.addEventListener("click", () => {
      if (wrapper.classList.contains("is-open")) {
        wrapper.classList.remove("is-open");
      } else {
        input.focus();
        openMenu(true);
      }
    });

    input.addEventListener("keydown", (e) => {
      const items = menu.querySelectorAll(".custom-select__option");
      if (!items.length) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!wrapper.classList.contains("is-open")) openMenu(true);
        activeIndex = e.key === "ArrowDown"
          ? (activeIndex + 1) % items.length
          : (activeIndex - 1 + items.length) % items.length;
        items.forEach((el, idx) => el.classList.toggle("is-highlighted", idx === activeIndex));
        items[activeIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && wrapper.classList.contains("is-open") && activeIndex >= 0) {
        e.preventDefault();
        items[activeIndex].dispatchEvent(new Event("mousedown"));
      } else if (e.key === "Escape") {
        wrapper.classList.remove("is-open");
      }
    });

    window.addEventListener("resize", () => {
      if (wrapper.classList.contains("is-open")) updateDirection();
    }, { passive: true });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) closeAll();
  });
}

/* ---------- 4. Password visibility toggle & Caps Lock warning ---------- */
function togglePasswordVisibility(button) {
  const input = button.parentElement.querySelector("input");
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
  const warningEl = input.closest(".field").querySelector("[data-caps-warning]");
  if (!warningEl) return;

  const syncCaps = (e) => {
    if (typeof e.getModifierState === "function") {
      warningEl.hidden = !e.getModifierState("CapsLock");
    }
  };

  input.addEventListener("keydown", syncCaps);
  input.addEventListener("keyup", syncCaps);
  input.addEventListener("blur", () => { warningEl.hidden = true; });
});

/* ---------- 5. Validation, submit lock & backend request helpers ---------- */
function setMessage(form, text, isSuccess = false) {
  const messageEl = form.querySelector(".form-message");
  messageEl.textContent = text;
  messageEl.classList.toggle("is-success", isSuccess);
}

function setSubmitting(form, isSubmitting) {
  const btn = form.querySelector('button[type="submit"]');
  const labelSpan = btn.querySelector("span");
  btn.disabled = isSubmitting;
  if (labelSpan) {
    labelSpan.textContent = isSubmitting
      ? (btn.dataset.loadingLabel || "Submitting...")
      : (btn.dataset.defaultLabel || "Submit");
  }
}

function checkPasswordsMatch() {
  const password = registerForm.elements.password;
  const confirm = registerForm.elements.confirmPassword;
  const mismatch = confirm.value !== "" && password.value !== confirm.value;

  confirm.setCustomValidity(mismatch ? "Passwords do not match." : "");
}

function validateForm(form) {
  form.classList.add("was-validated");

  if (form.checkValidity()) {
    setMessage(form, "");
    return true;
  }

  const firstInvalid = form.querySelector(":invalid");
  setMessage(form, firstInvalid.validationMessage || "Please fill in all required fields.");
  firstInvalid.focus();
  return false;
}

// [BACKEND HOOK] Centralized JSON API dispatcher
async function sendRequest(url, request) {
  const response = await fetch(url, request);
  if (!response.ok) return null;
  return await response.json();
}

registerForm.elements.password.addEventListener("input", checkPasswordsMatch);
registerForm.elements.confirmPassword.addEventListener("input", checkPasswordsMatch);

/* ---------- 6. Form submit handlers ---------- */
// [BACKEND HOOK] POST /login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateForm(loginForm)) return;

  setSubmitting(loginForm, true);
  try {
    const loginResponse = await sendRequest("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(loginForm))),
    });

    if (loginResponse) {
      if (loginResponse.success) {
        setMessage(loginForm, "");
        window.location.href = "/dashboard";
      } else {
        setMessage(loginForm, loginResponse.message, false);
        setSubmitting(loginForm, false);
      }
    } else {
      setMessage(loginForm, "Server request failed", false);
      setSubmitting(loginForm, false);
    }
  } catch {
    setMessage(loginForm, "Network error. Please try again.", false);
    setSubmitting(loginForm, false);
  }
});

// [BACKEND HOOK] POST /register
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  checkPasswordsMatch();
  if (!validateForm(registerForm)) return;

  const details = Object.fromEntries(new FormData(registerForm));
  details.gender = details.gender.trim().toUpperCase();
  switch (details.bloodGroup.trim().toUpperCase()) {
    case "AB+":
      details.bloodGroup = "AB_POS";
      break;
    case "AB-":
      details.bloodGroup = "AB_NEG";
      break;
    case "A+":
      details.bloodGroup = "A_POS";
      break;
    case "A-":
      details.bloodGroup = "A_NEG";
      break;
    case "B+":
      details.bloodGroup = "B_POS";
      break;
    case "B-":
      details.bloodGroup = "B_NEG";
      break;
    case "O+":
      details.bloodGroup = "O_POS";
      break;
    case "O-":
      details.bloodGroup = "O_NEG";
      break;
  }

  // Keep optional safety fields clean if left blank
  if (!details.emergencyContactName?.trim()) delete details.emergencyContactName;
  if (!details.emergencyContactRelation?.trim()) delete details.emergencyContactRelation;
  else details.emergencyContactRelation = details.emergencyContactRelation.toUpperCase();
  if (!details.emergencyContactPhone?.trim()) delete details.emergencyContactPhone;
  if (!details.allergies?.trim()) delete details.allergies;

  const regReq = {
    username: details.username,
    password: details.password,
    details: details
  };
  delete details.username;
  delete details.password;
  delete details.confirmPassword;

  console.log(regReq);

  setSubmitting(registerForm, true);
  try {
    const registerResponse = await sendRequest("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regReq),
    });

    if (registerResponse) {
      if (registerResponse.success) {
        setMessage(loginForm, "Account created! Please sign in.", true);
        registerForm.reset();
        registerForm.classList.remove("was-validated");
        safetySection.hidden = true;
        toggleSafetyBtn.setAttribute("aria-expanded", "false");
        toggleSafetyIcon.textContent = "+";
        showView("login");
      } else {
        setMessage(registerForm, registerResponse.message, false);
      }
    } else {
      setMessage(registerForm, "Server request failed", false);
    }
  } catch {
    setMessage(registerForm, "Network error. Please try again.", false);
  } finally {
    setSubmitting(registerForm, false);
  }
});

/* ---------- 7. Init ---------- */
function limitDateOfBirth() {
  const today = new Date().toISOString().split("T")[0];
  registerForm.elements.dob.max = today;
}

limitDateOfBirth();
initCustomSelects();
showView("login");