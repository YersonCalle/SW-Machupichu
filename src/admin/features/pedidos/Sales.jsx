import { useEffect, useState } from "react";
import Titulo from "../../../ui/Titulo/Titulo";
import { OrdersService } from "../../../service/orderService";
import { SectionTitle } from "../../../ui/title/Title";
import OrderCard from "../../../ui/OrderCard/OrderCard";
import { estadoToUI, estadoToId } from "../../../ui/Order/OrderMapper";
import "./Sales.css";

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await OrdersService.getAll();

      const normalized = data.map(o => ({
        ...o,
        estado_ui: estadoToUI(o.estado)
      }));

      setOrders(normalized);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("No se pudieron cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeEstado = async (order, nuevo) => {
    try {
      await OrdersService.updateStatus(
        order.id,
        estadoToId[nuevo]
      );
      loadOrders();
    } catch (err) {
      console.error("Error cambiando estado:", err);
      alert("Error actualizando pedido");
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <Titulo titulo="Gestión de Pedidos" />
        <p className="loading">Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <Titulo titulo="Gestión de Pedidos" />
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Titulo titulo="Gestión de Pedidos" />

      <SectionTitle text="Pedidos en cola" />

      {orders.filter(o => o.estado_ui === "cola").length === 0 && (
        <p className="empty">No hay pedidos en cola</p>
      )}

      {orders
        .filter(o => o.estado_ui === "cola")
        .map(o => (
          <OrderCard
            key={o.id}
            order={o}
            onEdit={() => console.log("editar", o)}
            onPrepare={() => changeEstado(o, "preparacion")}
          />
        ))}

      <SectionTitle text="Pedidos en preparación" />

      {orders.filter(o => o.estado_ui === "preparacion").length === 0 && (
        <p className="empty">No hay pedidos en preparación</p>
      )}

      {orders
        .filter(o => o.estado_ui === "preparacion")
        .map(o => (
          <OrderCard
            key={o.id}
            order={o}
            onEdit={() => console.log("editar", o)}
            onFinish={() => changeEstado(o, "terminado")}
          />
        ))}

      <SectionTitle text="Pedidos cancelados" />

      {orders.filter(o => o.estado_ui === "cancelado").length === 0 && (
        <p className="empty">No hay pedidos cancelados</p>
      )}

      {orders
        .filter(o => o.estado_ui === "cancelado")
        .map(o => (
          <OrderCard
            key={o.id}
            order={o}
            onDetails={() => console.log("detalle", o)}
          />
        ))}
    </div>
  );
};

export default Sales;