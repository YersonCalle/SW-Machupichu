import { apiRequest } from "../../api/apiConfig";

export const getPedidosActivos = async () => {
  try {
    return await apiRequest("/pedidos");
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
};

export const actualizarEstadoPedido = async (pedidoId, nuevoEstadoId) => {
  try {
    return await apiRequest(`/pedidos/${pedidoId}`, {
      method: "PUT",
      body: JSON.stringify({ 
        estado: nuevoEstadoId
      }),
    });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    throw error;
  }
};

export const cancelarPedido = async (pedidoId) => {
  try {
    return await apiRequest(`/pedidos/${pedidoId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al cancelar pedido:", error);
    throw error;
  }
};