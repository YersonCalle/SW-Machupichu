import { apiRequest } from "../api/apiConfig";

export const billsService = {
  getAll: () => apiRequest("/bills/gastos"),

  create: (movimiento, tipoFlujo) =>
    apiRequest("/bills/gasto", {
      method: "POST",
      body: JSON.stringify({
        movimiento_tipo: tipoFlujo,
        item_tipo: movimiento.tipo,
        descripcion: movimiento.descripcion,
        monto: Number(movimiento.monto),
      }),
    }),

  delete: (id) =>
    apiRequest(`/bills/gasto/${id}`, {
      method: "DELETE",
    }),
};