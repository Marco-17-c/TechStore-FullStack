
import {
    createContext,
    useContext,
    useState
} from 'react';

import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        () => sessionStorage.getItem('token') || ''
    );

    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = sessionStorage.getItem('usuario');

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

    // Iniciar sesión
    const login = async (correo, password) => {
        const respuesta = await api.post('/auth/login', {
            correo,
            password
        });

        const { token, usuario } = respuesta.data;

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('usuario', JSON.stringify(usuario));

        setToken(token);
        setUsuario(usuario);

        return usuario;
    };

    // Cerrar sesión
    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');

        setToken('');
        setUsuario(null);
    };

    const autenticado = Boolean(token && usuario);

    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                autenticado,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para utilizar la autenticación
export function useAuth() {
    return useContext(AuthContext);
}
