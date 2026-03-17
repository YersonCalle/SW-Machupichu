import { apiRequest } from "../api/apiConfig";
import { OrdersService } from "../services/orders.service";
import { ProductsService } from "../services/products.service";

export const crearPedido = async (datosPedido) => {
  try {
    return await OrdersService.create(datosPedido);
  } catch (error) {
    console.error("Error en crearPedido service:", error);
    throw error;
  }
};

export const getProductos = async () => {
  try {
    return await ProductsService.getAll();
  } catch (error) {
    console.error("Error en getProductos service:", error);
    throw error;
  }
};

export const getPedidoById = async (id) => {
  try {
    return await OrdersService.getById(id);
  } catch (error) {
    console.error("Error en getPedidoById service:", error);
    throw error;
  }
};

export const getPedidoActivoByMesa = async (mesa_id) => {
  try {
    return await apiRequest(`/mesas/${mesa_id}/pedido-activo`);
  } catch (error) {
    console.error("Error en getPedidoActivoByMesa service:", error);
    if (error.status === 404) {
      throw new Error("No hay pedido activo para esta mesa");
    }
    throw error;
  }
};

export const actualizarPedido = async (id, datos) => {
  try {
    return await OrdersService.update(id, datos);
  } catch (error) {
    console.error("Error en actualizarPedido service:", error);
    throw error;
  }
};