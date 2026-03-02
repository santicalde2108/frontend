// ============================================================
//  auth.js – Lógica de autenticación de ControlAssistant
//  Contenidos aplicados: Variables, Condicionales, Ciclos, Funciones
// ============================================================

// ===================== CONSTANTES =====================
const MAX_INTENTOS = 3;
const TIEMPO_BLOQUEO = 5 * 60 * 1000; // 5 minutos

// ============================================================
// Detectar si estamos en la carpeta /html/
// Permite que las redirecciones funcionen desde cualquier ubicación
// ============================================================
function obtenerRutaBase() {
    var ruta = window.location.pathname;

    if (ruta.indexOf("/html/") !== -1) {
        return "";
    } else {
        return "html/";
    }
}

// ===================== FUNCIONES =====================

// Obtener usuarios
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Guardar usuarios
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Buscar usuario por email (usa ciclo FOR)
function buscarUsuarioPorEmail(email) {
    const usuarios = obtenerUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            return usuarios[i];
        }
    }

    return null;
}

// Verificar bloqueo
function verificarBloqueo(email) {
    let intentosData = JSON.parse(localStorage.getItem("intentosLogin_" + email))
    || { count: 0, tiempo: null };

    const ahora = new Date().getTime();

    if (intentosData.tiempo && ahora - intentosData.tiempo > TIEMPO_BLOQUEO) {
        intentosData.count = 0;
        intentosData.tiempo = null;
        localStorage.setItem("intentosLogin_" + email, JSON.stringify(intentosData));
    }

    if (intentosData.count >= MAX_INTENTOS) {
        return true;
    }

    return false;
}

// Registrar intento fallido
function registrarIntentoFallido(email) {
    let intentosData = JSON.parse(localStorage.getItem("intentosLogin_" + email))
    || { count: 0, tiempo: null };

    intentosData.count++;
    intentosData.tiempo = new Date().getTime();

    localStorage.setItem("intentosLogin_" + email, JSON.stringify(intentosData));

    return intentosData.count;
}

// Verificar credenciales
function verificarCredenciales(usuario, password, role) {
    return usuario.password === password && usuario.role === role;
}

// Registrar usuario
function registrarUsuario(nombre, email, password, confirmPassword, role) {

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    const existe = buscarUsuarioPorEmail(email);

    if (existe) {
        alert("Este correo ya está registrado");
        return false;
    }

    let usuarios = obtenerUsuarios();
    usuarios.push({ nombre, email, password, role });
    guardarUsuarios(usuarios);

    alert("Registro exitoso");
    return true;
}

// ===================== INICIAR SESIÓN =====================
function iniciarSesion(email, password, role) {

    const usuario = buscarUsuarioPorEmail(email);

    if (!usuario) {
        alert("Este usuario no está registrado");
        return;
    }

    if (verificarBloqueo(email)) {
        alert("Usuario bloqueado temporalmente. Intenta más tarde.");
        return;
    }

    if (verificarCredenciales(usuario, password, role)) {

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        localStorage.removeItem("intentosLogin_" + email);

        if (usuario.role === "profesor") {
            window.location.href = obtenerRutaBase() + "profesor.html";
        } else {
            window.location.href = obtenerRutaBase() + "estudiante.html";
        }

    } else {
        var intentos = registrarIntentoFallido(email);
        alert("Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS + ".");
    }
}

// ===================== CERRAR SESIÓN =====================
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = obtenerRutaBase() + "inicioSesion.html";
}

// ===================== SALUDO =====================
function mostrarSaludo(usuario) {
    var saludoUsuario = document.getElementById("saludoUsuario");

    if (saludoUsuario && usuario) {
        saludoUsuario.textContent = "Hola, " + usuario.nombre;
    }
}

// ===================== NAVBAR DINÁMICO =====================
function configurarNavbar(usuario) {

    var itemLogin = document.getElementById("itemLogin");
    var itemLogout = document.getElementById("itemLogout");
    var saludoNav = document.getElementById("saludo");

    if (usuario && saludoNav) {

        if (itemLogin) itemLogin.style.display = "none";
        if (itemLogout) itemLogout.style.display = "block";

        saludoNav.style.cursor = "pointer";

        if (usuario.role === "profesor") {
            saludoNav.textContent = "Profesor";
            saludoNav.addEventListener("click", function () {
                window.location.href = obtenerRutaBase() + "profesor.html";
            });
        }

        if (usuario.role === "estudiante") {
            saludoNav.textContent = "Estudiante";
            saludoNav.addEventListener("click", function () {
                window.location.href = obtenerRutaBase() + "estudiante.html";
            });
        }
    }
}

// ===================== EVENTOS DEL DOM =====================

// Registro
var registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        var nombre = document.getElementById("regNombre").value.trim();
        var email = document.getElementById("regEmail").value.trim();
        var password = document.getElementById("regPassword").value;
        var confirmPassword = document.getElementById("regConfirm").value;
        var role = document.getElementById("regRole").value.toLowerCase();

        var exitoso = registrarUsuario(nombre, email, password, confirmPassword, role);

        if (exitoso) {
            window.location.href = obtenerRutaBase() + "inicioSesion.html";
        }
    });
}

// Login
var loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        var email = document.getElementById("loginEmail").value.trim();
        var password = document.getElementById("loginPassword").value;
        var role = document.getElementById("loginRole").value.toLowerCase();

        iniciarSesion(email, password, role);
    });
}

// Proteger páginas privadas
var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (document.body.classList.contains("privado") && !usuarioActivo) {
    window.location.href = obtenerRutaBase() + "inicioSesion.html";
}

// Mostrar saludo y configurar navbar
mostrarSaludo(usuarioActivo);
configurarNavbar(usuarioActivo);

// Logout navbar
var logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        cerrarSesion();
    });
}

// Logout paneles
var btnCerrar = document.getElementById("cerrarSesion");

if (btnCerrar) {
    btnCerrar.addEventListener("click", function () {
        cerrarSesion();
    });
}