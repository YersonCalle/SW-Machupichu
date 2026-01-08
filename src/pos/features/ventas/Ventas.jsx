import React, { useState, useEffect } from 'react';
import { getData } from '../../../utils/utils';
import './Ventas.css';

const Ventas = ({ mesa, alCerrar }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [catActual, setCatActual] = useState('Todas');

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await getData('http://localhost:3000/api/productos');
      if (data) setProductos(data);
    };
    cargarProductos();
  }, []);

  const agregar = (p) => {
    const item = carrito.find(x => x.id === p.id);
    if (item) {
      setCarrito(carrito.map(x => x.id === p.id ? { ...x, cant: x.cant + 1 } : x));
    } else {
      setCarrito([...carrito, { ...p, cant: 1 }]);
    }
  };

  const total = carrito.reduce((acc, p) => acc + (parseFloat(p.precio) * p.cant), 0);

  return (
    <div className="ventas-container">
      <div className="productos-seccion">
        <div className="filtros-categorias">
          {['Todas', 'Comidas', 'Bebidas', 'Postres'].map(c => (
            <button
              key={c}
              onClick={() => setCatActual(c)}
              className={`btn btn-categoria ${catActual === c ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid-productos">
          {productos
            .filter(p => catActual === 'Todas' || p.categoria === catActual)
            .map(p => (
              <div key={p.id} className="card item-pos card-producto" onClick={() => agregar(p)}>
                <div className="icono-producto">🍽️</div>
                <p className="nombre-producto">{p.descripcion}</p>
                <p className="precio-producto">${p.precio}</p>
              </div>
            ))}
        </div>
      </div>
      
      <div className="card panel-carrito">
        <h3>Mesa {mesa.numero}</h3>
        <hr />
        
        <div className="lista-items-carrito">
          {carrito.map(item => (
            <div key={item.id} className="item-carrito">
              <span>{item.cant}x {item.descripcion}</span>
              <span>${(item.precio * item.cant).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="footer-carrito">
          <div className="total-contenedor">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-success btn-block btn-pagar" 
            onClick={() => alert('Enviando a Cocina...')}> PAGAR / IMPRIMIR</button>
          <button className="btn btn-danger btn-block btn-cerrar-carrito" 
          onClick={alCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Ventas;