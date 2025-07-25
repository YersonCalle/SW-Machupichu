import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Mesero/Mesero.css'

function IndexMesero() {
  const [usuario, setUsuario] = useState({});
  const [mesas, setMesas] = useState([]);
  const [pedidosRecientes, setPedidosRecientes] = useState([]);
  const [pedidosHoy, setPedidosHoy] = useState(0);
  const [ventasHoy, setVentasHoy] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/src/assets/files/mesero.json')
      .then(response => response.json())
      .then(data => {
        const pedidosHoyArray = data.pedidos.filter(p =>
          p.usuario_id === data.usuarioActivo.id &&
          new Date(p.fecha_pedido).toDateString() === new Date().toDateString()
        );

        const ventas = pedidosHoyArray
          .filter(p => p.estado === 'entregado')
          .reduce((acc, p) => acc + p.total, 0);

        setUsuario(data.usuarioActivo);
        setMesas(data.mesas);
        setPedidosRecientes(pedidosHoyArray.slice(0, 5));
        setPedidosHoy(pedidosHoyArray.length);
        setVentasHoy(ventas);
      })
      .catch(error => console.error('Error al cargar datos:', error));
  }, []);

  const verPedidoMesa = id => navigate(`/mesero/ver-pedido/${id}`);
  const tomarPedido = (id, numero) => {
    if (window.confirm(`¿Tomar pedido para Mesa ${numero}?`)) {
      navigate(`/mesero/tomar-pedidos/${id}`);
    }
  };

  return (
    <div>
      <div className="welcome-section">
        <div className="container">
          <h1 className="welcome-title">¡Hola, {usuario.nombre}!</h1>
          <p className="welcome-subtitle">Bienvenido a tu panel de mesero</p>
          <div className="quick-actions">
            <a href="/mis" className="quick-action-btn">
              <i className="fas fa-list me-2"></i>Ver Mis Pedidos
            </a>
            <a href="/" className="quick-action-btn">
              <i className="fas fa-sign-out-alt me-2"></i>Salir
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mesa-grid">
          {mesas.map(mesa => (
            <div
              key={mesa.id}
              className={`mesa-card ${
                mesa.estado_actual === 'libre' ? 'mesa-libre' : 'mesa-ocupada'
              }`}
              onClick={() =>
                mesa.estado_actual === 'libre'
                  ? tomarPedido(mesa.id, mesa.numero)
                  : verPedidoMesa(mesa.id)
              }
            >
              <div className="mesa-icon"><i className="fas fa-chair"></i></div>
              <div className="mesa-numero">Mesa {mesa.numero}</div>
              <div className="mesa-capacidad">{mesa.capacidad} personas</div>
              <div className="mesa-estado">{mesa.estado_actual.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div className="row p-4">
          <div className="col-md-6">
            <div className="stats-card">
              <div className="stats-icon"><i className="fas fa-clipboard-list"></i></div>
              <div className="stats-number">{pedidosHoy}</div>
              <div className="stats-label">Pedidos Hoy</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stats-card">
              <div className="stats-icon"><i className="fas fa-dollar-sign"></i></div>
              <div className="stats-number">${ventasHoy.toFixed(2)}</div>
              <div className="stats-label">Total Vendido Hoy</div>
            </div>
          </div>
        </div>

        <div className="pedidos-recientes">
          <div className="pedidos-header">
            <h5><i className="fas fa-clock me-2"></i>Pedidos Recientes</h5>
          </div>
          {pedidosRecientes.map(pedido => (
            <div key={pedido.id} className="pedido-item">
              <div className="pedido-numero">Pedido #{pedido.id}</div>
              <div className="pedido-mesa">Mesa {pedido.mesa_numero}</div>
              <span className={`pedido-estado estado-${pedido.estado}`}>
                {pedido.estado.toUpperCase()}
              </span>
            </div>
          ))}
          {pedidosRecientes.length === 0 && (
            <div className="text-muted text-center p-4">No hay pedidos hoy</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IndexMesero;