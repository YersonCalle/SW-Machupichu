import { apiRequest } from "../api/apiConfig";

export const mesaService = {
  getAll: () => apiRequest("/mesas"),
  getAllStates: () => apiRequest("/mesas/estados"),

  create: (mesa) =>
    apiRequest("/mesas", {
      method: "POST",
      body: JSON.stringify({
        numero: mesa.numero,
        capacidad: mesa.capacidad,
        estado: "disponible",
      }),
    }),

  update: (id, mesa) =>
    apiRequest(`/mesas/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        numero: mesa.numero,
        capacidad: mesa.capacidad,
        estado_id: mesa.estado_id,
      }),
    }),

  delete: (id) =>
    apiRequest(`/mesas/${id}`, {
      method: "DELETE",
    }),
};
