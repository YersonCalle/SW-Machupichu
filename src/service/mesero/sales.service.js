import { apiRequest } from "../../api/apiConfig";

export const crearPedido = async (datosPedido) => {
  try {
    // Es vital que el endpoint coincida con tu router de Node.js
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