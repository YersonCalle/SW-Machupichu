import { apiRequest } from "../api/apiConfig";

export const userService = {
  getAll: () => apiRequest("/usuarios"),
  
  create: (user) => apiRequest("/usuarios", {
    method: "POST",
    body: JSON.stringify({
      nombre: user.nombre_apellido,
      rol: "",
    }), 
  }),

  update: (id, data) => apiRequest(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  
  delete: (id) => apiRequest(`/usuarios/${id}`, {
    method: "DELETE",
  }),
};