import React from 'react';
import './DetallePedido.css';

const DetallePedido = ({ pedido, mesaNumero, alCerrar, onModificar }) => {
  return (
    <div className="contenedor-principal-detalle">
      <header className="header-detalle">
        <h2>Pedido #{pedido.numero_pedido} - Mesa {mesaNumero}</h2>
        <div>
            <button className="btn-modificar" onClick={onModificar} style={{marginRight: '10px'}}>+ Añadir Productos</button>
            <button className="btn-danger" onClick={alCerrar}>Volver</button>
        </div>
      </header>
      <div className="grid-detalle">
        <div className="card-detalle">
          <h3>Detalle del Pedido</h3>
          <table className="tabla-productos">
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
                  <td>{item.descripcion}</td>
                  <td>{item.cantidad}</td>
                  <td>${parseFloat(item.precio_unitario).toFixed(2)}</td>
                  <td>${parseFloat(item.subtotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer-tabla">
            <div className="fila-total total-bold">
              <span>Total a Pagar:</span>
              <span className="monto-total">${parseFloat(pedido.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-acciones">
          <h3>Acciones</h3>
          <button className="btn-cobrar">Cerrar Pedido y Cobrar</button>
        </div>
      </div>
    </div>
  );
};

export default DetallePedido;