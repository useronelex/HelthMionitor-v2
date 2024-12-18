const loginBtn = document.getElementById("pushLoginBtn");
const registerBtn = document.getElementById("pushRegisterBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");
const navbar = document.querySelector(".navbar");

// Показ модального вікна логіну і приховування navbar
loginBtn.onclick = function () {
  loginModal.style.display = "flex";
  navbar.style.display = "none";
};

// Показ модального вікна реєстрації і приховування navbar
registerBtn.onclick = function () {
  registerModal.style.display = "flex";
  navbar.style.display = "none";
};

// Закриття модального вікна логіну і повернення navbar
closeLogin.onclick = function () {
  loginModal.style.display = "none";
  navbar.style.display = "flex";
};

// Закриття модального вікна реєстрації і повернення navbar
closeRegister.onclick = function () {
  registerModal.style.display = "none";
  navbar.style.display = "flex";
};

// Закриття при кліку поза модальним вікном
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
    navbar.style.display = "flex";
  }
  if (event.target == registerModal) {
    registerModal.style.display = "none";
    navbar.style.display = "flex";
  }
};

// Показ/приховування меню на мобільних пристроях
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
}
