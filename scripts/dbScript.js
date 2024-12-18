import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo_gbGSUZsKKP0e3wEDoDfDTqtSgwceMM",
  authDomain: "userhelth.firebaseapp.com",
  projectId: "userhelth",
  storageBucket: "userhelth.appspot.com",
  messagingSenderId: "672488858514",
  appId: "1:672488858514:web:b1869f8237e9155637d74b",
  measurementId: "G-LEPMWH5NV6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Validate email format
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(email);
}

// Validate password (min 6 characters)
function isValidPassword(password) {
  return password.length >= 6;
}

// Display error message
function showError(message) {
  alert(message); // Optionally replace this with a custom alert
}

// Register user
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error.message);
    showError(`Registration error: ${error.message}`);
  }
}

// Log in user
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message);
    showError(`Login error: ${error.message}`);
  }
}

// Event listener for Register button
document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!isValidEmail(email)) {
    showError("Invalid email format");
    return;
  }

  if (!isValidPassword(password)) {
    showError("Password must be at least 6 characters long");
    return;
  }

  const user = await registerUser(email, password);
  if (user) {
    window.location.href = "/pages/dashboard.html"; // Redirect to dashboard after registration
  }
});

// Event listener for Login button
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!isValidEmail(email)) {
    showError("Invalid email format");
    return;
  }

  if (!isValidPassword(password)) {
    showError("Password must be at least 6 characters long");
    return;
  }

  const user = await loginUser(email, password);
  if (user) {
    window.location.href = "/pages/dashboard.html"; // Redirect to dashboard after login
  }
});
