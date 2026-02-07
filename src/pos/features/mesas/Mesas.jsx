import React, { useEffect, useState } from "react";
import { getMesas } from "../../../service/mesero/tables.service";
import Ventas from "../ventas/Ventas";
import Titulo from "../../../ui/Titulo/Titulo";
import MesasEstadisticas from "../../../ui/Mesa/pos/MesaEstadisticas";
import MesasFiltros from "../../../ui/Mesa/pos/MesaFiltros";
import MesasGrid from "../../../ui/Mesa/pos/MesaGrid";
import "./Mesas.css";

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState("todas"); // todas, disponible, ocupada
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await getMesas();
      setMesas(data);
    } catch (err) {
      console.error("Error al cargar mesas:", err);
      setError("No se pudieron cargar las mesas. Intente nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const obtenerEstadoMesa = (mesa) => {
    return mesa.estado?.descripcion || "desconocido";
  };

  const mesasFiltradas = mesas.filter((mesa) => {
    if (filtro === "todas") return true;
    return obtenerEstadoMesa(mesa) === filtro;
  });

  const estadisticas = {
    total: mesas.length,
    disponibles: mesas.filter((m) => obtenerEstadoMesa(m) === "disponible").length,
    ocupadas: mesas.filter((m) => obtenerEstadoMesa(m) === "ocupada").length,
  };

  const handleSeleccionarMesa = (mesa) => {
    setMesaSeleccionada(mesa);
  };

  const handleCerrarMesa = () => {
    setMesaSeleccionada(null);
    cargarMesas();
  };
  if (mesaSeleccionada) {
    return <Ventas mesa={mesaSeleccionada} alCerrar={handleCerrarMesa} />;
  }

  return (
    <div className="mesas-container">
      <Titulo titulo="Control de Mesas" />
      
      <MesasEstadisticas estadisticas={estadisticas} />

      <MesasFiltros filtroActivo={filtro} onCambiarFiltro={setFiltro} />

      {cargando && (
        <div className="mesas-cargando">
          <div className="spinner"></div>
          <p>Cargando mesas...</p>
        </div>
      )}

      {error && (
        <div className="mesas-error">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>{error}</p>
          <button className="btn-reintentar" onClick={cargarMesas}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <MesasGrid
          mesas={mesasFiltradas}
          onSeleccionarMesa={handleSeleccionarMesa}
          obtenerEstado={obtenerEstadoMesa}
          filtroActivo={filtro}
        />
      )}
    </div>
  );
};

export default Mesas;