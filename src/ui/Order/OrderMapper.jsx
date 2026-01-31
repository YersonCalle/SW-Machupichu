export const estadoToUI = (estado) => {
  const name = estado.descripcion.toLowerCase();

  if (name.includes("cola")) return "cola";
  if (name.includes("prepar")) return "preparacion";
  if (name.includes("termin")) return "terminado";
  if (name.includes("cancel")) return "cancelado";

  return "cola";
};

export const estadoToId = {
  cola: 1,
  preparacion: 2,
  terminado: 3,
  cancelado: 5
};
