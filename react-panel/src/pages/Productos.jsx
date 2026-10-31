
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
    obtenerProductos,
    eliminarProducto
} from '../services/productoService';

function Productos() {
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const esAdministrador = usuario?.rol === 'admin';

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const cargarProductos = async () => {
        try {
            setCargando(true);
            setError('');

            const datos = await obtenerProductos();
            setProductos(datos);
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                'No se pudieron cargar los productos.'
            );
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const manejarEliminacion = async (id, nombre) => {
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar el producto "${nombre}"?`
        );

        if (!confirmar) return;

        try {
            setError('');
            setMensaje('');

            await eliminarProducto(id);

            setMensaje('Producto eliminado correctamente.');

            await cargarProductos();
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                'No se pudo eliminar el producto.'
            );
        }
    };

    return (
        <div className="productos-container">
            <header>
                <h1>TechStore - Productos</h1>

                <button onClick={() => navigate('/dashboard')}>
                    Volver al panel
                </button>
            </header>

            <h2>Inventario de productos</h2>

            {esAdministrador && (
    <button onClick={() => navigate('/crear-producto')}>
        + Registrar producto
    </button>
)}

            {mensaje && <p>{mensaje}</p>}
            {error && <p>{error}</p>}

            {cargando && <p>Cargando productos...</p>}

            {!cargando && !error && productos.length === 0 && (
                <p>No hay productos registrados.</p>
            )}

            {!cargando && productos.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto._id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>
                                    S/ {Number(producto.precio).toFixed(2)}
                                </td>
                                <td>{producto.stock}</td>
                                <td>{producto.descripcion || '-'}</td>

                                <td>
{esAdministrador && (
    <>
        <button
            onClick={() =>
                navigate(
                    `/editar-producto/${producto._id}`
                )
            }
        >
            Editar
        </button>

        <button
            onClick={() =>
                manejarEliminacion(
                    producto._id,
                    producto.nombre
                )
            }
        >
            Eliminar
        </button>
    </>
)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Productos;
