const MAX_INTENTOS = 3;
let intentos = 0;
const RUTA_JSON = "usuarios.json";

/* ==========================
   OBTENER USUARIOS
========================== */
async function obtenerUsuariosAsync() {
    const respuesta = await fetch(RUTA_JSON);

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el archivo de usuarios");
    }

    return await respuesta.json();
}

/* ==========================
   REGISTRAR USUARIO
========================== */
function registrarUsuario(nombre, email, password, confirmPassword, rol) {

    if (!nombre || !email || !password || !confirmPassword || !rol) {
        alert("Todos los campos son obligatorios");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    const usuarioExistente = JSON.parse(
        localStorage.getItem("usuarioRegistrado")
    );

    if (usuarioExistente && usuarioExistente.email === email) {
        alert("Este correo ya está registrado");
        return false;
    }

    const nuevoUsuario = {
        nombre,
        email,
        password,
        role: rol
    };

    localStorage.setItem(
        "usuarioRegistrado",
        JSON.stringify(nuevoUsuario)
    );

    alert("Registro exitoso");
    return true;
}

/* ==========================
   INICIAR SESIÓN
========================== */
async function iniciarSesion(email, password, rol) {

    if (intentos >= MAX_INTENTOS) {
        alert("Demasiados intentos. Usuario bloqueado.");
        return;
    }

    try {

        const usuarios = await obtenerUsuariosAsync();

        const usuario = usuarios.find(
            u =>
                u.email === email &&
                u.password === password &&
                u.role === rol
        );

        if (usuario) {

            intentos = 0;

            localStorage.setItem(
                "usuarioActivo",
                JSON.stringify(usuario)
            );

            alert(`Bienvenido ${usuario.nombre}`);

            if (usuario.role === "profesor") {
                window.location.href = "profesor.html";
            } else if (usuario.role === "estudiante") {
                window.location.href = "estudiante.html";
            } else {
                alert("Rol no válido");
            }

        } else {

            intentos++;

            alert(
                `Datos incorrectos. Intento ${intentos} de ${MAX_INTENTOS}`
            );

        }

    } catch (error) {

        console.error("Error:", error);
        alert("Error al cargar los usuarios");

    }
}

/* ==========================
   CERRAR SESIÓN
========================== */
function cerrarSesion() {

    localStorage.removeItem("usuarioActivo");

    alert("Sesión cerrada correctamente");

    window.location.href = "inicioSesion.html";
}

/* ==========================
   MOSTRAR USUARIOS
========================== */
function mostrarUsuarios(usuarios) {

    const contenedor = document.getElementById("listaUsuarios");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    usuarios.forEach(usuario => {

        contenedor.innerHTML += `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.role}</td>
            </tr>
        `;

    });
}

/* ==========================
   CARGAR USUARIOS
========================== */
async function iniciarCargaUsuarios() {

    const contenedor = document.getElementById("listaUsuarios");

    if (!contenedor) return;

    try {

        const usuarios = await obtenerUsuariosAsync();

        mostrarUsuarios(usuarios);

        localStorage.setItem(
            "datosPlataforma",
            JSON.stringify(usuarios)
        );

    } catch (error) {

        console.error("Error al cargar usuarios:", error);

    }
}

/* ==========================
   EVENTOS DEL DOM
========================== */
document.addEventListener("DOMContentLoaded", () => {

    // Login
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const rol = document.getElementById("loginRole").value;

            await iniciarSesion(email, password, rol);

        });

    }

    // Botón cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", (e) => {

            e.preventDefault();

            cerrarSesion();

        });

    }

    // Cargar usuarios si existe la tabla
    iniciarCargaUsuarios();

});
