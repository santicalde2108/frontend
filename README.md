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

## Estrategia de Ramas (GitFlow)

El equipo utiliza una estrategia de ramas basada en **GitFlow** con la siguiente estructura:

```
main                      → Rama de producción (código estable, listo para despliegue)
└── develop               → Rama de desarrollo (integración continua de nuevas funcionalidades)
     ├── feature/nombre-funcionalidad  → Ramas para nuevas funcionalidades
     ├── feature/nombre-funcionalidad
     └── feature/nombre-funcionalidad
```

### Reglas de las ramas

| Rama | Propósito | Convención de nombre | ¿Se crea desde? | ¿Se fusiona a? |
|---|---|---|---|---|
| `main` | Código de producción estable | `main` (nunca se crean ramas nuevas) | — | — |
| `develop` | Integración de funcionalidades | `develop` (nunca se crean ramas nuevas) | — | — |
| `feature/*` | Nuevas funcionalidades o cambios | `feature/descripcion-breve` (kebab-case) | `develop` | `develop` |

> **Nota:** En esta fase inicial no se implementan ramas `release/*` ni `hotfix/*`. Se incorporarán en etapas posteriores si el proyecto lo requiere.

### Flujo de trabajo típico

1. Verificar que la rama actual es `develop`: `git checkout develop`
2. Actualizar la rama local: `git pull origin develop`
3. Crear una rama feature: `git checkout -b feature/nueva-funcionalidad`
4. Realizar los cambios y commits siguiendo las convenciones.
5. Hacer push de la rama: `git push origin feature/nueva-funcionalidad`
6. Crear un Pull Request a `develop`.
7. Tras la revisión y aprobación, el PR se fusiona en `develop`.

---

## Convención para Commits

El equipo sigue el formato **Conventional Commits** para mantener un historial de cambios claro y facilitar la generación de versiones:

```
<tipo>(<ámbito>): <descripción breve>

<cuerpo opcional>

<pie opcional>
```

### Tipos de commit permitidos

| Tipo | Uso | Ejemplo |
|---|---|---|
| `feat` | Nueva funcionalidad | `feat(auth): agregar bloqueo tras 3 intentos fallidos` |
| `fix` | Corrección de errores | `fix(auth): corregir validación de email` |
| `chore` | Tareas de mantenimiento / infraestructura | `chore: actualizar README con reglas de colaboración` |
| `docs` | Cambios en documentación | `docs: agregar sección de pruebas unitarias` |
| `style` | Cambios de formato / estilo (sin lógica) | `style(css): ajustar márgenes del formulario` |
| `refactor` | Refactorización del código | `refactor(auth): extraer lógica de validación a función dedicada` |
| `test` | Pruebas unitarias o de integración | `test(auth): agregar casos para bloqueo de cuenta` |

### Reglas adicionales

- La descripción del commit debe estar en **español** e iniciar con minúscula.
- No se deben usar tildes ni caracteres especiales en la descripción.
- No se debe incluir el nombre del autor en el mensaje (Git ya registra quién hizo el commit).

---

## Pull Requests (PR)

### Reglas para crear un PR

1. **Base:** siempre debe ser `develop` (o la rama `feature/*` correspondiente si se trabaja en cascada).
2. **Título:** debe seguir el formato `tipo(ámbito): descripción` (misma convención que los commits).
3. **Descripción:** debe incluir:
   - Resumen de los cambios realizados.
   - Criterios de aceptación cumplidos.
   - Enlaces a las actividades del GitHub Project (ej. `Closes #12`).
4. **Tamaño:** se recomienda mantener los PRs pequeños y enfocados (< 300 líneas de cambio).
5. **Autorevisión:** el autor debe revisar su propio PR antes de solicitar revisión.
6. **Asignación:** cada PR debe tener al menos un revisor asignado.

### Reglas para revisar un PR

- Revisar que el código siga las convenciones del proyecto.
- Verificar que no haya errores de sintaxis o lógica.
- Asegurar que los tests (si existen) pasen.
- Aprobar solo si no hay observaciones críticas pendientes.

---

## Fusiones (Merge)

1. **Solo se fusionan PRs aprobados.**
2. **No se permite el merge directo a `main` o `develop` sin PR.**
3. Se utiliza **Squash and merge** para ramas `feature/*` → `develop`, de modo que la historia de `develop` mantenga un commit por funcionalidad.
4. La rama `main` se actualiza únicamente cuando `develop` pasa a producción (etapas de release).
5. **Eliminar ramas `feature/*`** después de fusionar para mantener el repositorio limpio.

---

## Gestión del Proyecto (GitHub Project)

El equipo utiliza un **GitHub Project** tipo tablero Kanban para el seguimiento del trabajo.

### Estado de las columnas

| Columna | Descripción |
|---|---|
| **Backlog** | Actividades identificadas pero no planificadas aún. |
| **To Do** | Actividades aprobadas y listas para ser trabajadas. |
| **In Progress** | Actividades en desarrollo activo. |
| **Review** | Actividades listas para revisión (PR abierta o pendiente de aprobación). |
| **Done** | Actividades completadas y fusionadas. |

### Información mínima por actividad

Cada tarjeta de actividad debe incluir:

- ✅ **Descripción:** explicación clara de lo que se debe realizar.
- ✅ **Objetivo:** qué se pretende lograr.
- ✅ **Criterios de aceptación:** condiciones para considerar la actividad terminada.
- ✅ **Tareas:** subtareas específicas (cuando aplique).
- ✅ **Responsable:** integrante asignado.
- ✅ **Fecha límite:** fecha de entrega.

### Asignación de responsabilidades

- Cada actividad tiene **un único responsable**.
- El responsable es el encargado de mover la tarjeta entre columnas.
- El líder del equipo hace seguimiento semanal del avance.

---

## Comunicación del Equipo

- **Plataforma:** WhatsApp (grupo de coordinación).
- **Reuniones:** sesiones semanarias de revisión de avance.
- **Horario de trabajo:** lunes a viernes, horario académico.
- **Bloqueos:** cualquier integrante puede elevar un bloqueo al líder para su rápida resolución.

---

## Licencia

Proyecto académico desarrollado para el curso de FrontEnd 1 — CESDE, 2025.
