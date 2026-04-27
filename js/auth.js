
// ===================== REGISTRO =====================
function registrarUsuario(nombre, email, password, confirmPassword, role) {

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    if (usuarioRegistrado !== null && usuarioRegistrado.email === email) {
        alert("Usuario ya existe");
        return false;
    }

    usuarioRegistrado = {
        nombre: nombre,
        email: email,
        password: password,
        role: role
    };

    alert("Registro exitoso");
    return true;
}

// ===================== LOGIN =====================
function iniciarSesion(email, password, role) {

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