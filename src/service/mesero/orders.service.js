import { apiRequest } from "../../api/apiConfig";

export const getPedidosActivos = async () => {
  try {
    // Según tu router.get('/pedidos', getOrders)
    return await apiRequest("/pedidos");
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
  
};
// ... (lo que ya tenías)

export const actualizarEstadoPedido = async (id, nuevoEstado) => {
  try {
    return await apiRequest(`/pedidos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ 
        estado: nuevoEstado,
        fecha_modificacion: new Date().toISOString().slice(0, 19).replace('T', ' ') 
      }),
    });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    throw error;
  }
};