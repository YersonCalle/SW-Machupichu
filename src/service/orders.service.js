import { apiRequest } from "../api/apiConfig";

export const OrdersService = {

  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const query = params ? `?${params}` : "";
    return apiRequest(`/pedidos${query}`);
  },

  getById: (id) => 
    apiRequest(`/pedidos/${id}`),

  getByNumber: (numero) =>
    apiRequest(`/pedidos/porNumeroPedido/${numero}`),

  create: (data) =>
    apiRequest("/pedidos", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  updateStatus: (id, estadoId) =>
    apiRequest(`/pedidos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        estado: estadoId
      })
    }),

  cancel: (id) =>
    apiRequest(`/pedidos/${id}`, {
      method: "DELETE"
    })
};
