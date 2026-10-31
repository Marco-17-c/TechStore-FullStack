# CHANGELOG - TechStore

Registro de cambios y mejoras del proyecto.

## [1.0.0] - 2026-10-31

### Agregado
- Aplicación web de gestión de productos con Angular 16.
- Backend REST desarrollado con Node.js y Express.
- Conexión con MongoDB Atlas mediante Mongoose.
- Operaciones CRUD para productos.
- Registro e inicio de sesión de usuarios.
- Encriptación de contraseñas mediante bcrypt.
- Autenticación mediante tokens JWT.
- Control de acceso según roles de usuario y administrador.
- Protección de rutas y operaciones del backend.
- Interceptor HTTP para enviar el token JWT desde Angular.
- Panel secundario desarrollado con React.
- Navegación mediante React Router.
- Manejo de sesión y estado global mediante Context API.
- Consumo de la API REST desde Angular y React.
- Archivos `.env.example` para facilitar la configuración.
- Reglas `.gitignore` para excluir dependencias, archivos generados y secretos.

### Verificado
- Inicio de sesión como administrador y usuario normal.
- Restricción de operaciones administrativas para usuarios normales.
- Registro, edición y eliminación de productos desde Angular.
- Funcionamiento del CRUD desde React.
- Conexión del backend con MongoDB Atlas.
- Compilación exitosa de Angular.