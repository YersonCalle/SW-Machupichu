import React from "react";

const MesasFiltros = ({ filtroActivo, onCambiarFiltro }) => {
  return (
    <div className="mesas-filtros">
      <button
        className={`filtro-btn ${filtroActivo === "todas" ? "activo" : ""}`}
        onClick={() => onCambiarFiltro("todas")}
      >
        <span className="filtro-dot"></span>
        Todas las Mesas
      </button>
      <button
        className={`filtro-btn ${filtroActivo === "disponible" ? "activo" : ""}`}
        onClick={() => onCambiarFiltro("disponible")}
      >
        <span className="filtro-dot filtro-dot-disponible"></span>
        Disponibles
      </button>
      <button
        className={`filtro-btn ${filtroActivo === "ocupada" ? "activo" : ""}`}
        onClick={() => onCambiarFiltro("ocupada")}
      >
        <span className="filtro-dot filtro-dot-ocupada"></span>
        En preparacion
      </button>
    </div>
  );
};

export default MesasFiltros;