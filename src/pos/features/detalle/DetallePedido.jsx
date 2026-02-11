import React, { useEffect, useState } from "react";
import { getMetodosPago } from "../../../service/mesero/pay.service";
import { actualizarPedido } from "../../../service/mesero/sales.service";
import "./DetallePedido.css";

const Detalle = ({ pedido, onCerrar, onModificar }) => {
  const [metodosPago, setMetodosPago] = useState([]);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  useEffect(() => {
    cargarMetodosPago();
  }, []);

  useEffect(() => {
    if (pedido?.metodo_pago?.id) {
      setMetodoPagoSeleccionado(pedido.metodo_pago.id);
    }
  }, [pedido]);

  const cargarMetodosPago = async () => {
    try {
      const data = await getMetodosPago();
      setMetodosPago(data);
    } catch (error) {
      console.error("Error al cargar métodos de pago:", error);
      mostrarNotificacion("Error al cargar métodos de pago", "error");
    }
  };

  const mostrarNotificacion = (mensaje, tipo = "info") => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  const handleCerrarPedidoYCobrar = async () => {
    if (!metodoPagoSeleccionado) {
      mostrarNotificacion("Por favor selecciona un método de pago", "error");
      return;
    }

    const confirmacion = window.confirm(
      `¿Confirmar cobro del pedido #${pedido.numero_pedido}?\n\nTotal: $${parseFloat(pedido.total).toFixed(2)}\nMétodo: ${
        metodosPago.find((m) => m.id === metodoPagoSeleccionado)?.descripcion
      }`
    );

    if (!confirmacion) return;

    try {
      setProcesando(true);
      await actualizarPedido(pedido.id, {
        estado: 2, 
        metodo_pago_id: metodoPagoSeleccionado,
      });

      mostrarNotificacion("✅ Pedido cobrado exitosamente", "success");

      setTimeout(() => {
        onCerrar();
      }, 1500);
    } catch (error) {
      console.error("Error al cerrar pedido:", error);
      mostrarNotificacion(
        error.message || "Error al procesar el cobro",
        "error"
      );
    } finally {
      setProcesando(false);
    }
  };

  const calcularSubtotal = () => {
    return pedido.detalles.reduce(
      (acc, item) => acc + parseFloat(item.subtotal || 0),
      0
    );
  };

  const getIconoMetodoPago = (id) => {
    const iconos = {
      1: "💵", 
      2: "💳", // Tarjeta de Débito
      3: "💳", // Tarjeta de Crédito
      4: "🔄", // Transferencia
      5: "📱", // Mercado Pago
    };
    return iconos[id] || "💰";
  };

  return (
    <div className="resumen-pedido-container">
      {notificacion && (
        <div className={`notificacion notificacion-${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      <div className="resumen-pedido-wrapper">
         <div className="resumen-header">
    <div className="header-info">
      <h2>
        Pedido #{pedido.numero_pedido}
        <span className="mesa-info">Mesa {pedido.mesa_id}</span>
      </h2>

      <div className="estado-badge">
        <span className={`badge badge-${pedido.estado.descripcion.toLowerCase()}`}>
          {pedido.estado.descripcion}
        </span>
      </div>
    </div>
          <button
            className="btn-modificar-pedido"
            onClick={onModificar}
            disabled={procesando}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Modificar Pedido
          </button>
        </div>

        <div className="resumen-content">
          <div className="seccion-detalle">
            <h3 className="seccion-titulo">Detalle del Pedido</h3>
            
            <div className="tabla-container">
              <table className="tabla-pedido">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.detalles.map((item, index) => (
                    <tr key={index}>
                      <td className="producto-nombre">{item.descripcion}</td>
                      <td className="texto-centro">{item.cantidad}</td>
                      <td className="texto-derecha">
                        ${parseFloat(item.precio_unitario).toFixed(2)}
                      </td>
                      <td className="texto-derecha subtotal">
                        ${parseFloat(item.subtotal).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="resumen-totales">
              <div className="total-item">
                <span>Subtotal:</span>
                <span className="total-valor">
                  ${calcularSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="total-item total-final">
                <span>Total a Pagar:</span>
                <span className="total-valor-final">
                  ${parseFloat(pedido.total).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="seccion-acciones">
            <h3 className="seccion-titulo">Acciones</h3>

            <div className="metodo-pago-selector">
              <label className="metodo-pago-label">
                Método de Pago <span className="required">*</span>
              </label>
              <div className="metodos-pago-grid">
                {metodosPago.map((metodo) => (
                  <div
                    key={metodo.id}
                    className={`metodo-pago-card ${
                      metodoPagoSeleccionado === metodo.id ? "seleccionado" : ""
                    }`}
                    onClick={() => setMetodoPagoSeleccionado(metodo.id)}
                  >
                    <div className="metodo-icono">
                      {getIconoMetodoPago(metodo.id)}
                    </div>
                    <div className="metodo-nombre">{metodo.descripcion}</div>
                    {metodoPagoSeleccionado === metodo.id && (
                      <div className="metodo-check">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="btn btn-success btn-cerrar-cobrar"
              onClick={handleCerrarPedidoYCobrar}
              disabled={!metodoPagoSeleccionado || procesando}
            >
              {procesando ? (
                <>
                  <div className="spinner-small"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Cerrar Pedido y Cobrar
                </>
              )}
            </button>

            <button
              className="btn btn-secondary btn-volver"
              onClick={onCerrar}
              disabled={procesando}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Volver a Mesas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
