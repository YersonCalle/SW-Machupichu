import { apiRequest } from "../api/apiConfig";

export const cajaService = {
  getHoy: () => apiRequest("/caja/hoy"),

  abrir: (fondo_inicial) =>
    apiRequest("/caja/abrir", {
      method: "POST",
      body: JSON.stringify({ fondo_inicial }),
    }),

  getResumen: () => apiRequest("/caja/resumen"),

  corte: (tipo, observaciones) =>
    apiRequest("/caja/corte", {
      method: "POST",
      body: JSON.stringify({ tipo, observaciones }),
    }),

  updateObservaciones: (observaciones) =>
    apiRequest("/caja/observaciones", {
      method: "PATCH",
      body: JSON.stringify({ observaciones }),
    }),
};