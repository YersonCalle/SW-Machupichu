import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/Mesero/Mesero.css';

function TomarPedido() {
  const { mesaId } = useParams();
  const [mesa, setMesa] = useState(null);
  const [ocupada, setOcupada] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [carrito, setCarrito] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/src/assets/files/mesero.json')
      .then(res => res.json())
      .then(data => {
        const m = data.mesas.find(m => m.id === parseInt(mesaId));
        if (!m) return navigate('/mesero');
        setMesa(m);

        const mesaTienePedido = data.pedidos.some(
          p => p.mesa_id === m.id && ['pendiente', 'preparando', 'listo'].includes(p.estado)
        );
        setOcupada(mesaTienePedido);

        const catMap = {};
        data.categorias.forEach(c => {
          catMap[c.id] = {
            categoria: c,
            productos: data.productos.filter(p => p.categoria_id === c.id && p.disponible)
          };
        });
        setCategorias(data.categorias);
        setProductosPorCategoria(catMap);
      });
  }, [mesaId, navigate]);

  const agregarProducto = (id, nombre, precio) => {
    setCarrito(prev => {
      const nuevo = { ...prev };
      if (nuevo[id]) {
        nuevo[id].cantidad++;
      } else {
        nuevo[id] = { nombre, precio, cantidad: 1 };
      }
      return nuevo;
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito(prev => {
      const nuevo = { ...prev };
      if (cantidad <= 0) {
        delete nuevo[id];
      } else {
        nuevo[id].cantidad = cantidad;
      }
      return nuevo;
    });
  };

  const limpiarPedido = () => setCarrito({});

  const calcularTotal = () =>
    Object.values(carrito).reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const crearPedido = () => {
    if (window.confirm('¿Confirmar creación del pedido?')) {
      console.log('Pedido simulado:', carrito);
      navigate('/mesero');
    }
  };

  return (
    <div>
      <div className="header-pedido">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3><i className="fas fa-utensils me-2"></i>Tomar Pedido - Mesa {mesa?.numero}</h3>
              <p className="mb-0">Capacidad: {mesa?.capacidad} personas</p>
            </div>
            <div className="col-md-4 text-end">
              <a href="/mesero" className="quick-action-btn">
                <i className="fas fa-arrow-left me-2"></i>Volver
              </a>
            </div>
          </div>
        </div>
      </div>

      {ocupada ? (
        <div className="container mt-4">
          <div className="alert alert-warning">
            Esta mesa ya tiene un pedido activo.{' '}
            <a href={`/mesero/ver-pedido/${mesa?.id}`}>Ver pedido actual</a>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-8">
              <h5><i className="fas fa-list me-2"></i>Menú</h5>
              <ul className="nav nav-tabs mb-3">
                {categorias.map((c, i) => (
                  <li key={c.id} className="nav-item">
                    <button
                      className={`nav-link ${i === 0 ? 'active' : ''}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#cat-${c.id}`}
                    >
                      {c.nombre}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                {categorias.map((c, i) => (
                  <div
                    key={c.id}
                    className={`tab-pane fade ${i === 0 ? 'show active' : ''}`}
                    id={`cat-${c.id}`}
                  >
                    <div className="row">
                      {productosPorCategoria[c.id]?.productos.map(prod => (
                        <div key={prod.id} className="col-md-6 col-lg-4 mb-3">
                          <div
                            className="stats-card producto-card"
                            onClick={() => agregarProducto(prod.id, prod.nombre, prod.precio)}
                          >
                            <h6>{prod.nombre}</h6>
                            <p className="text-muted small">{prod.descripcion}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <strong className="text-danger">${prod.precio.toFixed(2)}</strong>
                              <button className="btn btn-sm btn-custom btn-danger-custom">
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="carrito-pedido p-3">
                <h5><i className="fas fa-shopping-cart me-2"></i>Pedido</h5>
                <div style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}>
                  {Object.keys(carrito).length === 0 ? (
                    <p className="text-muted text-center">Selecciona productos del menú</p>
                  ) : (
                    Object.entries(carrito).map(([id, prod]) => {
                      const subtotal = prod.precio * prod.cantidad;
                      return (
                        <div key={id} className="producto-seleccionado">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1">
                              <strong>{prod.nombre}</strong><br />
                              <small className="text-muted">${prod.precio.toFixed(2)} c/u</small>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <button onClick={() => cambiarCantidad(id, prod.cantidad - 1)}>−</button>
                              <span className="mx-2">{prod.cantidad}</span>
                              <button onClick={() => cambiarCantidad(id, prod.cantidad + 1)}>+</button>
                              <button onClick={() => cambiarCantidad(id, 0)}>🗑️</button>
                            </div>
                          </div>
                          <div className="text-end mt-1">
                            <small><strong>${subtotal.toFixed(2)}</strong></small>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <strong>Total:</strong>
                    <strong className="text-danger">${calcularTotal().toFixed(2)}</strong>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-custom btn-danger-custom"
                      disabled={Object.keys(carrito).length === 0}
                      onClick={crearPedido}
                    >
                      <i className="fas fa-check me-2"></i>Crear Pedido
                    </button>
                    <button className="btn btn-custom btn-secondary" onClick={limpiarPedido}>
                      <i className="fas fa-trash me-2"></i>Limpiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TomarPedido;