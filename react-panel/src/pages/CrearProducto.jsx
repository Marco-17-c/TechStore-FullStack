
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { crearProducto } from '../services/productoService';

function CrearProducto() {
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        descripcion: ''
    });

    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setProducto({
            ...producto,
            [name]: value
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        setError('');
        setMensaje('');

        if (
            producto.nombre.trim().length < 2 ||
            !producto.categoria.trim() ||
            Number(producto.precio) <= 0 ||
            producto.stock === '' ||
            !Number.isInteger(Number(producto.stock)) ||
            Number(producto.stock) < 0
        ) {
            setError('Verifica los campos y sus valores.');
            return;
        }

        try {
            setCargando(true);

            await crearProducto({
                ...producto,
                nombre: producto.nombre.trim(),
                categoria: producto.categoria.trim(),
                precio: Number(producto.precio),
                stock: Number(producto.stock)
            });

            setMensaje('Producto registrado correctamente.');

            setTimeout(() => {
                navigate('/productos');
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                'No se pudo registrar el producto.'
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="crear-producto-container">
            <h1>Registrar producto</h1>

            <form onSubmit={manejarEnvio}>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={manejarCambio}
                    minLength="2"
                    required
                />

                <label>Categoría</label>
                <input
                    type="text"
                    name="categoria"
                    value={producto.categoria}
                    onChange={manejarCambio}
                    required
                />

                <label>Precio</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={manejarCambio}
                    min="0.01"
                    step="0.01"
                    required
                />

                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={manejarCambio}
                    min="0"
                    step="1"
                    required
                />

                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={manejarCambio}
                />

                {error && <p>{error}</p>}
                {mensaje && <p>{mensaje}</p>}

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Registrando...' : 'Registrar producto'}
                </button>
            </form>

            <button onClick={() => navigate('/productos')}>
                Volver a productos
            </button>
        </div>
    );
}

export default CrearProducto;
