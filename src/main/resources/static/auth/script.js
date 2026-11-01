const tabs = [...document.querySelectorAll(".tab")];
const sections = [...document.querySelectorAll(".form-section")];

function showSection(name) {
  tabs.forEach((tab) => {
    const active = tab.id === `${name}-tab`;
    tab.setAttribute("aria-selected", String(active));
  });
  sections.forEach((section) =>
    section.classList.toggle("active", section.id === `${name}-section`),
  );
  document.getElementById(`${name}-username`).focus({ preventScroll: true });
}

tabs.forEach((tab) =>
  tab.addEventListener("click", () => showSection(tab.id.replace("-tab", ""))),
);

document.querySelectorAll("[data-switch]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(link.dataset.switch);
  });
});

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.toggle);
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.textContent = visible ? "Hide" : "Show";
  });
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const messageElement = document.getElementById("login-message");

  const formData = new FormData(e.currentTarget);

  const response = await fetch("/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });

  if (!response.ok) return;

  const data = await response.json();

  if (data.success) {
    messageElement.textContent = "";
    window.location.href = "/dashboard";
  } else messageElement.textContent = data.message;

  //   messageElement.textContent =
  //     "Demo form submitted. Connect this form to your authentication backend.";
});

document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const messageElement = document.getElementById("register-message");

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password"),
      confirmPassword = formData.get("confirmPassword");

    if (password === confirmPassword) {
      let response = await fetch("/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: formData.get("username"),
          password: password,
        }),
      });

      if (!response.ok) return;

      let data = await response.json();

      if (data.success) {
        messageElement.textContent = "";
        showSection("login");
      } else messageElement.textContent = data.message;
    } else
      messageElement.textContent = "Passwords do not match. Please recheck and try again...";
    //   const username = document.getElementById("register-username").value;
    //   const password = document.getElementById("register-password").value;
    //   const confirmPassword = document.getElementById("confirm-password").value;
    //   if (password !== confirmPassword) {
    //     setMessage(true, "Passwords do not match.");
    //     document.getElementById("confirm-password").focus();
    //     return;
    //   }

    //   messageElement.style.color = "#31805c";
    //   messageElement.textContent =
    //     "Demo registration submitted. Connect this form to your account backend.";
  });

// document.getElementById("forgot-link").addEventListener("click", (event) => {
//   event.preventDefault();
//   document.getElementById("login-message").textContent =
//     "Password reset flow can be connected here.";
// });
