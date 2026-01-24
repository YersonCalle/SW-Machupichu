import React, { useState, useEffect } from 'react';
import Titulo from '../../../ui/Titulo/Titulo';


const Sales = () => {
  const [pedidos, setPedidos] = useState([]);


  useEffect(() => {
    fetch('../../assets/files/data.json') 
      .then((res) => res.json())
      .then((data) => setPedidos(data));
  }, []);


  return (
    <>
    
    <Titulo titulo="Gestion de Pedidos"/>

    <div className="container-fluid p-4">
      

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
    </>
  );
};

export default Sales;