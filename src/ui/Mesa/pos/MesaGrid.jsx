import React from "react";
import MesaCard from "./MesaCard";

const MesasGrid = ({ mesas, onSeleccionarMesa, obtenerEstado, filtroActivo }) => {
  if (mesas.length === 0) {
    return (
      <div className="sin-mesas">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>
          No hay mesas{" "}
          {filtroActivo === "disponible"
            ? "disponibles"
            : filtroActivo === "ocupada"
            ? "ocupadas"
            : ""}{" "}
          en este momento
        </p>
      </div>
    );
  }

  return (
    <div className="mesas-grid">
      {mesas.map((mesa) => (
        <MesaCard
          key={mesa.id}
          mesa={mesa}
          estado={obtenerEstado(mesa)}
          onSeleccionar={() => onSeleccionarMesa(mesa)}
        />
      ))}
    </div>
  );
};

export default MesasGrid;
