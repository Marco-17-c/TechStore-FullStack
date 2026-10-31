
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>TechStore</h1>

                <button onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </header>

            <main className="dashboard-content">
                <h2>Bienvenido a TechStore</h2>

                <p>
                    Hola, {usuario?.nombre}.
                </p>

                <p>
                    Tu correo: {usuario?.correo}
                </p>

                <p>
                    Tu rol: {usuario?.rol}
                </p>

                <button onClick={() => navigate('/productos')}>
                    Ver productos
                </button>
            </main>
        </div>
    );
}

export default Dashboard;
