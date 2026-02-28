import React, { useState } from 'react';
import './CierreCaja.css';

const CierreCaja = () => {
  // Simulación de datos filtrados por estado
  const [pedidos, setPedidos] = useState([
    { id: 101, total: 500, estado: 'preparacion', metodo: 'Efectivo' },
    { id: 102, total: 1200, estado: 'entregado', metodo: 'Tarjeta' },
    { id: 103, total: 800, estado: 'listo', metodo: 'Efectivo' },
    { id: 104, total: 300, estado: 'listo', metodo: 'Efectivo' },
  ]);

  // Cálculos de lógica de negocio
  const montoInicial = 5000;
  
  const calcularPorEstado = (estado) => 
    pedidos.filter(p => p.estado === estado).reduce((acc, curr) => acc + curr.total, 0);

  const totales = {
    preparacion: calcularPorEstado('preparacion'),
    entregado: calcularPorEstado('entregado'),
    listo: calcularPorEstado('listo'), // Único valor para el corte real
  };

  const totalCajaReal = montoInicial + totales.listo;
  const totalRiesgo = totales.preparacion + totales.entregado;

  return (
    <div className="gestion-caja-container">
      <div className="caja-header">
        <h1>Control de Arqueo y Flujo de Pedidos</h1>
        <div className="badge-info">Corte Parcial Informativo</div>
      </div>

      <div className="dashboard-caja">
        {/* PANEL IZQUIERDO: ESTADOS CRÍTICOS */}
        <div className="panel-monitoreo">
          <h3>📦 Pedidos en Flujo (No Liquidados)</h3>
          <p className="helper-text">Estos montos pueden sufrir devoluciones o cambios.</p>
          
          <div className="cards-estados">
            <div className="card-mini warning">
              <span>En Preparación</span>
              <strong>${totales.preparacion}</strong>
            </div>
            <div className="card-mini info">
              <span>Entregados (Pend. Cierre)</span>
              <strong>${totales.entregado}</strong>
            </div>
          </div>

          <div className="lista-pedidos-flujo">
            <h4>Detalle de transacciones pendientes:</h4>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.filter(p => p.estado !== 'listo').map(p => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td><span className={`tag ${p.estado}`}>{p.estado}</span></td>
                    <td>${p.total}</td>
                    <td><button className="btn-small">Finalizar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PANEL DERECHO: CIERRE CONTABLE */}
        <div className="panel-cierre">
          <h3>💰 Resumen Contable (Solo "Listos")</h3>
          <div className="corte-real-box">
            <div className="row-corte">
              <span>Fondo Inicial:</span>
              <span>${montoInicial}</span>
            </div>
            <div className="row-corte">
              <span>Ventas Liquidadas (Efectivo):</span>
              <span>${totales.listo}</span>
            </div>
            <hr />
            <div className="row-corte total-final">
              <span>TOTAL REAL EN CAJA:</span>
              <span>${totalCajaReal}</span>
            </div>
          </div>

          <div className="alerta-cierre">
            <strong>⚠️ Atención:</strong> Tienes <strong>${totalRiesgo}</strong> en pedidos no finalizados que no se incluyen en este corte.
          </div>

          <form className="form-arqueo">
            <label>Efectivo Físico Contado:</label>
            <input type="number" placeholder="$0.00" className="input-prof" />
            
            <label>Notas de la Jornada:</label>
            <textarea placeholder="Ej: Devolución del pedido #99 por error en cocina..."></textarea>
            
            <button type="button" className="btn-finalizar-cierre">
              Realizar Corte de Caja
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CierreCaja;