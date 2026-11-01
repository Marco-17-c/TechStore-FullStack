# TechStore - Sistema de Gestión de Productos Full Stack

## 1. Descripción del proyecto

TechStore es una aplicación web Full Stack para gestionar productos de una tienda tecnológica. Permite registrar, consultar, editar y eliminar productos, almacenando la información en MongoDB Atlas.

El sistema cuenta con dos interfaces de usuario: una desarrollada con Angular y otra con React. Ambas consumen la misma API REST.

Además, incorpora autenticación mediante JWT y control de acceso según los roles de administrador y usuario.

## 2. Tecnologías utilizadas

### Frontend principal
- Angular 16
- TypeScript
- HTML y CSS
- HttpClient

### Panel secundario
- React
- JavaScript
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- Mongoose
- API REST
- bcrypt
- JSON Web Token (JWT)
- Helmet
- CORS

### Base de datos
- MongoDB Atlas

## 3. Funcionalidades

### Gestión de productos
- Consultar productos registrados.
- Registrar nuevos productos.
- Editar productos existentes.
- Eliminar productos con confirmación.
- Validar los datos ingresados.
- Almacenar la información en MongoDB Atlas.

### Autenticación y seguridad
- Inicio y cierre de sesión.
- Registro de usuarios mediante la API.
- Encriptación de contraseñas con bcrypt.
- Autenticación mediante tokens JWT.
- Control de acceso basado en roles.
- Protección de operaciones administrativas.
- Envío automático del token desde los clientes mediante interceptores o interceptores de Axios.

### Roles del sistema

**Administrador:**
- Consultar productos.
- Registrar productos.
- Editar productos.
- Eliminar productos.

**Usuario:**
- Iniciar sesión.
- Consultar el inventario.
- No puede registrar, editar ni eliminar productos.

## 4. Datos de los productos

Cada producto contiene:
- Nombre.
- Categoría.
- Precio.
- Stock.
- Descripción.

## 5. Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm.
- Visual Studio Code.
- Angular CLI 16 (se puede utilizar mediante `npx`).
- Una cuenta de MongoDB Atlas.
- Una base de datos configurada en MongoDB Atlas.

## 6. Estructura del proyecto

```text
TechStore/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── react-panel/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## 7. Instalación y ejecución

Se deben utilizar tres terminales independientes para ejecutar el backend, Angular y React.

### 7.1. Configuración del backend

1. Abrir una terminal en la carpeta `backend`.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` a partir de `.env.example`.
4. Configurar las variables de entorno:

```env
PORT=3000
MONGODB_URI=tu_cadena_de_conexion
JWT_SECRET=tu_secreto_seguro
```

5. Iniciar el servidor:

```bash
node server.js
```

El backend estará disponible en:

`http://localhost:3000`

### 7.2. Ejecución de Angular

1. Abrir una segunda terminal en la carpeta `frontend`.
2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar Angular:

```bash
npx ng serve -o
```

La aplicación estará disponible en:

`http://localhost:4200`

### 7.3. Ejecución de React

1. Abrir una tercera terminal en la carpeta `react-panel`.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` a partir de `.env.example`.
4. Configurar la dirección de la API:

```env
VITE_API_URL=http://localhost:3000/api
```

5. Ejecutar React:

```bash
npm run dev
```

El panel estará disponible normalmente en:

`http://localhost:5173`

## 8. Endpoints principales de la API

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/usuarios/perfil` | Consultar perfil autenticado |
| GET | `/api/usuarios/admin` | Acceso exclusivo de administrador |
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Consultar producto |
| POST | `/api/productos` | Registrar producto (admin) |
| PUT | `/api/productos/:id` | Actualizar producto (admin) |
| DELETE | `/api/productos/:id` | Eliminar producto (admin) |

Las operaciones administrativas requieren un token JWT válido y el rol correspondiente.

## 9. Seguridad y variables de entorno

- El archivo `.env` contiene información privada y no debe publicarse.
- El archivo `.gitignore` excluye los archivos `.env` y las carpetas `node_modules`.
- El archivo `.env.example` contiene únicamente plantillas de configuración.
- Las contraseñas se almacenan utilizando bcrypt.
- Las rutas administrativas están protegidas mediante JWT y validación de roles.

## 10. Autor

Proyecto académico desarrollado como trabajo integrador de Desarrollo de Aplicaciones Web Full Stack.

## Aplicaciones desplegadas

- **Backend (Render):** https://techstore-backend-34ob.onrender.com
- **Panel Angular (Vercel):** https://tech-store-full-stack-kohl.vercel.app/
- **Panel React (Vercel):** https://tech-store-full-stack-fhgo.vercel.app/login