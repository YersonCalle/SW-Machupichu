import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/Mesero/Mesero.css';

function VerPedidoMesa() {
  const { mesaId } = useParams();
  const [mesa, setMesa] = useState(null);
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/src/assets/data/mesero.json')
      .then(res => res.json())
      .then(data => {
        const m = data.mesas.find(m => m.id === parseInt(mesaId));
        if (!m) return navigate('/mesero');

        const p = data.pedidos.find(
          ped => ped.mesa_id === m.id && ['pendiente', 'preparando', 'listo'].includes(ped.estado)
        );

        if (!p) return navigate('/mesero');

        setMesa(m);
        setPedido({ ...p, mesero_nombre: data.usuarioActivo.nombre });
      });
  }, [mesaId, navigate]);

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
    <div>
      <div className="header-pedido">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3><i className="fas fa-clipboard-list me-2"></i>Pedido Mesa {mesa?.numero}</h3>
              <p className="mb-0">Pedido #{pedido?.id} - {pedido?.estado?.toUpperCase()}</p>
            </div>
            <div className="col-md-4 text-end">
              <a href="/mesero" className="quick-action-btn">
                <i className="fas fa-arrow-left me-2"></i>Volver
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-md-8">
            <div className="stats-card">
              <h5><i className="fas fa-utensils me-2"></i>Productos del Pedido</h5>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido?.productos.map((prod, i) => (
                    <tr key={i}>
                      <td>{prod.producto_nombre}</td>
                      <td>{prod.cantidad}</td>
                      <td>${prod.precio_unitario.toFixed(2)}</td>
                      <td>${prod.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3">Total:</th>
                    <th>${pedido?.total.toFixed(2)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stats-card">
              <h5><i className="fas fa-info-circle me-2"></i>Información del Pedido</h5>
              <table className="table table-sm mt-3">
                <tbody>
                  <tr>
                    <td><strong>Pedido #:</strong></td>
                    <td>{pedido?.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Mesa:</strong></td>
                    <td>{mesa?.numero}</td>
                  </tr>
                  <tr>
                    <td><strong>Mesero:</strong></td>
                    <td>{pedido?.mesero_nombre}</td>
                  </tr>
                  <tr>
                    <td><strong>Fecha:</strong></td>
                    <td>{new Date(pedido?.fecha_pedido).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Estado:</strong></td>
                    <td>
                      <span className={`pedido-estado ${getEstadoClase(pedido?.estado)}`}>
                        {pedido?.estado.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Total:</strong></td>
                    <td><strong className="text-danger">${pedido?.total.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerPedidoMesa;