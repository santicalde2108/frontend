// ============================================================
//  auth.js – Lógica de autenticación de ControlAssistant
//  Contenidos aplicados: Variables, Condicionales, Ciclos, Funciones
// ============================================================

// ===================== CONSTANTES =====================
const MAX_INTENTOS = 3;              // Máximo de intentos permitidos
const TIEMPO_BLOQUEO = 5 * 60 * 1000; // 5 minutos en milisegundos

// ===================== FUNCIONES =====================

/**
 * Función para obtener la lista de usuarios registrados desde localStorage.
 * @returns {Array} Lista de objetos usuario
 */
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

/**
 * Función para guardar la lista de usuarios en localStorage.
 * @param {Array} usuarios – Lista actualizada de usuarios
 */
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/**
 * Función para buscar un usuario por su correo electrónico.
 * Utiliza un ciclo FOR para recorrer el arreglo de usuarios.
 * @param {string} email – Correo a buscar
 * @returns {Object|null} El usuario encontrado, o null si no existe
 */
function buscarUsuarioPorEmail(email) {
    const usuarios = obtenerUsuarios();

    // Ciclo FOR para recorrer todos los usuarios registrados
    for (let i = 0; i < usuarios.length; i++) {
        console.log("Revisando usuario " + (i + 1) + ": " + usuarios[i].email);
        if (usuarios[i].email === email) {
            console.log("Usuario encontrado:", usuarios[i].nombre);
            return usuarios[i];
        }
    }

    console.log("No se encontró ningún usuario con el correo:", email);
    return null;
}

/**
 * Función para verificar si un usuario está bloqueado por intentos fallidos.
 * @param {string} email – Correo del usuario
 * @returns {boolean} true si está bloqueado, false si puede intentar
 */
function verificarBloqueo(email) {
    let intentosData = JSON.parse(localStorage.getItem("intentosLogin_" + email)) || { count: 0, tiempo: null };
    const ahora = new Date().getTime();

    // Reiniciar intentos si ya pasó el tiempo de bloqueo
    if (intentosData.tiempo && ahora - intentosData.tiempo > TIEMPO_BLOQUEO) {
        intentosData.count = 0;
        intentosData.tiempo = null;
        localStorage.setItem("intentosLogin_" + email, JSON.stringify(intentosData));
        console.log("Tiempo de bloqueo expirado. Intentos reiniciados.");
    }

    if (intentosData.count >= MAX_INTENTOS) {
        console.log("BLOQUEADO: El usuario ha superado los " + MAX_INTENTOS + " intentos.");
        return true;
    }

    return false;
}

/**
 * Función para registrar un intento fallido de login.
 * @param {string} email – Correo del usuario
 * @returns {number} Cantidad de intentos acumulados
 */
function registrarIntentoFallido(email) {
    let intentosData = JSON.parse(localStorage.getItem("intentosLogin_" + email)) || { count: 0, tiempo: null };
    intentosData.count++;
    intentosData.tiempo = new Date().getTime();
    localStorage.setItem("intentosLogin_" + email, JSON.stringify(intentosData));
    console.log("Intento fallido #" + intentosData.count + " de " + MAX_INTENTOS);
    return intentosData.count;
}

/**
 * Función para verificar las credenciales del usuario.
 * @param {Object} usuario – Objeto usuario encontrado en la base de datos
 * @param {string} password – Contraseña ingresada
 * @param {string} role – Rol seleccionado
 * @returns {boolean} true si las credenciales son correctas
 */
function verificarCredenciales(usuario, password, role) {
    if (usuario.password === password && usuario.role === role) {
        console.log("Credenciales CORRECTAS. Acceso permitido.");
        return true;
    } else {
        console.log("Credenciales INCORRECTAS.");
        return false;
    }
}

/**
 * Función para registrar un nuevo usuario en el sistema.
 * Valida que las contraseñas coincidan y que el correo no esté registrado.
 * @param {string} nombre – Nombre completo
 * @param {string} email – Correo electrónico
 * @param {string} password – Contraseña
 * @param {string} confirmPassword – Confirmación de contraseña
 * @param {string} role – Rol (estudiante/profesor)
 * @returns {boolean} true si el registro fue exitoso
 */
function registrarUsuario(nombre, email, password, confirmPassword, role) {
    console.log("=== PROCESO DE REGISTRO ===");
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Rol:", role);

    // Condicional: verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        console.log("ERROR: Las contraseñas no coinciden.");
        alert("Las contraseñas no coinciden");
        return false;
    }

    // Buscar si el correo ya está registrado (usa ciclo FOR internamente)
    const existe = buscarUsuarioPorEmail(email);

    if (existe) {
        console.log("ERROR: Este correo ya está registrado.");
        alert("Este correo ya está registrado");
        return false;
    }

    // Guardar nuevo usuario
    let usuarios = obtenerUsuarios();
    usuarios.push({ nombre: nombre, email: email, password: password, role: role });
    guardarUsuarios(usuarios);

    console.log("Registro EXITOSO para:", nombre);
    alert("Registro exitoso");
    return true;
}

