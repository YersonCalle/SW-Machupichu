import React, { useEffect, useState } from "react";
import { getProductos, crearPedido, getPedidoById } from "../../../service/mesero/sales.service";
import { getMetodosPago } from "../../../service/mesero/pay.service";
import Pago from "../../../ui/Pago/Pago";
import Detalle from "../detalle/DetallePedido";
import "./Ventas.css";

const Ventas = ({ mesa, pedidoExistente, alCerrar }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [catActual, setCatActual] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [procesandoPedido, setProcesandoPedido] = useState(false);
  const [notificacion, setNotificacion] = useState(null);
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [vistaActual, setVistaActual] = useState("productos");
  
  // Estados para método de pago
  const [metodosPago, setMetodosPago] = useState([]);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);

  useEffect(() => {
    cargarProductos();
    cargarMetodosPago();
    
    if (pedidoExistente) {
      const itemsDelPedido = pedidoExistente.detalles.map((detalle) => ({
        id: detalle.producto_id,
        descripcion: detalle.descripcion,
        precio: detalle.precio_unitario,
        cant: detalle.cantidad,
      }));
      setCarrito(itemsDelPedido);
      // Pre-seleccionar método de pago si existe
      if (pedidoExistente.metodo_pago?.id) {
        setMetodoPagoSeleccionado(pedidoExistente.metodo_pago.id);
      }
      mostrarNotificacion("Pedido cargado para modificación", "info");
    }
  }, [pedidoExistente]);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      mostrarNotificacion("No se pudieron cargar los productos", "error");
    } finally {
      setCargando(false);
    }
  };

  const cargarMetodosPago = async () => {
    try {
      const data = await getMetodosPago();
      setMetodosPago(data);
      // Pre-seleccionar Efectivo por defecto (id: 1)
      if (data.length > 0 && !metodoPagoSeleccionado) {
        setMetodoPagoSeleccionado(1);
      }
    } catch (error) {
      console.error("Error al cargar métodos de pago:", error);
      mostrarNotificacion("Error al cargar métodos de pago", "error");
    }
  };

  const mostrarNotificacion = (mensaje, tipo = "info") => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

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
    mostrarNotificacion(`${p.descripcion} agregado al pedido`, "success");
  };

  const modificarCantidad = (id, accion) => {
    setCarrito(
      carrito
        .map((i) => {
          if (i.id === id) {
            const nuevaCant = accion === "aumentar" ? i.cant + 1 : i.cant - 1;
            return { ...i, cant: nuevaCant };
          }
          return i;
        })
        .filter((i) => i.cant > 0)
    );
  };

  const eliminarItem = (id) => {
    setCarrito(carrito.filter((i) => i.id !== id));
    mostrarNotificacion("Producto eliminado del pedido", "info");
  };

  const limpiarCarrito = () => {
    if (carrito.length === 0) return;
    
    if (window.confirm("¿Estás seguro de vaciar el carrito?")) {
      setCarrito([]);
      mostrarNotificacion("Carrito vaciado", "info");
    }
  };

  const total = carrito.reduce((acc, i) => acc + i.cant * parseFloat(i.precio), 0);

  const generarPedido = async () => {
    if (carrito.length === 0) {
      mostrarNotificacion("El pedido está vacío", "error");
      return;
    }

    if (!metodoPagoSeleccionado) {
      mostrarNotificacion("Por favor selecciona un método de pago", "error");
      return;
    }

    const metodoPago = metodosPago.find((m) => m.id === metodoPagoSeleccionado);
    const confirmacion = window.confirm(
      `¿Generar pedido para Mesa ${mesa.id}?\n\nTotal: $${total.toFixed(2)}\nProductos: ${carrito.length}\nMétodo de Pago: ${metodoPago?.descripcion}\n\nEl pedido quedará en estado PENDIENTE.`
    );

    if (!confirmacion) return;
    
    const now = new Date();
    const numeroPedido = parseInt(
      `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${String(now.getMilliseconds()).padStart(3, '0')}`
    );

    const payload = {
      numero_pedido: numeroPedido,
      fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
      mesa: mesa.id,
      estado: 1, // Estado PENDIENTE
      metodo_pago: metodoPagoSeleccionado,
      items: carrito.map((i) => ({
        producto: i.id,
        cantidad: i.cant,
        precio_unitario: parseFloat(i.precio),
      })),
    };

    try {
      setProcesandoPedido(true);
      const resultado = await crearPedido(payload);
      
      mostrarNotificacion("✅ Pedido generado correctamente", "success");
      const pedidoCompleto = await getPedidoById(resultado.pedido_id);
      
      setPedidoCreado(pedidoCompleto);
      setVistaActual("resumen");
      setCarrito([]);
    } catch (error) {
      console.error("❌ Error al crear pedido:", error);
      mostrarNotificacion(
        error.message || "Error al crear el pedido",
        "error"
      );
    } finally {
      setProcesandoPedido(false);
    }
  };

  const handleVolverAProductos = () => {
    setVistaActual("productos");
    setPedidoCreado(null);
  };

  const handleModificarPedido = () => {
    const itemsDelPedido = pedidoCreado.detalles.map((detalle) => ({
      id: detalle.producto_id,
      descripcion: detalle.descripcion,
      precio: detalle.precio_unitario,
      cant: detalle.cantidad,
    }));
    
    setCarrito(itemsDelPedido);
    if (pedidoCreado.metodo_pago?.id) {
      setMetodoPagoSeleccionado(pedidoCreado.metodo_pago.id);
    }
    setVistaActual("productos");
    mostrarNotificacion("Pedido cargado para modificación", "info");
  };

  if (vistaActual === "resumen" && pedidoCreado) {
    return (
      <Detalle
        pedido={pedidoCreado}
        onCerrar={alCerrar}
        onModificar={handleModificarPedido}
      />
    );
  }

  const productosFiltrados = productos.filter((p) => {
    const cumpleCategoria = catActual === "Todas" || p.categoria === catActual;
    const cumpleBusqueda =
      busqueda === "" ||
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const categorias = ["Todas", "Comidas", "Bebidas", "Postres"];

  return (
    <div className="ventas-container">
      {notificacion && (
        <div className={`notificacion notificacion-${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}
      
      <div className="productos-seccion">
        <div className="header-productos">
          <div className="busqueda-container">
            <svg
              className="icono-busqueda"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                className="btn-limpiar-busqueda"
                onClick={() => setBusqueda("")}
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="filtros-categorias">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCatActual(c)}
              className={`btn btn-categoria ${
                catActual === c ? "btn-primary" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        
        {cargando ? (
          <div className="cargando-productos">
            <div className="spinner"></div>
            <p>Cargando productos...</p>
          </div>
        ) : (
          <div className="grid-productos">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <div
                  key={p.id}
                  className="card card-producto"
                  onClick={() => agregar(p)}
                >
                  <div className="icono-producto">🍽️</div>
                  <div className="nombre-producto">
                    <b>{p.descripcion}</b>
                  </div>
                  <p className="precio-producto">${parseFloat(p.precio).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <div className="sin-productos">
                <p>No se encontraron productos</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card panel-carrito">
        <div className="header-carrito">
          <div className="info-mesa">
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
            <div>
              <h3>Mesa {mesa.id}</h3>
              <span className="estado-mesa">{mesa.estado?.descripcion || "Activa"}</span>
            </div>
          </div>
          {carrito.length > 0 && (
            <button className="btn-vaciar-carrito" onClick={limpiarCarrito}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Vaciar
            </button>
          )}
        </div>

        <hr />
        
        <div className="lista-items-carrito">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p>El carrito está vacío</p>
              <small>Selecciona productos para agregar al pedido</small>
            </div>
          ) : (
            carrito.map((i) => (
              <div key={i.id} className="item-carrito">
                <div className="item-info">
                  <span className="item-nombre">{i.descripcion}</span>
                  <span className="item-precio-unitario">
                    ${parseFloat(i.precio).toFixed(2)} c/u
                  </span>
                </div>

                <div className="item-controles">
                  <div className="cantidad-controles">
                    <button
                      className="btn-cantidad"
                      onClick={() => modificarCantidad(i.id, "disminuir")}
                    >
                      −
                    </button>
                    <span className="cantidad">{i.cant}</span>
                    <button
                      className="btn-cantidad"
                      onClick={() => modificarCantidad(i.id, "aumentar")}
                    >
                      +
                    </button>
                  </div>

                  <span className="item-subtotal">
                    ${(i.cant * parseFloat(i.precio)).toFixed(2)}
                  </span>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarItem(i.id)}
                    title="Eliminar producto"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="footer-carrito">
          {carrito.length > 0 && (
            <>
              <div className="resumen-pedido">
                <div className="detalle-resumen">
                  <span>Productos:</span>
                  <span>{carrito.length}</span>
                </div>
              </div>
              <hr />

              <div className="metodo-pago-ventas">
                <Pago
                  metodosPago={metodosPago}
                  metodoPagoSeleccionado={metodoPagoSeleccionado}
                  onSeleccionarMetodo={setMetodoPagoSeleccionado}
                  required={true}
                />
              </div>

              <hr />
            </>
          )}

          <div className="total-contenedor">
            <span>TOTAL:</span>
            <span className="total-monto">${total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-success btn-pagar"
            onClick={generarPedido}
            disabled={carrito.length === 0 || !metodoPagoSeleccionado || procesandoPedido}
          >
            {procesandoPedido ? (
              <>
                <div className="spinner-small"></div>
                Procesando...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                GENERAR PEDIDO
              </>
            )}
          </button>

          <button
            className="btn btn-secondary btn-cerrar-carrito"
            onClick={alCerrar}
            disabled={procesandoPedido}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Volver a Mesas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ventas;