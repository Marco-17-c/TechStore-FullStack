
import { Navigate, Routes, Route } from 'react-router-dom';

import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import CrearProducto from './pages/CrearProducto';
import EditarProducto from './pages/EditarProducto';

function RutaProtegida({ children, soloAdmin = false }) {
    const { autenticado, usuario } = useAuth();

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    if (soloAdmin && usuario?.rol !== 'admin') {
        return <Navigate to="/productos" replace />;
    }

    return children;
}

function App() {
    const { autenticado } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate
                        to={autenticado ? '/dashboard' : '/login'}
                        replace
                    />
                }
            />

            <Route path="/login" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <RutaProtegida>
                        <Dashboard />
                    </RutaProtegida>
                }
            />

            <Route
                path="/productos"
                element={
                    <RutaProtegida>
                        <Productos />
                    </RutaProtegida>
                }
            />

           <Route
    path="/crear-producto"
    element={
        <RutaProtegida soloAdmin={true}>
            <CrearProducto />
        </RutaProtegida>
    }
/>

            <Route
    path="/editar-producto/:id"
    element={
        <RutaProtegida soloAdmin={true}>
            <EditarProducto />
        </RutaProtegida>
    }
/>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}

export default App;
