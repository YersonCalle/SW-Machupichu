import { apiRequest } from "../api/apiConfig";

export const categoryService = {
  getAll: () => apiRequest("/categorias"),

  create: (catData) =>
    apiRequest("/categorias", {
      method: "POST",
      body: JSON.stringify(catData),
    }),

  update: (id, catData) =>
    apiRequest(`/categorias/${id}`, {
      method: "PUT",
      body: JSON.stringify(catData),
    }),

  delete: (id) =>
    apiRequest(`/categorias/${id}`, {
      method: "DELETE",
    }),
};
