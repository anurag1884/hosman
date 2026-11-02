const tabs = [...document.querySelectorAll(".tab")];
const sections = [...document.querySelectorAll(".form-section")];

async function sendRequest(url, request) {
    const response = await fetch(url, request);
    if (!response.ok) return null;
    return await response.json();
}

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

  const loginResponse = await sendRequest("/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });

  if (loginResponse) {
    if (loginResponse.success) {
      messageElement.textContent = "";
      window.location.href = "/dashboard";
    } else messageElement.textContent = loginResponse.message;
  } else messageElement.textContent = "Server request failed";
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
      const registerResponse = await sendRequest("/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: formData.get("username"),
          password: password,
        }),
      });

      if (registerResponse) {
        if (registerResponse.success) {
          messageElement.textContent = "";
          showSection("login");
        } else messageElement.textContent = registerResponse.message;
      } else messageElement.textContent = "Server request failed";
    } else
      messageElement.textContent = "Passwords do not match. Please recheck and try again...";
  });

// document.getElementById("forgot-link").addEventListener("click", (event) => {
//   event.preventDefault();
//   document.getElementById("login-message").textContent =
//     "Password reset flow can be connected here.";
// });
