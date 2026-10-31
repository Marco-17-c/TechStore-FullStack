
const jwt = require('jsonwebtoken');

// Verificar si el usuario está autenticado
const verificarToken = (req, res, next) => {
    try {
        const encabezado = req.headers.authorization;

        if (!encabezado || !encabezado.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'Acceso denegado. Debes iniciar sesión.'
            });
        }

        const token = encabezado.split(' ')[1];

        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = datosUsuario;

        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado.'
        });
    }
};

// Verificar el rol del usuario
const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                mensaje: 'Debes iniciar sesión.'
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: 'No tienes permisos para realizar esta acción.'
            });
        }

        next();
    };
};

module.exports = {
    verificarToken,
    verificarRol
};
