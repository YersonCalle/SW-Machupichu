import React, { useEffect, useState } from "react";
import { getMesas } from "../../../service/mesero/tables.service";
import Ventas from "../ventas/Ventas";
import Titulo from "../../../ui/Titulo/Titulo";

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  useEffect(() => {
    getMesas()
      .then(setMesas)
      .catch(console.error);
  }, []);
  const obtenerEstado = (mesa) => {
    if (typeof mesa.estado === "string") return mesa.estado;
    if (mesa.estado?.descripcion) return mesa.estado.descripcion;
    if (mesa.estado_id === 1) return "libre";
    if (mesa.estado_id === 2) return "ocupada";
    return "desconocido";
  };
  if (mesaSeleccionada) {
    return (
      <Ventas
        mesa={mesaSeleccionada}
        alCerrar={() => setMesaSeleccionada(null)}
      />
    );
  }
  return (
    <div>
      <Titulo titulo="Control de Mesas" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {mesas.map((mesa) => {
          const estado = obtenerEstado(mesa);
          const esLibre = estado === "libre";
          return (
            <div
              key={mesa.id}
              onClick={() => setMesaSeleccionada(mesa)}
              style={{
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "white",
                border: `3px solid ${esLibre ? "#16a34a" : "#dc2626"}`,
              }}
            >
              <h3>Mesa {mesa.n || mesa.numero || mesa.id}</h3>
              <b>{estado.toUpperCase()}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mesas;