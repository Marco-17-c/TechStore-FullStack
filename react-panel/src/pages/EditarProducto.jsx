
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    obtenerProductoPorId,
    actualizarProducto
} from '../services/productoService';

function EditarProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        descripcion: ''
    });

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const datos = await obtenerProductoPorId(id);

                setProducto({
                    nombre: datos.nombre || '',
                    categoria: datos.categoria || '',
                    precio: datos.precio,
                    stock: datos.stock,
                    descripcion: datos.descripcion || ''
                });
            } catch (error) {
                setError(
                    error.response?.data?.mensaje ||
                    'No se pudo cargar el producto.'
                );
            } finally {
                setCargando(false);
            }
        };

        cargarProducto();
    }, [id]);

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
            setGuardando(true);

            await actualizarProducto(id, {
                nombre: producto.nombre.trim(),
                categoria: producto.categoria.trim(),
                precio: Number(producto.precio),
                stock: Number(producto.stock),
                descripcion: producto.descripcion.trim()
            });

            navigate('/productos');
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                'No se pudo actualizar el producto.'
            );
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div className="editar-producto-container">
            <h1>Editar producto</h1>

            {error && <p>{error}</p>}

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

                <button type="submit" disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </form>

            <button onClick={() => navigate('/productos')}>
                Cancelar
            </button>
        </div>
    );
}

export default EditarProducto;
