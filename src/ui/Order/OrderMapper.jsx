/**
 * IDs de estado (backend): 1 Pendiente, 2 En preparación, 3 Listo,
 * 4 Entregado, 5 Cancelado.
 */
export const estadoToUI = (estado) => {
  if (estado == null) return "cola";

  const id = typeof estado === "object" ? estado.id : estado;
  if (typeof id === "number") {
    switch (id) {
      case 1:
        return "cola";
      case 2:
        return "preparacion";
      case 3:
      case 4:
        return "terminado";
      case 5:
        return "cancelado";
      default:
        break;
    }
  }

  const name = (typeof estado === "object" ? estado.descripcion : "")
    ?.toLowerCase?.() ?? "";
  if (!name) return "cola";

  // Orden importa: "pendiente de preparación" no debe caer en preparación.
  if (name.includes("pendiente")) return "cola";
  if (name.includes("cancel") || name.includes("anul")) return "cancelado";
  if (name.includes("listo") || name.includes("entreg")) return "terminado";
  if (name.includes("prepar")) return "preparacion";

  return "cola";
};

export const estadoToId = {
  cola: 1,
  preparacion: 2,
  terminado: 3,
  cancelado: 5
};
