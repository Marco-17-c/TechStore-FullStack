
import api from './api';

// Obtener todos los productos
export const obtenerProductos = async () => {
    const respuesta = await api.get('/productos');
    return respuesta.data;
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
    const respuesta = await api.get(`/productos/${id}`);
    return respuesta.data;
};

// Registrar un producto
export const crearProducto = async (producto) => {
    const respuesta = await api.post('/productos', producto);
    return respuesta.data;
};

// Actualizar un producto
export const actualizarProducto = async (id, producto) => {
    const respuesta = await api.put(`/productos/${id}`, producto);
    return respuesta.data;
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    const respuesta = await api.delete(`/productos/${id}`);
    return respuesta.data;
};
