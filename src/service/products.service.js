import { apiRequest } from "../api/apiConfig";

export const ProductsService = {
  // Obtener todos los productos habilitados
  getAll: () => 
    apiRequest("/productos"),

  // Obtener un producto por ID
  getById: (id) => 
    apiRequest(`/productos/${id}`),

  // Crear un nuevo producto
  create: (producto) =>
    apiRequest("/productos", {
      method: "POST",
      body: JSON.stringify({
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria_id: producto.categoria_id,
        estado: producto.estado ?? true 
      })
    }),

  // Actualizar un producto existente
  update: (id, producto) =>
    apiRequest(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria_id: producto.categoria_id,
        habilitado: producto.habilitado
      })
    }),

  // Deshabilitar producto (soft delete)
  delete: (id) =>
    apiRequest(`/productos/${id}`, {
      method: "DELETE"
    }),

  // Métodos de conveniencia adicionales:

  // Habilitar un producto deshabilitado
  enable: (id) =>
    apiRequest(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ habilitado: true })
    }),

  // Deshabilitar un producto
  disable: (id) =>
    apiRequest(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ habilitado: false })
    }),

  // Actualizar solo el precio
  updatePrice: (id, nuevoPrecio) =>
    apiRequest(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ precio: nuevoPrecio })
    })
};