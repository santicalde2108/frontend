const MAX_INTENTOS = 3;
const RUTA_JSON = "/js/usuarios.json";
const BLOQUEO_MS = 5 * 60 * 1000;
const STORAGE_USUARIOS = "usuarios";
const STORAGE_USUARIO_ACTIVO = "usuarioActivo";

// Nota: usuarios.json solo contiene datos de ejemplo/semente.
// Las cuentas nuevas y cambios de usuario se guardan en localStorage,
// porque un archivo JSON estático no se puede escribir desde el frontend.

async function registrarUsuario(nombre, email, password, confirmPassword, rol) {
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    let usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS) || "null");
    if (!usuarios) {
        usuarios = await obtenerUsuariosAsync();
    }

    if (usuarios.some(u => u.email === email)) {
        alert("Este correo ya está registrado");
        return false;
    }

    usuarios.push({ nombre, email, password, role: rol });
    localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));

    alert("Registro exitoso");
    return true;
}

async function iniciarSesion(email, password, rol) {
    // bloqueo por email persistente en localStorage
    const bloqueadoKey = `bloqueado_${email}`;
    const intentosKey = `intentos_${email}`;
    const bloqueadoUntil = parseInt(localStorage.getItem(bloqueadoKey) || '0', 10);
    if (Date.now() < bloqueadoUntil) {
        const segundos = Math.ceil((bloqueadoUntil - Date.now()) / 1000);
        alert("Usuario bloqueado. Intenta de nuevo en " + segundos + " segundos.");
        return;
    }

    try {
        let usuarios = await obtenerUsuariosAsync();

        let usuario = usuarios.find(u =>
            u.email === email &&
            u.password === password &&
            u.role === rol
        );

        if (usuario) {

            localStorage.removeItem(intentosKey);
            localStorage.removeItem(bloqueadoKey);
            localStorage.setItem(STORAGE_USUARIO_ACTIVO, JSON.stringify(usuario));
            alert("Bienvenido " + usuario.nombre);
            if (usuario.role === "estudiante") {
                window.location.href = "/html/estudiante.html";
            } else if (usuario.role === "profesor") {
                window.location.href = "/html/profesor.html";
            } else {
                window.location.href = "/index.html";
            }
        } else {
            let cont = parseInt(localStorage.getItem(intentosKey) || '0', 10) + 1;
            localStorage.setItem(intentosKey, cont.toString());
            if (cont >= MAX_INTENTOS) {
                localStorage.setItem(bloqueadoKey, (Date.now() + BLOQUEO_MS).toString());
                alert("Demasiados intentos. Usuario bloqueado por 5 minutos.");
            } else {
                alert("Datos incorrectos. Intento " + cont + " de " + MAX_INTENTOS);
            }
        }
    } catch (error) {
        console.error(error);
        alert("Error al cargar usuarios");
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    window.location.href = "/html/inicioSesion.html";
}

function obtenerUsuariosFetchThen() {
    return fetch(RUTA_JSON).then(respuesta => {
        if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
        return respuesta.json();
    });
}

async function obtenerUsuariosAsync() {
    let usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS) || "null");
    if (usuarios) {
        return usuarios;
    }

    let respuesta = await fetch(RUTA_JSON);
    if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
    usuarios = await respuesta.json();
    localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));
    return usuarios;
}

function getUsuarioActivo() {
    return JSON.parse(localStorage.getItem(STORAGE_USUARIO_ACTIVO) || "null");
}

function renderSaludoUsuario() {
    const usuario = getUsuarioActivo();
    const saludo = document.getElementById("saludoUsuario");
    if (saludo && usuario) {
        saludo.textContent = `Hola ${usuario.nombre}`;
    }
}

function mostrarUsuarios(lista) {
    let contenedor = document.getElementById("listaUsuarios");
    if (!contenedor) return;

    let html = "<div class='card'><h3>Usuarios del sistema</h3><ul>";

    lista.forEach(u => {
        html += `<li><strong>${u.nombre}</strong> — ${u.email} (${u.role})</li>`;
    });

    html += "</ul><p><strong>Total:</strong> " + lista.length + " usuarios</p></div>";
    contenedor.innerHTML = html;
}
async function iniciarCargaUsuarios() {
    let contenedor = document.getElementById("listaUsuarios");
    if (!contenedor) return;

    contenedor.innerHTML = "<p>Cargando usuarios...</p>";
    try {
        let datos = await obtenerUsuariosAsync();
        mostrarUsuarios(datos);
        localStorage.setItem("datosPlataforma", JSON.stringify(datos));
    } catch (error) {
        console.error(error);
        contenedor.innerHTML = "<p style='color:red'>Error al cargar usuarios</p>";
    }
}
document.addEventListener("DOMContentLoaded", function() {

    let loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.onsubmit = async function(e) {
            e.preventDefault();
            await iniciarSesion(
                document.getElementById("loginEmail").value,
                document.getElementById("loginPassword").value,
                document.getElementById("loginRole").value
            );
        };
    }
    let registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.onsubmit = function(e) {
            e.preventDefault();

            if (registrarUsuario(
                    document.getElementById("regNombre").value,
                    document.getElementById("regEmail").value,
                    document.getElementById("regPassword").value,
                    document.getElementById("regConfirm").value,
                    document.getElementById("regRole").value
                )) {
                window.location.href = "inicioSesion.html";
            }
        };
    }
    let logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.onclick = cerrarSesion;
    }

    let panelPrivado = document.querySelector(".privado");
    if (panelPrivado) {
        renderSaludoUsuario();
    }

    iniciarCargaUsuarios()
});