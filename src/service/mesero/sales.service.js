import { apiRequest } from "../../api/apiConfig";

export const crearPedido = async (datosPedido) => {
  try {
    return await apiRequest("/pedidos", {
      method: "POST",
      body: JSON.stringify(datosPedido),
    });
  } catch (error) {
    console.error("Error en crearPedido service:", error);
    throw error;
  }
};

export const getProductos = async () => {
  try {
    return await apiRequest("/productos");
  } catch (error) {
    console.error("Error en getProductos service:", error);
    throw error;
  }
};

export const getPedidoById = async (id) => {
  try {
    return await apiRequest(`/pedidos/${id}`);
  } catch (error) {
    console.error("Error en getPedidoById service:", error);
    throw error;
  }
};

export const actualizarPedido = async (id, datos) => {
  try {
    return await apiRequest(`/pedidos/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
    });
  } catch (error) {
    console.error("Error en actualizarPedido service:", error);
    throw error;
  }
};
