import React, { useEffect, useState } from "react";
import { 
  getPedidosActivos, 
  actualizarEstadoPedido 
} from "../../../service/mesero/orders.service";
import Titulo from "../../../ui/Titulo/Titulo";
import "./Pedidos.css";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [error, setError] = useState(null);
  const [procesando, setProcesando] = useState(null); // ID del pedido que se está procesando

  const cargarPedidos = async () => {
    try {
      setError(null);
      const data = await getPedidosActivos();
      setPedidos(data);
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
      setError("No se pudieron cargar los pedidos. Intente nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
    const intervalo = setInterval(cargarPedidos, 30000); // Actualizar cada 30 segundos
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
    if (!fecha) return "Sin fecha";
    
    try {
      const date = new Date(fecha);
      const ahora = new Date();
      const diferenciaMs = ahora - date;
      const diferenciaMinutos = Math.floor(diferenciaMs / 60000);
      
      if (diferenciaMinutos < 60) {
        if (diferenciaMinutos < 1) return "Ahora mismo";
        return `Hace ${diferenciaMinutos} min`;
      }
      
      const esHoy = date.toDateString() === ahora.toDateString();
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
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "Fecha inválida";
    }
  };

  const cambiarEstadoPedido = async (pedidoId, nuevoEstadoId) => {
    const confirmacion = window.confirm(
      `¿Está seguro de cambiar el estado del pedido?`
    );
    
    if (!confirmacion) return;

    try {
      setProcesando(pedidoId);
      await actualizarEstadoPedido(pedidoId, nuevoEstadoId);
      await cargarPedidos();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("No se pudo cambiar el estado del pedido");
    } finally {
      setProcesando(null);
    }
  };

  const renderizarAcciones = (pedido) => {
    const estaProcesando = procesando === pedido.id;

    switch (pedido.estado?.id) {
      case 1: // Pendiente
        return (
          <div className="pedido-acciones">
            <button
              className="btn-accion btn-iniciar"
              onClick={() => cambiarEstadoPedido(pedido.id, 2)}
              disabled={estaProcesando}
            >
              {estaProcesando ? (
                <>
                  <span className="spinner-small"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <span className="btn-icono"></span>
                  Iniciar Preparación
                </>
              )}
            </button>
          </div>
        );

      case 2: // En Preparación
        return (
          <div className="pedido-acciones">
            <button
              className="btn-accion btn-completar"
              onClick={() => cambiarEstadoPedido(pedido.id, 3)}
              disabled={estaProcesando}
            >
              {estaProcesando ? (
                <>
                  <span className="spinner-small"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <span className="btn-icono">✓</span>
                  Listo
                </>
              )}
            </button>
          </div>
        );

      case 3: // Listo
        return (
          <div className="pedido-acciones">
            <button
              className="btn-accion btn-entregar"
              onClick={() => cambiarEstadoPedido(pedido.id, 4)}
              disabled={estaProcesando}
            >
              {estaProcesando ? (
                <>
                  <span className="spinner-small"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <span className="btn-icono"></span>
                  Editar
                </>
              )}
            </button>
          </div>
        );

      default:
        return null;
    }
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
      <Titulo titulo="Gestión de Pedidos" />
      
      <div className="pedidos-header">
        <div className="header-left">
          <h1 className="titulo-principal">Pedidos Activos</h1>
        </div>
        <div className="header-right">
          <div className="badge-contador">
            <span className="contador-numero">{pedidosFiltrados.length}</span>
            <span className="contador-texto">
              {filtroEstado === "todos" ? "Total" : "Filtrados"}
            </span>
          </div>
          <button 
            className="btn-actualizar" 
            onClick={cargarPedidos}
            disabled={cargando}
          >
            <span className="btn-icono">🔄</span>
            Actualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="error-mensaje">
          <span className="error-icono">⚠️</span>
          <p>{error}</p>
          <button className="btn-reintentar" onClick={cargarPedidos}>
            Reintentar
          </button>
        </div>
      )}

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
              style={{ borderLeftColor: obtenerColorEstado(pedido.estado?.id) }}
            >
              <div className="pedido-header">
                <div className="pedido-info">
                  <h3 className="mesa-numero">
                    Mesa {pedido.mesa?.numero || pedido.mesa_id || "S/N"}
                  </h3>
                  <span className="pedido-numero">#{pedido.numero_pedido}</span>
                </div>
                <span 
                  className="estado-badge"
                  style={{ backgroundColor: obtenerColorEstado(pedido.estado?.id) }}
                >
                  {pedido.estado?.descripcion || "Sin estado"}
                </span>
              </div>

              <div className="pedido-fecha">
                <span className="icono-reloj">🕐</span>
                {formatearFecha(pedido.fecha)}
              </div>

              <div className="pedido-detalles">
                <div className="detalles-header">
                  <span className="detalles-titulo">Productos</span>
                  <span className="detalles-cantidad">
                    {pedido.detalles?.length || 0} items
                  </span>
                </div>
                {pedido.detalles && pedido.detalles.length > 0 ? (
                  pedido.detalles.map((det, index) => (
                    <div key={index} className="detalle-item">
                      <div className="detalle-descripcion">
                        <span className="cantidad-badge">{det.cantidad}x</span>
                        <span className="producto-nombre">{det.descripcion}</span>
                      </div>
                      <span className="producto-precio">
                        ${((det.cantidad || 0) * (det.precio_unitario || 0)).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="sin-detalles">Sin productos</p>
                )}
              </div>

              <div className="pedido-total">
                <span className="total-label">Total:</span>
                <span className="total-monto">
                  ${parseFloat(pedido.total || 0).toFixed(2)}
                </span>
              </div>

              {renderizarAcciones(pedido)}
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