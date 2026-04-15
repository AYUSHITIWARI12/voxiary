const API =
  window.location.hostname.includes("ngrok")
    ? "https://clustered-uncompromised-pearl.ngrok-free.dev"
    : "http://127.0.0.1:8000";


function emailInput() {
  return document.getElementById("email").value.trim();
}

function passwordInput() {
  return document.getElementById("password").value.trim();
}

async function signup() {
  const email = emailInput();
  const password = passwordInput();
  const confirmPassword = document.getElementById("confirmPassword").value;

  // if (password !== confirmPassword) {
  //   alert("Passwords do not match");
  //   return;
  // }
if (!email || !password) {
  alert("Email and password required");
  return;
}
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.detail);
    return;
  }

 alert("Account created. Please login.");
 switchToLogin();
}


// async function login() {
//   const email = emailInput();
//   const password = passwordInput();

//   if (!email || !password) {
//     alert("Email and password required");
//     return;
//   }

//   const res = await fetch(`${API}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await res.json();

//     if (!res.ok) {
//   if (data.detail === "User already exists") {
//     alert("Account already exists. Please login.");
//     window.location.href = "login.html";
//     return;
//   }
//     alert(data.detail);   // 🔴 THIS WAS SILENT BEFORE
//   }

//   localStorage.setItem("token", data.token);
//   localStorage.setItem("userEmail", data.email);
//   setTimeout(() => {
//   window.location.replace("index.html");
// }, 100);

// }

async function login() {
  const email = emailInput();
  const password = passwordInput();

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.detail || "Invalid credentials");
    return;
  }

  // 🔥 IMPORTANT FIX
  localStorage.clear();

  // if backend returns access_token
  localStorage.setItem("token", data.access_token || data.token);

  // we already KNOW the email because user typed it
  localStorage.setItem("userEmail", email);

  window.location.replace("index.html");
}


async function handleGoogleLogin(response) {
  const res = await fetch(`${API}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential: response.credential })
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Google login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("userEmail", data.email);
 setTimeout(() => {
  window.location.replace("index.html");
}, 100);

}