/**
 * Función principal de inicio de sesión.
 * Aplica: variables, condicionales, ciclo (en buscarUsuarioPorEmail) y funciones.
 * @param {string} email – Correo ingresado
 * @param {string} password – Contraseña ingresada
 * @param {string} role – Rol seleccionado
 */
function iniciarSesion(email, password, role) {
    console.log("=== PROCESO DE INICIO DE SESIÓN ===");
    console.log("Email ingresado:", email);
    console.log("Rol seleccionado:", role);

    // Buscar usuario con ciclo FOR
    const usuario = buscarUsuarioPorEmail(email);

    // Condicional: verificar si el usuario existe
    if (!usuario) {
        console.log("ERROR: Usuario no registrado.");
        alert("Este usuario no está registrado");
        return;
    }

    // Condicional: verificar si está bloqueado
    if (verificarBloqueo(email)) {
        alert("Usuario bloqueado temporalmente. Intenta más tarde.");
        return;
    }

    // Condicional: verificar credenciales
    if (verificarCredenciales(usuario, password, role)) {
        // Acceso exitoso
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        localStorage.removeItem("intentosLogin_" + email);
        console.log("Redirigiendo al panel de:", usuario.role);

        // Condicional: redirigir según el rol
        if (usuario.role === "profesor") {
            window.location.href = "profesor.html";
        } else {
            window.location.href = "estudiante.html";
        }
    } else {
        // Credenciales incorrectas: registrar intento fallido
        var intentos = registrarIntentoFallido(email);
        alert("Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS + ".");
    }
}

/**
 * Función para cerrar la sesión del usuario activo.
 */
function cerrarSesion() {
    console.log("Cerrando sesión...");
    localStorage.removeItem("usuarioActivo");
    window.location.href = "inicioSesion.html";
}

/**
 * Función para mostrar un saludo personalizado al usuario activo.
 * @param {Object} usuario – Usuario activo
 */
function mostrarSaludo(usuario) {
    var saludoUsuario = document.getElementById("saludoUsuario");
    if (saludoUsuario && usuario) {
        saludoUsuario.textContent = "Hola, " + usuario.nombre;
        console.log("Saludo mostrado para:", usuario.nombre);
    }
}

/**
 * Función para configurar la barra de navegación según el estado del usuario.
 * @param {Object|null} usuario – Usuario activo o null
 */
function configurarNavbar(usuario) {
    var itemLogin = document.getElementById("itemLogin");
    var itemLogout = document.getElementById("itemLogout");
    var saludoNav = document.getElementById("saludo");

    if (usuario && saludoNav) {
        // Ocultar botón de login y mostrar logout
        if (itemLogin) itemLogin.style.display = "none";
        if (itemLogout) itemLogout.style.display = "block";
        saludoNav.style.cursor = "pointer";

        // Condicional: mostrar texto según el rol
        if (usuario.role === "profesor") {
            saludoNav.textContent = "Profesor";
            saludoNav.addEventListener("click", function () {
                window.location.href = "profesor.html";
            });
        }

        if (usuario.role === "estudiante") {
            saludoNav.textContent = "Estudiante";
            saludoNav.addEventListener("click", function () {
                window.location.href = "estudiante.html";
            });
        }

        console.log("Navbar configurada para rol:", usuario.role);
    }
}

// ===================== EVENTOS DEL DOM =====================

// --- Formulario de Registro ---
var registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var nombre = document.getElementById("regNombre").value.trim();
        var email = document.getElementById("regEmail").value.trim();
        var password = document.getElementById("regPassword").value;
        var confirmPassword = document.getElementById("regConfirm").value;
        var role = document.getElementById("regRole").value.toLowerCase();

        // Llamar la función de registro
        var exitoso = registrarUsuario(nombre, email, password, confirmPassword, role);

        if (exitoso) {
            window.location.href = "inicioSesion.html";
        }
    });
}

// --- Formulario de Login ---
var loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var email = document.getElementById("loginEmail").value.trim();
        var password = document.getElementById("loginPassword").value;
        var role = document.getElementById("loginRole").value.toLowerCase();

        // Llamar la función de inicio de sesión
        iniciarSesion(email, password, role);
    });
}

// --- Proteger páginas privadas ---
var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (document.body.classList.contains("privado") && !usuarioActivo) {
    console.log("Acceso denegado: usuario no autenticado. Redirigiendo al login.");
    window.location.href = "inicioSesion.html";
}

// --- Mostrar saludo y configurar navbar ---
mostrarSaludo(usuarioActivo);
configurarNavbar(usuarioActivo);

// --- Botón cerrar sesión (navbar) ---
var logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        cerrarSesion();
    });
}

// --- Botón cerrar sesión (paneles) ---
var btnCerrar = document.getElementById("cerrarSesion");

if (btnCerrar) {
    btnCerrar.addEventListener("click", function () {
        cerrarSesion();
    });
}