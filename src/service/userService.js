import { apiRequest } from "../api/apiConfig";

export const userService = {
  getAll: () => apiRequest("/usuarios"),
  
  
  delete: (id) => apiRequest(`/usuarios/${id}`, {
    method: "DELETE",
  }),
};