import { useState, useEffect } from "react";
import Titulo from "../../../ui/Titulo/Titulo";
import { billsService } from "../../../services/bills.service";
import "./Gastos.css";

const Gastos = () => {
  const [gastos, setGastos] = useState([]);
  const [ventas, setVentas] = useState([]);

  const [formGasto, setFormGasto] = useState({ tipo: "", descripcion: "", monto: "" });
  const [formVenta, setFormVenta] = useState({ tipo: "", descripcion: "", monto: "" });

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const cargarMovimientos = async () => {
    try {
      const data = await billsService.getAll();
      setGastos(data.filter(item => item.tipo_flujo === "gasto"));
      setVentas(data.filter(item => item.tipo_flujo === "venta"));
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
    }
  };

  const formatearMoneda = (valor) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

  const manejarCambio = (e, setForm, form) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarGasto = async () => {
    if (!formGasto.tipo || !formGasto.descripcion || !formGasto.monto) return;
    try {
      await billsService.create(formGasto, "gasto");
      await cargarMovimientos();
      setFormGasto({ tipo: "", descripcion: "", monto: "" });
    } catch (error) {
      alert("Error al guardar el gasto");
    }
  };

  const agregarVenta = async () => {
    if (!formVenta.tipo || !formVenta.descripcion || !formVenta.monto) return;
    try {
      await billsService.create(formVenta, "venta");
      await cargarMovimientos();
      setFormVenta({ tipo: "", descripcion: "", monto: "" });
    } catch (error) {
      alert("Error al guardar la venta");
    }
  };

  const eliminarMovimiento = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este registro?")) return;
    try {
      await billsService.delete(id);
      await cargarMovimientos();
    } catch (error) {
      alert("Error al eliminar el movimiento");
    }
  };

  const totalGastos = gastos.reduce((acc, g) => acc + Number(g.monto), 0);
  const totalVentas = ventas.reduce((acc, v) => acc + Number(v.monto), 0);

  return (
    <div className="conteiner">
      <Titulo titulo="Gastos Operativos" />
      <div className="contenedor-finanzas">
        <header className="main-header">
          <div className="balance-general">
            Balance:{" "}
            <span className={(totalVentas - totalGastos) >= 0 ? "verde" : "rojo"}>
              {formatearMoneda(totalVentas - totalGastos)}
            </span>
          </div>
        </header>

        <div className="grid-financiero">
{/*gastos*/}
          <section className="columna">
            <div className="header-bloque">
              <h3 className="subtitulo">Gastos</h3>
              <span className="total-badge rojo">-{formatearMoneda(totalGastos)}</span>
            </div>

            <div className="formulario-responsive">
              <input
                name="tipo"
                placeholder="Tipo"
                value={formGasto.tipo}
                onChange={(e) => manejarCambio(e, setFormGasto, formGasto)}
              />
              <input
                name="descripcion"
                placeholder="Descripción"
                value={formGasto.descripcion}
                onChange={(e) => manejarCambio(e, setFormGasto, formGasto)}
              />
              <div className="input-group-btn">
                <input
                  type="number"
                  name="monto"
                  placeholder="Monto"
                  value={formGasto.monto}
                  onChange={(e) => manejarCambio(e, setFormGasto, formGasto)}
                />
                <button className="btn-add btn-g" onClick={agregarGasto}>+</button>
              </div>
            </div>

            <div className="tabla-minimalista">
              <div className="scroll-area">
                {gastos.length === 0 ? (
                  <p className="vacio">Sin movimientos</p>
                ) : (
                  gastos.map((g) => (
                    <div key={g.id} className="tr">
                      <div className="td-info">
                        <span className="main-txt">{g.descripcion}</span>
                        <span className="sub-txt">
                          {new Date(g.fecha).toLocaleDateString("es-AR")} • {g.categoria}
                        </span>
                      </div>
                      <div className="txt-derecha negrita rojo">-{formatearMoneda(g.monto)}</div>
                      <button className="btn-delete" onClick={() => eliminarMovimiento(g.id)}>🗑</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

{/*ventas*/}
          <section className="columna">
            <div className="header-bloque">
              <h3 className="subtitulo">Ventas</h3>
              <span className="total-badge verde">+{formatearMoneda(totalVentas)}</span>
            </div>

            <div className="formulario-responsive">
              <input
                name="tipo"
                placeholder="Tipo"
                value={formVenta.tipo}
                onChange={(e) => manejarCambio(e, setFormVenta, formVenta)}
              />
              <input
                name="descripcion"
                placeholder="Descripción"
                value={formVenta.descripcion}
                onChange={(e) => manejarCambio(e, setFormVenta, formVenta)}
              />
              <div className="input-group-btn">
                <input
                  type="number"
                  name="monto"
                  placeholder="Monto"
                  value={formVenta.monto}
                  onChange={(e) => manejarCambio(e, setFormVenta, formVenta)}
                />
                <button className="btn-add btn-v" onClick={agregarVenta}>+</button>
              </div>
            </div>

            <div className="tabla-minimalista">
              <div className="scroll-area">
                {ventas.length === 0 ? (
                  <p className="vacio">Sin movimientos</p>
                ) : (
                  ventas.map((v) => (
                    <div key={v.id} className="tr">
                      <div className="td-info">
                        <span className="main-txt">{v.descripcion}</span>
                        <span className="sub-txt">
                          {new Date(v.fecha).toLocaleDateString("es-AR")} • {v.categoria}
                        </span>
                      </div>
                      <div className="txt-derecha negrita verde">+{formatearMoneda(v.monto)}</div>
                      <button className="btn-delete" onClick={() => eliminarMovimiento(v.id)}>🗑</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Gastos;