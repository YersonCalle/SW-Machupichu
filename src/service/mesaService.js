import { apiRequest } from "../api/apiConfig";

export const mesaService = {
    getAll: () => apiRequest("/mesas"),
  
    create: (mesaData) => apiRequest("/mesas", {
    method: "POST",
    body: JSON.stringify({ ...mesaData, estado: "libre" }),
  }),

    update: (id, mesaData) => apiRequest(`/mesas/${id}`, {
    method: "PUT",
    body: JSON.stringify({
    numero: mesaData.numero,
    capacidad: mesaData.capacidad,
    estado: mesaData.estado
  }),
}),

    delete: (id) => apiRequest(`/mesas/${id}`, {
    method: "DELETE",
  }),
};