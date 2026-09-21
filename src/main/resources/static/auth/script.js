const loginFormError = document.getElementById("login-form-error-id"),
  registerFormError = document.getElementById("register-form-error-id"),
  loginForm = document.getElementById("login-form-id"),
  registerForm = document.getElementById("register-form-id"),
  loginSection = document.getElementById("login-section-id"),
  registerSection = document.getElementById("register-section-id");

function showRegister() {
  registerForm.reset();
  registerFormError.textContent = "";
  loginSection.style.display = "none";
  registerSection.style.display = "block";
}

function showLogin() {
  loginForm.reset();
  loginFormError.textContent = "";
  registerSection.style.display = "none";
  loginSection.style.display = "block";
}

async function loginUser(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const username = formData.get("username");

  const response = await fetch("/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: username,
      password: formData.get("password"),
    }),
  });

  if (!response.ok) return;

  const data = await response.json();

  if (data.success) {
    loginFormError.textContent = "";
    window.location.href = "/dashboard";
  } else loginFormError.textContent = data.message;
}

async function registerUser(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const username = formData.get("username"),
    password = formData.get("password"),
    confirmPassword = formData.get("confirmPassword");

  if (password === confirmPassword) {
    const response = await fetch("/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
        firstName: formData.get("firstName"),
        middleName: formData.get("middleName"),
        lastName: formData.get("lastName"),
        bloodGroup: formData.get("bloodGroup"),
        dateOfBirth: formData.get("dateOfBirth"),
        gender: formData.get("gender"),
        phoneNumber: formData.get("phoneNumber"),
      }),
    });

    if (!response.ok) return;

    const data = await response.json();

    if (data.success) {
      registerFormError.textContent = "";
      showLogin();
    } else registerFormError.textContent = data.message;
  } else
    registerFormError.textContent =
      "Passwords do not match. Please recheck and try again...";
}
