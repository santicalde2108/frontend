# ControlAssistant

**Sistema de Gestión Académica** — Plataforma web para la administración de notas y asistencia de una institución educativa.

---

## Integrantes del Equipo

| Nombre | Rol | GitHub |
|---|---|---|
| José Ángel Cardona | Backend Developer | [JoseCardona2008](https://github.com/JoseCardona2008) |
| Juan José Sáenz | Frontend Developer · Líder | [juanjos373](https://github.com/juanjos373) |
| Santiago Calderón | Gestor de versiones | [santicalde2108](https://github.com/santicalde2108) |
| Tatiana Suárez | Documentadora y analista | [Gary1913](https://github.com/Gary1913) |

---

## Descripción del Proyecto

ControlAssistant es un sistema web que permite a estudiantes y profesores acceder a un entorno de gestión académica. La plataforma incluye:

- **Registro e inicio de sesión** con validación de credenciales.
- **Paneles diferenciados** según el rol del usuario (Estudiante / Profesor).
- **Control de intentos de acceso** con bloqueo temporal tras 3 intentos fallidos.
- Páginas informativas: Inicio, Nosotros y Contacto.

---

## Cómo Usar el Proyecto

### Requisitos

- Un navegador web moderno (Chrome, Firefox, Edge).
- No se requieren instalaciones adicionales.

### Instrucciones

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/santicalde2108/frontend.git
   ```

2. **Abrir el proyecto:**
   - Navegar a la carpeta del proyecto.
   - Abrir el archivo `index.html` en el navegador (doble clic o clic derecho → "Abrir con").

3. **Registrar un usuario:**
   - Ir a la página de **Registro** desde el botón "Registrarse".
   - Llenar el formulario con: nombre, correo, contraseña y rol (Estudiante o Profesor).
   - Hacer clic en "Registrarse".

4. **Iniciar sesión:**
   - Ir a **Iniciar Sesión**.
   - Ingresar correo, contraseña y seleccionar el rol.
   - Si los datos son correctos → se redirige al panel correspondiente.
   - Si los datos son incorrectos → se muestra un mensaje de error con el número de intento.
   - Después de **3 intentos fallidos** → el usuario queda **bloqueado temporalmente** por 5 minutos.

5. **Ver los datos por consola:**
   - Abrir las herramientas de desarrollador del navegador (F12 o Ctrl+Shift+I).
   - Ir a la pestaña **Console**.
   - Allí se imprimen los datos ingresados y los resultados de las verificaciones.

---

## Estructura de Archivos

```
ControlAssistant/
├── index.html                → Página principal (landing page)
├── README.md                 → Este archivo
│
├── assets/
│   └── logo-transp.png      → Logo del proyecto
│
├── css/
│   ├── inicio.css            → Estilos de la página principal
│   ├── nosotros.css          → Estilos de Nosotros
│   ├── contacto.css          → Estilos de Contacto
│   ├── inicioYRegistro.css   → Estilos de login y registro
│   ├── estudiante.css        → Estilos del panel estudiante
│   └── profesor.css          → Estilos del panel profesor
│
├── js/
│   └── auth.js               → Lógica de autenticación
│
└── pages/
    ├── inicioSesion.html     → Inicio de sesión
    ├── registro.html         → Registro de usuario
    ├── nosotros.html         → Información del equipo
    ├── contacto.html         → Formulario de contacto
    ├── estudiante.html       → Panel del estudiante
    └── profesor.html         → Panel del profesor
```

---

## Tecnologías Utilizadas

- **HTML5** — Estructura de las páginas.
- **CSS3** — Diseño visual y presentación.
- **JavaScript (Vanilla)** — Lógica de autenticación y funcionalidad.
- **localStorage** — Almacenamiento de datos en el navegador.
- **Google Fonts** (DM Sans) — Tipografía.
- **Font Awesome** — Iconos.

---

## Contenidos Académicos Aplicados

El archivo `auth.js` demuestra el uso de:

| Contenido | Ejemplo en el código |
|---|---|
| **Variables** | `var`, `const`, `let` para datos del usuario y configuración |
| **Condicionales** | `if/else` para validar credenciales y controlar acceso |
| **Ciclos** | `for` en `buscarUsuarioPorEmail()` para recorrer usuarios registrados |
| **Funciones** | `iniciarSesion()`, `registrarUsuario()`, `verificarCredenciales()`, `cerrarSesion()`, etc. |

---

## 📄 Licencia

Proyecto académico desarrollado para el curso de FrontEnd 1 — CESDE, 2025.
