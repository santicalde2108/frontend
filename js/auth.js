// ==============================
// CONFIGURACIÓN GENERAL
// ==============================

const MAX_INTENTOS = 3;
let intentos = 0;

const RUTA_JSON = "/js/usuarios.json";

// ==============================
// REGISTRO DE USUARIOS
// ==============================

function registrarUsuario(nombre, email, password, confirmPassword, rol) {

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    let usuarioRegistrado = JSON.parse(
        localStorage.getItem("usuarioRegistrado")
    );

    if (
        usuarioRegistrado &&
        usuarioRegistrado.email === email
    ) {
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

// ==============================
// LOGIN
// ==============================

async function iniciarSesion(email, password, rol) {

    if (intentos >= MAX_INTENTOS) {
        alert("Demasiados intentos. Usuario bloqueado.");
        return;
    }

    try {

        let usuariosJSON = await obtenerUsuariosAsync();

        let usuarioRegistrado = JSON.parse(
            localStorage.getItem("usuarioRegistrado")
        );

        let usuarios = [...usuariosJSON];

        if (usuarioRegistrado) {
            usuarios.push(usuarioRegistrado);
        }

        let usuario = usuarios.find(u =>
            u.email.trim() === email.trim() &&
            u.password === password &&
            u.role === rol
        );

        if (usuario) {

            intentos = 0;

            localStorage.setItem(
                "usuarioActivo",
                JSON.stringify(usuario)
            );

            alert("Bienvenido " + usuario.nombre);

            window.location.href = "index.html";

        } else {

            intentos++;

            alert(
                "Datos incorrectos. Intento " +
                intentos +
                " de " +
                MAX_INTENTOS
            );
        }

    } catch (error) {

        console.error(error);

        alert("Error al cargar usuarios");
    }
}

// ==============================
// CERRAR SESIÓN
// ==============================

function cerrarSesion() {

    localStorage.removeItem("usuarioActivo");

    alert("Sesión cerrada");

    window.location.href = "inicioSesion.html";
}

// ==============================
// OBTENER USUARIOS CON FETCH
// ==============================

function obtenerUsuariosFetchThen() {

    return fetch(RUTA_JSON)
        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error(
                    "Error HTTP: " + respuesta.status
                );
            }

            return respuesta.json();
        });
}

// ==============================
// OBTENER USUARIOS CON ASYNC/AWAIT
// ==============================

async function obtenerUsuariosAsync() {

    try {

        let respuesta = await fetch(RUTA_JSON);

        if (!respuesta.ok) {
            throw new Error(
                "Error HTTP: " + respuesta.status
            );
        }

        let datos = await respuesta.json();

        console.log("Usuarios cargados:", datos);

        return datos;

    } catch (error) {

        console.error(
            "Error leyendo usuarios.json:",
            error
        );

        return [];
    }
}

// ==============================
// MOSTRAR USUARIOS
// ==============================

function mostrarUsuarios(lista) {

    let contenedor =
        document.getElementById("listaUsuarios");

    if (!contenedor) return;

    let html =
        "<div class='card'>" +
        "<h3>Usuarios del sistema</h3>" +
        "<ul>";

    lista.forEach(u => {

        html += `
            <li>
                <strong>${u.nombre}</strong>
                - ${u.email}
                (${u.role})
            </li>
        `;
    });

    html += `
        </ul>
        <p>
            <strong>Total:</strong>
            ${lista.length} usuarios
        </p>
        </div>
    `;

    contenedor.innerHTML = html;
}

// ==============================
// CARGAR USUARIOS
// ==============================

async function iniciarCargaUsuarios() {

    let contenedor =
        document.getElementById("listaUsuarios");

    if (!contenedor) return;

    contenedor.innerHTML =
        "<p>Cargando usuarios...</p>";

    try {

        let usuariosJSON =
            await obtenerUsuariosAsync();

        let usuarioRegistrado = JSON.parse(
            localStorage.getItem("usuarioRegistrado")
        );

        let usuarios = [...usuariosJSON];

        if (usuarioRegistrado) {
            usuarios.push(usuarioRegistrado);
        }

        mostrarUsuarios(usuarios);

        localStorage.setItem(
            "datosPlataforma",
            JSON.stringify(usuarios)
        );

    } catch (error) {

        console.error(error);

        contenedor.innerHTML =
            "<p style='color:red'>Error al cargar usuarios</p>";
    }
}

// ==============================
// EVENTOS DEL DOM
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // LOGIN
        const loginForm =
            document.getElementById("loginForm");

        if (loginForm) {

            loginForm.onsubmit =
                async function (e) {

                    e.preventDefault();

                    await iniciarSesion(
                        document.getElementById("loginEmail").value,
                        document.getElementById("loginPassword").value,
                        document.getElementById("loginRole").value
                    );
                };
        }

        // REGISTRO
        const registerForm =
            document.getElementById("registerForm");

        if (registerForm) {

            registerForm.onsubmit =
                function (e) {

                    e.preventDefault();

                    const registrado =
                        registrarUsuario(
                            document.getElementById("regNombre").value,
                            document.getElementById("regEmail").value,
                            document.getElementById("regPassword").value,
                            document.getElementById("regConfirm").value,
                            document.getElementById("regRole").value
                        );

                    if (registrado) {
                        window.location.href =
                            "inicioSesion.html";
                    }
                };
        }

        // LOGOUT
        const logoutBtn =
            document.getElementById("logoutBtn");

        if (logoutBtn) {
            logoutBtn.onclick =
                cerrarSesion;
        }

        // CARGA DE USUARIOS
        iniciarCargaUsuarios();
    }
);
