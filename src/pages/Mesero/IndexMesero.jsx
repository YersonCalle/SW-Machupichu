import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Mesero/Mesero.css';

async function fetchMeseroData() {
  const response = await fetch('/src/assets/files/mesero.json');
  return await response.json();
}

function IndexMesero() {
  const [usuario, setUsuario] = useState({ id: 1, nombre: 'Mesero' }); 
  const [mesas, setMesas] = useState([]);
  const [pedidosRecientes, setPedidosRecientes] = useState([]);
  const [pedidosHoy, setPedidosHoy] = useState(0);
  const [ventasHoy, setVentasHoy] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await fetchMeseroData();
        const usuarioId = 1; // adaptar al nombre cuando este la bd 

        const pedidosHoyArray = data.pedidos.filter(
          p =>
            p.usuario_id === usuarioId &&
            new Date(p.fecha_pedido).toDateString() === new Date().toDateString()
        );

        const ventas = pedidosHoyArray
          .filter(p => p.estado === 'entregado')
          .reduce((acc, p) => acc + p.total, 0);

        setMesas(data.mesas);
        setPedidosRecientes(
          data.pedidos
            .filter(p => p.usuario_id === usuarioId)
            .sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido))
            .slice(0, 5)
        );
        setPedidosHoy(pedidosHoyArray.length);
        setVentasHoy(ventas);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  const verPedidoMesa = id => navigate(`/mesero/ver-pedido/${id}`);
  const tomarPedido = (id, numero) => {
    if (window.confirm(`¿Tomar pedido para Mesa ${numero}?`)) {
      navigate(`tomar/${id}`);
    }
  };

  return (
    <>
      <div className="header-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1>¡Hola, {usuario.nombre}!</h1>
              <p className="mb-0">Bienvenido a tu panel de mesero</p>
              <div className="mt-3">
                <button
                  onClick={() => navigate('/mesero/mis-pedidos')}
                  className="btn btn-outline-light btn-action"
                >
                  <i className="fas fa-list me-2"></i>Ver Mis Pedidos
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-outline-light btn-action"
                >
                  <i className="fas fa-sign-out-alt me-2"></i>Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <div className="stat-card">
              <div className="stat-number">{pedidosHoy}</div>
              <div className="stat-label">Pedidos Hoy</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <div className="stat-number">${ventasHoy.toFixed(2)}</div>
              <div className="stat-label">Ventas Hoy</div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-8">
            <h4 className="mb-3">
              <i className="fas fa-chair me-2"></i>Estado de Mesas
            </h4>
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
                  <div className="mesa-numero">Mesa {mesa.numero}</div>
                  <div className="mesa-capacidad">{mesa.capacidad} personas</div>
                  <div className="mesa-estado">
                    {mesa.estado_actual.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="pedidos-recientes">
              <h5>Pedidos Recientes</h5>
              {pedidosRecientes.length === 0 ? (
                <p>No tienes pedidos recientes</p>
              ) : (
                pedidosRecientes.map(pedido => (
                  <div key={pedido.id} className="pedido-item">
                    <strong>Mesa {pedido.mesa_numero}</strong> - {pedido.estado}
                    <br />
                    <small>
                      {new Date(pedido.fecha_pedido).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexMesero;
