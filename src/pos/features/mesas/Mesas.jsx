import React, { useState, useEffect } from 'react';
import { getData } from '../../../utils/utils';
import Ventas from '../ventas/Ventas';
import './Mesas.css';

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  useEffect(() => {
    const cargarMesas = async () => {
      const data = await getData('http://localhost:3000/api/mesas');
      if (data) setMesas(data);
    };
    cargarMesas();
  }, []);

  if (mesaSeleccionada) {
    return (
      <Ventas 
        mesa={mesaSeleccionada} 
        alCerrar={() => setMesaSeleccionada(null)} 
      />
    );
  }

  return (
    <div className="mesas-container">
      <h2 className="mesas-titulo">Plano de Mesas - Punto de Venta</h2>
      
      <div className="mesas-grid">
        {mesas.map((mesa) => {
          const estadoDescripcion = mesa.estado?.descripcion || 'libre';
          const esLibre = estadoDescripcion === 'libre';

          return (
            <div 
              key={mesa.id} 
              onClick={() => setMesaSeleccionada(mesa)}
              className={`mesa-card ${esLibre ? 'mesa-libre' : 'mesa-ocupada'}`}
            >
              <h3>Mesa {mesa.numero}</h3>
              <p className="mesa-capacidad">
                Capacidad: {mesa.capacidad} pers.
              </p>
              <span className={`mesa-badge ${esLibre ? 'badge-libre' : 'badge-ocupada'}`}>
                {estadoDescripcion}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mesas;