import React, { useState, useEffect } from 'react';

const estados = ['pendiente', 'preparando', 'listo', 'entregado', 'cancelado'];

const getBadgeClass = (estado) => {
  const clases = {
    pendiente: 'bg-warning',
    preparando: 'bg-info',
    listo: 'bg-success',
    entregado: 'bg-primary',
    cancelado: 'bg-danger',
  };
  return clases[estado] || 'bg-secondary';
};

const Sales = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch('/api/pedidos.json') // <-- Cambiá a tu endpoint real
      .then((res) => res.json())
      .then((data) => setPedidos(data));
  }, []);

  const cambiarEstado = (id, nuevoEstado) => {
    if (window.confirm('¿Cambiar el estado del pedido?')) {
      fetch(`/api/pedidos/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevo_estado: nuevoEstado }),
      })
        .then(() => {
          setPedidos((prev) =>
            prev.map((p) =>
              p.id === id ? { ...p, estado: nuevoEstado } : p
            )
          );
        });
    }
  };

  return (
    <div className="main-content container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="fas fa-clipboard-list me-2"></i>Gestión de Pedidos
        </h2>
      </div>

      {/* Filtro de estado */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="btn-group flex-wrap">
            <input
              type="radio"
              className="btn-check"
              name="filtro"
              id="todos"
              value=""
              checked={filtro === ''}
              onChange={() => setFiltro('')}
            />
            <label className="btn btn-outline-secondary" htmlFor="todos">
              Todos
            </label>
            {estados.map((estado) => (
              <React.Fragment key={estado}>
                <input
                  type="radio"
                  className="btn-check"
                  name="filtro"
                  id={estado}
                  value={estado}
                  checked={filtro === estado}
                  onChange={() => setFiltro(estado)}
                />
                <label
                  className={`btn btn-outline-${getBadgeClass(estado).split('-')[1]}`}
                  htmlFor={estado}
                >
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjetas de pedidos */}
      <div className="row">
        {pedidos
          .filter((p) => filtro === '' || p.estado === filtro)
          .map((pedido) => (
            <div
              key={pedido.id}
              className="col-md-6 col-lg-4 mb-4 pedido-card"
              data-estado={pedido.estado}
            >
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center bg-white">
                  <strong>Pedido #{pedido.id}</strong>
                  <span className={`badge ${getBadgeClass(pedido.estado)}`}>
                    {pedido.estado}
                  </span>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <i className="fas fa-chair me-2 text-muted"></i>Mesa {pedido.mesa_numero}
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-user me-2 text-muted"></i>{pedido.mesero_nombre}
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-clock me-2 text-muted"></i>
                    {new Date(pedido.fecha_pedido).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-utensils me-2 text-muted"></i>{pedido.total_productos} productos
                  </div>
                  <div className="mb-3">
                    <strong className="text-danger">
                      Total: ${pedido.total.toFixed(2)}
                    </strong>
                  </div>

                  {/* Acciones */}
                  {pedido.estado !== 'entregado' && pedido.estado !== 'cancelado' && (
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <ul className="dropdown-menu">
                        {pedido.estado === 'pendiente' && (
                          <>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => cambiarEstado(pedido.id, 'preparando')}
                              >
                                Marcar como Preparando
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => cambiarEstado(pedido.id, 'cancelado')}
                              >
                                Cancelar
                              </button>
                            </li>
                          </>
                        )}
                        {pedido.estado === 'preparando' && (
                          <>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => cambiarEstado(pedido.id, 'listo')}
                              >
                                Marcar como Listo
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => cambiarEstado(pedido.id, 'cancelado')}
                              >
                                Cancelar
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sales;