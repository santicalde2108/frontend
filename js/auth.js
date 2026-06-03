const MAX_INTENTOS = 3;
let intentos = 0;
const RUTA_JSON = "./js/usuarios.json";

function registrarUsuario(nombre, email, password, confirmPassword, rol) {
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    let existe = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (existe && existe.email === email) {
        alert("Este correo ya está registrado");
        return false;
    }

    localStorage.setItem(
        "usuarioRegistrado",
        JSON.stringify({ nombre, email, password, role: rol })
    );

alert("Registro exitoso");
    return true;
}

async function iniciarSesion(email, password, rol) {
    if (intentos >= MAX_INTENTOS) {
        alert("Demasiados intentos. Usuario bloqueado.");
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
            intentos = 0;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            alert("Bienvenido " + usuario.nombre);
            window.location.href = "index.html";
        } else {
            intentos++;
            alert("Datos incorrectos. Intento " + intentos + " de " + MAX_INTENTOS);
        }
    } catch (error) {
        console.error(error);
        alert("Error al cargar usuarios");
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    window.location.href = "inicioSesion.html";
}

function obtenerUsuariosFetchThen() {
    return fetch(RUTA_JSON).then(respuesta => {
        if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
        return respuesta.json();
    });
}

async function obtenerUsuariosAsync() {
    let respuesta = await fetch(RUTA_JSON);
    if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
    return await respuesta.json();
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
    }
    catch (error) {
        console.error(error);
        contenedor.innerHTML = "<p style='color:red'>Error al cargar usuarios</p>";
    }
}
document.addEventListener("DOMContentLoaded", function () {

    let loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.onsubmit = async function (e) {
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
        registerForm.onsubmit = function (e) {
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

    iniciarCargaUsuarios();
});