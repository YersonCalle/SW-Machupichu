import React, { useEffect, useState } from "react";
import { getPedidosActivos } from "../../../service/mesero/orders.service";
import "./Pedidos.css";
import Titulo from "../../../ui/Titulo/Titulo";


const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const cargarPedidos = () => {
    getPedidosActivos()
      .then((data) => {
        setPedidos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarPedidos();
    const intervalo = setInterval(cargarPedidos, 30000);
    return () => clearInterval(intervalo);
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtroEstado === "todos") return true;
    return pedido.estado?.id === parseInt(filtroEstado);
  });

  const obtenerColorEstado = (estadoId) => {
    const colores = {
      1: "var(--pendiente)",
      2: "var(--preparacion)", 
      3: "var(--listo)",
    };
    return colores[estadoId] || "#6b7280";
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const hoy = new Date();
    const esHoy = date.toDateString() === hoy.toDateString();
    
    if (esHoy) {
      return date.toLocaleTimeString("es-ES", { 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    }
    return date.toLocaleString("es-ES", { 
      day: "2-digit", 
      month: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="pedidos-container">
    <Titulo titulo ="Gestion de Pedidos" />
      <div className="pedidos-header">
        <div className="header-left">
          <h1 className="titulo-principal">
            Pedidos
          </h1> 
        </div>
        <div className="header-right">
          <div className="badge-contador">
            <span className="contador-numero">{pedidosFiltrados.length}</span>
            <span className="contador-texto">Pedidos Activos</span>
          </div>
          <button className="btn-actualizar" onClick={cargarPedidos}>
          Actualizar
          </button>
        </div>
      </div>

      <div className="filtros-container">
        <button
          className={`filtro-btn ${filtroEstado === "todos" ? "activo" : ""}`}
          onClick={() => setFiltroEstado("todos")}
        >
          Todos ({pedidos.length})
        </button>
        <button
          className={`filtro-btn ${filtroEstado === "1" ? "activo" : ""}`}
          onClick={() => setFiltroEstado("1")}
        >
          <span className="punto-estado pendiente"></span>
          Pendientes ({pedidos.filter(p => p.estado?.id === 1).length})
        </button>
        <button
          className={`filtro-btn ${filtroEstado === "2" ? "activo" : ""}`}
          onClick={() => setFiltroEstado("2")}
        >
          <span className="punto-estado en-preparacion"></span>
          En Preparación ({pedidos.filter(p => p.estado?.id === 2).length})
        </button>
        <button
          className={`filtro-btn ${filtroEstado === "3" ? "activo" : ""}`}
          onClick={() => setFiltroEstado("3")}
        >
          <span className="punto-estado listo"></span>
          Listos ({pedidos.filter(p => p.estado?.id === 3).length})
        </button>
      </div>

      {pedidosFiltrados.length > 0 ? (
        <div className="pedidos-grid">
          {pedidosFiltrados.map((pedido) => (
            <div
              key={pedido.id}
              className="pedido-card"
              style={{ borderTopColor: obtenerColorEstado(pedido.estado?.id) }}
            >
              <div className="pedido-header">
                <div className="pedido-info">
                  <h3 className="mesa-numero">Mesa {pedido.mesa_id}</h3>
                  <span className="pedido-numero">#{pedido.numero_pedido}</span>
                </div>
                <span 
                  className="estado-badge"
                  style={{ backgroundColor: obtenerColorEstado(pedido.estado?.id) }}
                >
                  {pedido.estado?.descripcion}
                </span>
              </div>
              <div className="pedido-fecha">
                <span className="icono-reloj">🕐</span>
                {formatearFecha(pedido.fecha)}
              </div>
              <div className="pedido-detalles">
                {pedido.detalles.map((det, index) => (
                  <div key={index} className="detalle-item">
                    <div className="detalle-descripcion">
                      <span className="cantidad-badge">{det.cantidad}x</span>
                      <span className="producto-nombre">{det.descripcion}</span>
                    </div>
                    <span className="producto-precio">
                      ${(det.cantidad * det.precio_unitario).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pedido-total">
                <span className="total-label">Total:</span>
                <span className="total-monto">${pedido.total}</span>
              </div>
              <div className="pedido-acciones">
                <button className="btn-accion btn-primario">
                  <span className="btn-icono">✓</span>
                  editar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="estado-vacio">
          <div className="vacio-icono">📭</div>
          <h3 className="vacio-titulo">No hay pedidos activos</h3>
          <p className="vacio-texto">
            {filtroEstado !== "todos" 
              ? "No hay pedidos con este estado en este momento"
              : "Los nuevos pedidos aparecerán aquí automáticamente"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Pedidos;