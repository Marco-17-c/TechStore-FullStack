
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarRegistro = async (e) => {
        e.preventDefault();

        setError('');
        setMensaje('');

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setCargando(true);

        try {
            const respuesta = await register(nombre, correo, password);

            setMensaje(
                respuesta.mensaje || 'Usuario registrado correctamente.'
            );

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                'No se pudo registrar el usuario.'
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={manejarRegistro}>
                <h1>TechStore</h1>

                <h2>Crear cuenta</h2>

                <label>Nombre completo</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    required
                />

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
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                    required
                />

                {error && (
                    <p className="login-error">{error}</p>
                )}

                {mensaje && (
                    <p>{mensaje}</p>
                )}

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Registrando...' : 'Registrarse'}
                </button>

                <p>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;

