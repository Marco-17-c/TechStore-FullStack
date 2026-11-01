
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarLogin = async (e) => {
        e.preventDefault();

        setError('');
        setCargando(true);

        try {
            await login(correo, password);
            navigate('/dashboard');
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                'No se pudo iniciar sesión. Verifica tus datos.'
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={manejarLogin}>
                <h1>TechStore</h1>

                <h2>Iniciar sesión</h2>

                <label>Correo electrónico</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingresa tu correo"
                    required
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                />

                {error && (
                    <p className="login-error">{error}</p>
                )}

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Ingresando...' : 'Ingresar'}
                </button>

                            <p>
                        ¿No tienes una cuenta?{' '}
                    <Link to="/register">Regístrate aquí</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
