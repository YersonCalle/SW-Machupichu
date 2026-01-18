import React, { useEffect, useState } from "react";
import { getPedidosActivos } from "../../../service/mesero/orders.service";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarPedidos = () => {
    getPedidosActivos()
        .then((data) => {
        setPedidos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarPedidos();
    const intervalo = setInterval(cargarPedidos, 30000);
    return () => clearInterval(intervalo);
  }, []);

  if (cargando) return <div style={{ textAlign: "center", padding: "50px" }}>Cargando monitor...</div>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, color: "#333" }}>📋 Panel de Monitoreo</h2>
        <div style={{ backgroundColor: "#16a34a", color: "white", padding: "8px 15px", borderRadius: "20px", fontWeight: "bold" }}>
          {pedidos.length} PEDIDOS ACTIVOS
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="card"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              padding: "20px",
              borderTop: `6px solid ${pedido.estado?.id === 1 ? "#ffc107" : "#17a2b8"}`, // Amarillo si es pendiente
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <h3 style={{ margin: 0 }}>Mesa {pedido.mesa_id}</h3>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>
                #{pedido.numero_pedido}
              </span>
            </div>
            
            <div style={{ fontSize: "0.8rem", color: "#999", marginBottom: "15px" }}>
              📅 {new Date(pedido.fecha).toLocaleString()}
            </div>

            <div style={{ marginBottom: "10px" }}>
                <span style={{ 
                    fontSize: "0.75rem", 
                    padding: "3px 8px", 
                    borderRadius: "10px", 
                    backgroundColor: "#e9ecef",
                    fontWeight: "bold" 
                }}>
                    {pedido.estado?.descripcion.toUpperCase()}
                </span>
            </div>

            <hr style={{ border: "0.5px solid #eee" }} />
            <div style={{ minHeight: "100px", margin: "15px 0" }}>
              {pedido.detalles.map((det, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: "500" }}>
                    {det.cantidad}x {det.descripcion}
                  </span>
                  <span style={{ color: "#666" }}>
                    ${(det.cantidad * det.precio_unitario).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr style={{ border: "0.5px solid #eee" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>TOTAL:</span>
              <span style={{ fontWeight: "bold", fontSize: "1.4rem", color: "#2c3e50" }}>
                ${pedido.total}
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button 
                className="btn btn-outline-primary" 
                style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
                onClick={() => window.print()}
              >
                🖨️ Ticket
              </button>
              <button 
                className="btn btn-success" 
                style={{ flex: 1, padding: "10px", borderRadius: "8px", fontWeight: "bold" }}
              >
                Completar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {pedidos.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "100px", color: "#888" }}>
            <h3>No hay pedidos activos en este momento</h3>
        </div>
      )}
    </div>
  );
};

export default Pedidos;