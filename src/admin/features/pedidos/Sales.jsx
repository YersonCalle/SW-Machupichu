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

  const [modalCancelar, setModalCancelar] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [cancelando, setCancelando] = useState(false);

  // Modal detalles
  const [modalDetalle, setModalDetalle] = useState(null);

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

  const abrirModalCancelar = (order) => {
    setModalCancelar(order);
    setMotivo("");
  };

  const confirmarCancelacion = async () => {
    if (!modalCancelar) return;
    setCancelando(true);
    try {
      await OrdersService.cancel(modalCancelar.id, motivo);
      setModalCancelar(null);
      setMotivo("");
      await loadOrders();
    } catch (err) {
      console.error("Error cancelando pedido:", err);
      alert("Error al cancelar el pedido");
    } finally {
      setCancelando(false);
    }
  };
  const contarPorEstado = (estado) => orders.filter(o => o.estado_ui === estado).length;
  const obtenerPedidosFiltrados = () =>
    filtroActivo === "todos" ? orders : orders.filter(o => o.estado_ui === filtroActivo);
  const pedidosFiltrados = obtenerPedidosFiltrados();

  const renderCard = (o) => (
    <OrderCard
      key={o.id}
      order={o}
      onCancel={o.estado_ui !== "cancelado" ? () => abrirModalCancelar(o) : undefined}
      onPrepare={o.estado_ui === "cola" ? () => changeEstado(o, "preparacion") : undefined}
      onFinish={o.estado_ui === "preparacion" ? () => changeEstado(o, "listo") : undefined}
      onDeliver={o.estado_ui === "listo" ? () => changeEstado(o, "entregado") : undefined}
      onDetails={o.estado_ui === "cancelado" || o.estado_ui === "entregado"
        ? () => setModalDetalle(o) : undefined}
    />
  );

  if (loading) return (
    <div className="admin-container">
      <Titulo titulo="Gestión de Pedidos" />
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p className="loading">Cargando pedidos...</p>
      </div>
    </div>
  );

  if (error) 
    return (
    <div className="admin-container">
      <Titulo titulo="Gestión de Pedidos" />
      <div className="error-wrapper">
        <p className="error">{error}</p>
        <button className="btn-retry" onClick={loadOrders}>🔄 Reintentar</button>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <div className="sales-header">
        <Titulo titulo="Gestión de Pedidos" />
        <div className="header-actions">
          <button className="btn-actualizar" onClick={loadOrders}>🔄 Actualizar</button>
        </div>
      </div>

      <div className="filtros-sales">
        {[
          { key: "todos", label: "Todos", count: orders.length },
          { key: "cola", label: "Pendiente", count: contarPorEstado("cola") },
          { key: "preparacion", label: "En preparación", count: contarPorEstado("preparacion") },
          { key: "listo", label: "Listo", count: contarPorEstado("listo") },
          { key: "entregado", label: "Entregado", count: contarPorEstado("entregado") },
          { key: "cancelado", label: "Cancelado", count: contarPorEstado("cancelado") },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            className={`filtro-sales-btn ${filtroActivo === key ? "activo" : ""}`}
            onClick={() => setFiltroActivo(key)}
          >
            {key !== "todos" && <span className={`punto-estado ${key}`}></span>}
            <span className="filtro-texto">{label}</span>
            <span className="filtro-count">{count}</span>
          </button>
        ))}
      </div>

      <div className="orders-content">
        {filtroActivo === "todos" ? (
          <>
            {["cola", "preparacion", "listo", "entregado", "cancelado"].map((estado) => (
              <div key={estado}>
                <SectionTitle text={
                  estado === "cola" ? "Pedidos pendientes" :
                  estado === "preparacion" ? "Pedidos en preparación" :
                  estado === "listo" ? "Pedidos listos" :
                  estado === "entregado" ? "Pedidos entregados" :
                  "Pedidos cancelados"
                } />
                {orders.filter(o => o.estado_ui === estado).length === 0
                  ? <p className="empty">No hay pedidos en esta categoría</p>
                  : <div className="orders-grid">
                      {orders.filter(o => o.estado_ui === estado).map(renderCard)}
                    </div>
                }
              </div>
            ))}
          </>
        ) : (
          <>
            <SectionTitle text={
              filtroActivo === "cola" ? "Pedidos pendientes" :
              filtroActivo === "preparacion" ? "Pedidos en preparación" :
              filtroActivo === "listo" ? "Pedidos listos" :
              filtroActivo === "entregado" ? "Pedidos entregados" :
              "Pedidos cancelados"
            } />
            {pedidosFiltrados.length === 0 ? (
              <div className="estado-vacio">
                <div className="vacio-icono">📭</div>
                <h3 className="vacio-titulo">No hay pedidos en esta categoría</h3>
                <p className="vacio-texto">Los pedidos aparecerán aquí cuando cambien a este estado</p>
              </div>
            ) : (
              <div className="orders-grid">{pedidosFiltrados.map(renderCard)}</div>
            )}
          </>
        )}
      </div>

      {modalCancelar && (
        <div className="modal-overlay" onClick={() => !cancelando && setModalCancelar(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Cancelar pedido #{modalCancelar.numero_pedido}</h3>
            <p>Mesa {modalCancelar.mesa_id} — ${modalCancelar.total}</p>
            <textarea
              placeholder="Motivo de cancelación (opcional)..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                marginTop: "0.75rem",
                padding: "8px 10px",
                fontSize: "13px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                resize: "none",
                fontFamily: "inherit",
              }}
            />
            <div className="modal-btns" style={{ display: "flex", gap: "8px", marginTop: "1rem" }}>
              <button className="btn secondary" onClick={() => setModalCancelar(null)} disabled={cancelando}>
                Volver
              </button>
              <button className="btn danger" onClick={confirmarCancelacion} disabled={cancelando}>
                {cancelando ? "Cancelando..." : "Confirmar cancelación"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDetalle && (
        <div className="modal-overlay" onClick={() => setModalDetalle(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ margin: 0 }}>Pedido #{modalDetalle.numero_pedido}</h3>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#aaa" }}>
                  Mesa {modalDetalle.mesa_id} — {new Date(modalDetalle.fecha).toLocaleString("es-AR")}
                </p>
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "6px",
                background: modalDetalle.estado_ui === "cancelado" ? "#fff0f0" : "#f0faf4",
                color: modalDetalle.estado_ui === "cancelado" ? "#c0392b" : "#2d7a4f",
              }}>
                {modalDetalle.estado_ui === "cancelado" ? "Cancelado" : "Entregado"}
              </span>
            </div>

            <div style={{ borderTop: "0.5px solid #f0f0f0", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: "11px", color: "#bbb", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                ITEMS
              </p>
              {modalDetalle.detalles?.length > 0 ? (
                modalDetalle.detalles.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    padding: "5px 0",
                    borderBottom: "0.5px solid #f5f5f5"
                  }}>
                    <span style={{ color: "#444" }}>{item.cantidad}x {item.descripcion}</span>
                    <span style={{ fontWeight: 500 }}>${Number(item.subtotal).toLocaleString("es-AR")}</span>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "13px", color: "#aaa" }}>Sin items registrados</p>
              )}
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 500,
              fontSize: "14px",
              paddingTop: "0.5rem",
              borderTop: "0.5px solid #e5e5e5",
              marginBottom: "0.75rem"
            }}>
              <span>Total</span>
              <span>${Number(modalDetalle.total).toLocaleString("es-AR")}</span>
            </div>

            {modalDetalle.estado_ui === "cancelado" && (
              <div style={{
                background: "#fff5f5",
                border: "0.5px solid #fdd",
                borderRadius: "8px",
                padding: "10px 12px",
                marginBottom: "0.75rem"
              }}>
                <p style={{ fontSize: "11px", color: "#c0392b", letterSpacing: "0.06em", marginBottom: "4px" }}>
                  MOTIVO DE CANCELACIÓN
                </p>
                <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>
                  {modalDetalle.motivo_cancelacion || "Sin motivo especificado"}
                </p>
              </div>
            )}

            <button
              className="btn secondary"
              style={{ width: "100%" }}
              onClick={() => setModalDetalle(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;