import React from "react";

const MesaCard = ({ mesa, estado, onSeleccionar }) => {
  const esDisponible = estado === "disponible";
  const numeroMesa = mesa.numero;

  return (
    <div
      onClick={onSeleccionar}
      className={`mesa-card ${esDisponible ? "mesa-disponible" : "mesa-ocupada"}`}
    >
      {/* Ícono de mesa */}
      <div className="mesa-icono">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
          <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Número de mesa */}
      <h3 className="mesa-numero">Mesa {numeroMesa}</h3>

      {/* Capacidad */}
      <div className="mesa-capacidad">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>{mesa.capacidad} personas</span>
      </div>

      <div
        className={`mesa-badge ${
          esDisponible ? "badge-disponible" : "badge-ocupada"
        }`}
      >
        <span className="badge-dot"></span>
        {esDisponible ? "Disponible" : "Ocupado"}
      </div>

      {!esDisponible && (
        <div className="mesa-accion">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MesaCard;