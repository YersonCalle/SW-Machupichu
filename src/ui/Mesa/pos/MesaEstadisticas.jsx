import React from "react";

const MesasEstadisticas = ({ estadisticas }) => {
  return (
    <div className="mesas-estadisticas">
      <div className="stat-card stat-total">
        <div className="stat-icono">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-numero">{estadisticas.total}</span>
          <span className="stat-label">Total Mesas</span>
        </div>
      </div>

      <div className="stat-card stat-disponibles">
        <div className="stat-icono">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-numero">{estadisticas.disponibles}</span>
          <span className="stat-label">Disponibles</span>
        </div>
      </div>

      <div className="stat-card stat-ocupadas">
        <div className="stat-icono">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-numero">{estadisticas.ocupadas}</span>
          <span className="stat-label">EN PREPARACION</span>
        </div>
      </div>
    </div>
  );
};

export default MesasEstadisticas;