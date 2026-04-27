const MAX_INTENTOS = 3;
// ===================== USUARIO TEMPORAL =====================

let intentos = 0;

// ===================== REGISTRO =====================
function registrarUsuario(nombre, email, password, confirmPassword, role) {

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    let usuarioExistente = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (usuarioExistente !== null && usuarioExistente.email === email) {
        alert("Usuario ya existe");
        return false;
    }

localStorage.setItem("usuarioRegistrado", JSON.stringify({
    nombre: nombre,
    email: email,
    password: password,
    role: role
}));

    alert("Registro exitoso");
    return true;
}

// ===================== LOGIN =====================
function iniciarSesion(email, password, role) {

    let usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (usuarioRegistrado === null) {
        alert("No hay usuarios registrados");
        return;
    }

    if (intentos >= MAX_INTENTOS) {
        alert("Usuario bloqueado");
        return;
    }

    if (
        usuarioRegistrado.email === email &&
        usuarioRegistrado.password === password &&
        usuarioRegistrado.role === role
    ) {

        intentos = 0;

        if (usuarioRegistrado.role === "profesor") {
            window.location.href = obtenerRutaBase() + "profesor.html";
        } else {
            window.location.href = obtenerRutaBase() + "estudiante.html";
        }

    } else {
        intentos = intentos + 1;
        alert("Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS);
    }
}

// ===================== RUTA =====================
function obtenerRutaBase() {
    let ruta = window.location.pathname;

    if (ruta.indexOf("/html/") !== -1) {
        return "";
    } else {
        return "html/";
    }
}

// ===================== SESIÓN =====================
function cerrarSesion() {
    localStorage.removeItem("usuarioRegistrado");
    alert("Sesión cerrada");
    window.location.href = obtenerRutaBase() + "inicioSesion.html";
}

// ===================== DOM =====================

// LOGIN
let loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.onsubmit = function (e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;
        let role = document.getElementById("loginRole").value;

        iniciarSesion(email, password, role);
    };
}

// REGISTER
let registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.onsubmit = function (e) {
        e.preventDefault();

        let nombre = document.getElementById("regNombre").value;
        let email = document.getElementById("regEmail").value;
        let password = document.getElementById("regPassword").value;
        let confirm = document.getElementById("regConfirm").value;
        let role = document.getElementById("regRole").value;

        let ok = registrarUsuario(nombre, email, password, confirm, role);

        if (ok) {
            window.location.href = obtenerRutaBase() + "inicioSesion.html";
        }
    };
}

// BOTÓN LOGOUT
let logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.onclick = function () {
        cerrarSesion();
    };
}