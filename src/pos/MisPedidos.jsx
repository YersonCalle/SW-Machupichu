import React, { useEffect, useState } from 'react';
import './Mesero.css';

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [detallePedido, setDetallePedido] = useState(null);

  useEffect(() => {
    fetch('/src/assets/files/mesero.json')
      .then(res => res.json())
      .then(data => {
        setUsuarioId(data.usuarioActivo.id);
        const misPedidos = data.pedidos.filter(p => p.usuario_id === data.usuarioActivo.id);
        setPedidos(misPedidos.slice(0, 50));
      });
  }, []);

  const verDetalle = pedido => {
    setDetallePedido(pedido);
    setDetalleVisible(true);
  };

  const getEstadoClase = estado => {
    switch (estado) {
      case 'pendiente': return 'estado-pendiente';
      case 'preparando': return 'estado-preparando';
      case 'listo': return 'estado-listo';
      case 'entregado': return 'estado-entregado';
      default: return '';
    }
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="fas fa-clipboard-list me-2"></i>Mis Pedidos</h2>
        <a href="/mesero" className="quick-action-btn">
          <i className="fas fa-home me-2"></i>Inicio
        </a>
      </div>

      <div className="row">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="col-md-6 col-lg-4 mb-4">
            <div className="stats-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Pedido #{pedido.id}</strong>
                <span className={`pedido-estado ${getEstadoClase(pedido.estado)}`}>
                  {pedido.estado.toUpperCase()}
                </span>
              </div>
              <div><i className="fas fa-chair me-2"></i>Mesa {pedido.mesa_numero}</div>
              <div><i className="fas fa-clock me-2"></i>{new Date(pedido.fecha_pedido).toLocaleString()}</div>
              <div><i className="fas fa-utensils me-2"></i>{pedido.productos.length} productos</div>
              <div className="mt-2 text-danger"><strong>Total: ${pedido.total.toFixed(2)}</strong></div>
              <button className="btn btn-custom btn-danger-custom mt-3" onClick={() => verDetalle(pedido)}>
                <i className="fas fa-eye me-2"></i>Ver Detalle
              </button>
            </div>
          </div>
        ))}
      </div>

      {pedidos.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No tienes pedidos registrados</h4>
          <p className="text-muted">Comienza tomando tu primer pedido</p>
          <a href="/mesero/tomar-pedido" className="btn btn-custom btn-danger-custom">
            <i className="fas fa-plus me-2"></i>Crear Pedido
          </a>
        </div>
      )}

      {detalleVisible && detallePedido && (
        <div className="modal-overlay" onClick={() => setDetalleVisible(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Detalle del Pedido #{detallePedido.id}</h5>
              <button onClick={() => setDetalleVisible(false)}>✖</button>
            </div>
            <div className="modal-body">
              {detallePedido.productos.map((prod, i) => (
                <div key={i} className="producto-seleccionado">
                  <strong>{prod.producto_nombre}</strong> - {prod.cantidad} x ${prod.precio_unitario.toFixed(2)} =
                  <span className="text-danger ms-2"><strong>${prod.subtotal.toFixed(2)}</strong></span>
                </div>
              ))}
              <div className="mt-3 text-end"><strong>Total: ${detallePedido.total.toFixed(2)}</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MisPedidos;