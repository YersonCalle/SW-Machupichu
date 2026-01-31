import { apiRequest } from "../api/apiConfig";

export const userService = {
  getAll: () => apiRequest("/usuarios"),
  
  create: (data) => apiRequest("/usuarios", {
    method: "POST",
    body: JSON.stringify(data), 
  }),

  update: (id, data) => apiRequest(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  
  delete: (id) => apiRequest(`/usuarios/${id}`, {
    method: "DELETE",
  }),
};