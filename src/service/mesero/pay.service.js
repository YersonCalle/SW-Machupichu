import { apiRequest } from "../../api/apiConfig";

export const getMetodosPago = async () => {
  try {
    return await apiRequest("/metodos-pago");
  } catch (error) {
    console.error("Error en getMetodosPago service:", error);
    throw error;
  }
};

export const getMetodoPagoById = async (id) => {
  try {
    return await apiRequest(`/metodos-pago/${id}`);
  } catch (error) {
    console.error("Error en getMetodoPagoById service:", error);
    throw error;
  }
};
