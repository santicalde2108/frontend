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


## Estrategia de Ramas (GitFlow)

El proyecto sigue una estrategia basada en GitFlow con la siguiente estructura:

main
└── develop
├── feature/login
├── feature/registro
├── feature/panel-estudiante
└── feature/panel-profesor


- **`main`** → Rama de producción. Contiene únicamente código estable y probado.
- **`develop`** → Rama principal de desarrollo. Integra las funcionalidades terminadas antes de pasar a `main`.
- **`feature/nombre-funcionalidad`** → Ramas para desarrollar una funcionalidad específica. Se crean a partir de `develop` y se fusionan de vuelta a `develop` cuando la funcionalidad está completa.

> Nota: en esta primera fase no se implementan ramas `release` ni `hotfix`, ya que corresponden a etapas posteriores del proyecto.

---

## Convención de Commits



| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de errores |
| `docs:` | Cambios en documentación |
| `style:` | Cambios de formato (espacios, indentación, sin afectar lógica) |
| `refactor:` | Refactorización de código sin cambiar funcionalidad |
| `test:` | Agregar o modificar pruebas |
| `chore:` | Tareas de mantenimiento (configuración, dependencias, etc.) |

**Ejemplo:** `feat: agregar validación de contraseña en registro`

---

## Reglas para Pull Requests

- Toda funcionalidad debe desarrollarse en su propia rama `feature/...` y no directamente en `develop` o `main`.
- Al finalizar una funcionalidad, se debe abrir un **Pull Request** hacia `develop`, describiendo brevemente qué se hizo y qué issue o tarea resuelve.
- Cada Pull Request debe ser **revisado por al menos un integrante** distinto de quien lo creó, antes de fusionarse.
- No se permite fusionar un PR con errores conocidos o sin revisión.

---

## Reglas de Fusión (Merge)

- Las fusiones hacia `develop` se realizan únicamente mediante Pull Request, nunca con `push` directo.
- Se utiliza **merge normal** (no squash) para conservar el historial de commits de cada funcionalidad.
- La fusión de `develop` hacia `main` solo se realiza cuando el equipo confirma que la versión está estable.
- En caso de conflictos, el responsable de la rama `feature` debe resolverlos antes de solicitar la revisión del PR.

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
├── README.md                 → Documentación del proyecto
│
├── mockups/                  → Diseños visuales del sistema (vistas en PNG)
│   ├── 01-index.png          → Mockup de la página principal
│   ├── 02-nosotros.png       → Mockup de la sección Nosotros
│   ├── 03-contacto.png       → Mockup de la página de Contacto
│   ├── 04-inicioSesion.png   → Mockup del inicio de sesión
│   ├── 05-registro.png       → Mockup del registro de usuario
│   ├── 06-estudiante.png     → Mockup del panel del estudiante
│   └── 07-profesor.png       → Mockup del panel del profesor
│
├── imagenes/
│   └── logo-transp.png       → Logo oficial del proyecto
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
│   └── auth.js               → Lógica de autenticación y control de acceso
│
└── html/
    ├── inicioSesion.html     → Vista de inicio de sesión
    ├── registro.html         → Vista de registro
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

## Licencia

Proyecto académico desarrollado para el curso de FrontEnd 1 — CESDE, 2025.
