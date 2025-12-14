import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TomarPedido() {
  const { mesaId } = useParams();
  const navigate = useNavigate();

  const [mesa, setMesa] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({});

  useEffect(() => {
    fetch('/src/assets/files/mesero.json')
      .then((res) => res.json())
      .then((data) => {
        const mesaSeleccionada = data.mesas.find(
          (m) => m.id === parseInt(mesaId)
        );
        setMesa(mesaSeleccionada);

        setCategorias(data.categorias);
        setProductos(data.productos);
      })
      .catch((err) => console.error("Error cargando JSON:", err));
  }, [mesaId]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const nuevo = { ...prev };
      if (nuevo[producto.id]) {
        nuevo[producto.id].cantidad += 1;
        nuevo[producto.id].subtotal =
          nuevo[producto.id].cantidad * producto.precio;
      } else {
        nuevo[producto.id] = {
          ...producto,
          cantidad: 1,
          subtotal: producto.precio,
        };
      }
      return nuevo;
    });
  };

  const calcularTotal = () => {
    return Object.values(carrito).reduce((acc, p) => acc + p.subtotal, 0);
  };

  const crearPedido = () => {
    if (!mesa || Object.keys(carrito).length === 0) {
      alert("Debe seleccionar productos antes de crear un pedido.");
      return;
    }

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos") || "[]");

    const nuevoPedido = {
      id: pedidosGuardados.length + 1,
      mesa_id: mesa.id,
      mesa_numero: mesa.numero,
      estado: "pendiente",
      fecha_pedido: new Date().toISOString(),
      total: calcularTotal(),
      productos: Object.values(carrito).map((p) => ({
        producto_nombre: p.nombre,
        cantidad: p.cantidad,
        precio_unitario: p.precio,
        subtotal: p.subtotal,
      })),
    };

    pedidosGuardados.push(nuevoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));

    alert("✅ Pedido creado exitosamente");
    navigate("/mesero");
  };

  if (!mesa) return <p>Cargando mesa...</p>;

  return (
    <div>
      <h2>Tomar Pedido - Mesa {mesa.numero}</h2>
      <p>Capacidad: {mesa.capacidad} personas</p>
      <p>Estado actual: {mesa.estado_actual}</p>

      {categorias.map((cat) => (
        <div key={cat.id}>
          <h3>{cat.nombre}</h3>
          <ul>
            {productos
              .filter(
                (p) => p.categoria_id === cat.id && p.disponible === true
              )
              .map((p) => (
                <li key={p.id}>
                  {p.nombre} - ${p.precio.toFixed(2)}{" "}
                  <button onClick={() => agregarAlCarrito(p)}>➕</button>
                </li>
              ))}
          </ul>
        </div>
      ))}

      <h3>🛒 Carrito</h3>
      {Object.values(carrito).length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {Object.values(carrito).map((p) => (
            <li key={p.id}>
              {p.nombre} x{p.cantidad} - ${p.subtotal.toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${calcularTotal().toFixed(2)}</h3>
      <button onClick={crearPedido}>✅ Confirmar Pedido</button>
    </div>
  );
}

export default TomarPedido;