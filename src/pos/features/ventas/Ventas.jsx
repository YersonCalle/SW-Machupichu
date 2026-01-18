import React, { useEffect, useState } from "react";
import { getProductos, crearPedido } from "../../../service/mesero/sales.service";

const Ventas = ({ mesa, alCerrar }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [catActual, setCatActual] = useState("Todas");

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        alert("No se pudieron cargar los productos");
      });
  }, []);
  const agregar = (p) => {
    const existe = carrito.find((i) => i.id === p.id);
    if (existe) {
      setCarrito(
        carrito.map((i) =>
          i.id === p.id ? { ...i, cant: i.cant + 1 } : i
        )
      );
    } else {
      setCarrito([...carrito, { ...p, cant: 1 }]);
    }
  };
  const total = carrito.reduce((acc, i) => acc + i.cant * i.precio, 0);
 const confirmarPedido = async () => {
    if (carrito.length === 0) {
      alert("El pedido está vacío");
      return;
    }

    const payload = {
      numero_pedido: Math.floor(Math.random() * 1000000), 
      fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
      mesa: mesa.id,
      estado: 1,
      metodo_pago: 1,
      items: carrito.map(i => ({
        producto: i.id,
        cantidad: i.cant,
        precio_unitario: i.precio
      }))
    };

    console.log("📤 ENVIANDO PEDIDO CON NÚMERO CORTO:", payload);

    try {
      await crearPedido(payload);
      alert("✅ Pedido creado correctamente");
      setCarrito([]);
      alCerrar();
    } catch (error) {
      console.error("❌ Error al crear pedido:", error);
      alert(error.message);
    }
  };
  return (
    <div style={{ display: "flex", height: "80vh", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          {["Todas", "Comidas", "Bebidas", "Postres"].map((c) => (
            <button
              key={c}
              onClick={() => setCatActual(c)}
              className={`btn ${catActual === c ? "btn-primary" : ""}`}
              style={{ borderRadius: "20px" }}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "10px",
            overflowY: "auto",
          }}
        >
          {productos
            .filter((p) => catActual === "Todas" || p.categoria === catActual)
            .map((p) => (
              <div
                key={p.id}
                className="card item-pos"
                onClick={() => agregar(p)}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <div style={{ fontSize: "1.5rem" }}>🍽️</div>
                <b>{p.descripcion}</b>
                <p style={{ color: "green" }}>${p.precio}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="card" style={{ width: "350px", padding: "15px" }}>
        <h3>Mesa {mesa.id}</h3>
        <hr />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {carrito.map((i) => (
            <div
              key={i.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>
                {i.cant}x {i.descripcion}
              </span>
              <span>${(i.cant * i.precio).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr />

        <h2>Total: ${total.toFixed(2)}</h2>

        <button
          className="btn btn-success btn-block"
          style={{ padding: "15px" }}
          onClick={confirmarPedido}
        >
          CONFIRMAR PEDIDO
        </button>

        <button
          className="btn btn-danger btn-block"
          style={{ marginTop: "10px" }}
          onClick={alCerrar}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Ventas;