import { useEffect, useState } from "react";
import Titulo from "../../../ui/Titulo/Titulo";
import { OrdersService } from "../../../services/orders.service";
import { SectionTitle } from "../../../ui/title/Title";
import OrderCard from "../../../ui/OrderCard/OrderCard";
import { estadoToUI, estadoToId } from "../../../ui/Order/OrderMapper";
import "./Sales.css";

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState("todos");

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

  const contarPorEstado = (estado) => {
    return orders.filter(o => o.estado_ui === estado).length;
  };
  const obtenerPedidosFiltrados = () => {
    if (filtroActivo === "todos") {
      return orders;
    }
    return orders.filter(o => o.estado_ui === filtroActivo);
  };

  const pedidosFiltrados = obtenerPedidosFiltrados();

  if (loading) {
    return (
      <div className="admin-container">
        <Titulo titulo="Gestión de Pedidos" />
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <p className="loading">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <Titulo titulo="Gestión de Pedidos" />
        <div className="error-wrapper">
          <p className="error">{error}</p>
          <button className="btn-retry" onClick={loadOrders}>
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="sales-header">
        <Titulo titulo="Gestión de Pedidos" />
        <div className="header-actions">
          <button className="btn-actualizar" onClick={loadOrders}>
            🔄 Actualizar
          </button>
        </div>
      </div>

      <div className="filtros-sales">
        <button
          className={`filtro-sales-btn ${filtroActivo === "todos" ? "activo" : ""}`}
          onClick={() => setFiltroActivo("todos")}
        >
          <span className="filtro-texto">Todos</span>
          <span className="filtro-count">{orders.length}</span>
        </button>
        
        <button
          className={`filtro-sales-btn ${filtroActivo === "cola" ? "activo" : ""}`}
          onClick={() => setFiltroActivo("cola")}
        >
          <span className="punto-estado cola"></span>
          <span className="filtro-texto">Pendiente</span>
          <span className="filtro-count">{contarPorEstado("cola")}</span>
        </button>

        <button
          className={`filtro-sales-btn ${filtroActivo === "preparacion" ? "activo" : ""}`}
          onClick={() => setFiltroActivo("preparacion")}
        >
          <span className="punto-estado preparacion"></span>
          <span className="filtro-texto">En preparación</span>
          <span className="filtro-count">{contarPorEstado("preparacion")}</span>
        </button>

        <button
          className={`filtro-sales-btn ${filtroActivo === "listo" ? "activo" : ""}`}
          onClick={() => setFiltroActivo("listo")}
        >
          <span className="punto-estado listo"></span>
          <span className="filtro-texto">Listo</span>
          <span className="filtro-count">{contarPorEstado("listo")}</span>
        </button>

        <button
          className={`filtro-sales-btn ${filtroActivo === "entregado" ? "activo" : ""}`}
          onClick={() => setFiltroActivo("entregado")}
        >
          <span className="punto-estado entregado"></span>
          <span className="filtro-texto">Entregado</span>
          <span className="filtro-count">{contarPorEstado("entregado")}</span>
        </button>

        <button
          className={`filtro-sales-btn ${filtroActivo === "cancelado" ? "activo" : ""}`}
          onClick={() => setFiltroActivo("cancelado")}
        >
          <span className="punto-estado cancelado"></span>
          <span className="filtro-texto">Cancelado</span>
          <span className="filtro-count">{contarPorEstado("cancelado")}</span>
        </button>
      </div>
      <div className="orders-content">
        {filtroActivo === "todos" ? (
          <>
            <SectionTitle text="Pedidos pendientes" />
            {orders.filter(o => o.estado_ui === "cola").length === 0 ? (
              <p className="empty">No hay pedidos pendientes</p>
            ) : (
              <div className="orders-grid">
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
              </div>
            )}

            <SectionTitle text="Pedidos en preparación" />
            {orders.filter(o => o.estado_ui === "preparacion").length === 0 ? (
              <p className="empty">No hay pedidos en preparación</p>
            ) : (
              <div className="orders-grid">
                {orders
                  .filter(o => o.estado_ui === "preparacion")
                  .map(o => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      onEdit={() => console.log("editar", o)}
                      onFinish={() => changeEstado(o, "listo")}
                    />
                  ))}
              </div>
            )}

            <SectionTitle text="Pedidos listos" />
            {orders.filter(o => o.estado_ui === "listo").length === 0 ? (
              <p className="empty">No hay pedidos listos</p>
            ) : (
              <div className="orders-grid">
                {orders
                  .filter(o => o.estado_ui === "listo")
                  .map(o => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      onEdit={() => console.log("editar", o)}
                      onDeliver={() => changeEstado(o, "entregado")}
                    />
                  ))}
              </div>
            )}

            <SectionTitle text="Pedidos entregados" />
            {orders.filter(o => o.estado_ui === "entregado").length === 0 ? (
              <p className="empty">No hay pedidos entregados</p>
            ) : (
              <div className="orders-grid">
                {orders
                  .filter(o => o.estado_ui === "entregado")
                  .map(o => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      onDetails={() => console.log("detalle", o)}
                    />
                  ))}
              </div>
            )}

            <SectionTitle text="Pedidos cancelados" />
            {orders.filter(o => o.estado_ui === "cancelado").length === 0 ? (
              <p className="empty">No hay pedidos cancelados</p>
            ) : (
              <div className="orders-grid">
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
            )}
          </>
        ) : (
          <>
            <SectionTitle 
              text={`Pedidos ${
                filtroActivo === "cola" ? "pendientes" :
                filtroActivo === "preparacion" ? "en preparación" :
                filtroActivo === "listo" ? "listos" :
                filtroActivo === "entregado" ? "entregados" :
                "cancelados"
              }`} 
            />
            
            {pedidosFiltrados.length === 0 ? (
              <div className="estado-vacio">
                <div className="vacio-icono">📭</div>
                <h3 className="vacio-titulo">No hay pedidos en esta categoría</h3>
                <p className="vacio-texto">
                  Los pedidos aparecerán aquí cuando cambien a este estado
                </p>
              </div>
            ) : (
              <div className="orders-grid">
                {pedidosFiltrados.map(o => (
                  <OrderCard
                    key={o.id}
                    order={o}
                    onEdit={() => console.log("editar", o)}
                    onPrepare={
                      o.estado_ui === "cola" 
                        ? () => changeEstado(o, "preparacion") 
                        : undefined
                    }
                    onFinish={
                      o.estado_ui === "preparacion"
                        ? () => changeEstado(o, "listo")
                        : undefined
                    }
                    onDeliver={
                      o.estado_ui === "listo"
                        ? () => changeEstado(o, "entregado")
                        : undefined
                    }
                    onDetails={
                      o.estado_ui === "cancelado" || o.estado_ui === "entregado"
                        ? () => console.log("detalle", o)
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sales;