import { useState, useEffect, useCallback } from "react";
import Titulo from "../../../ui/Titulo/Titulo";
import { cajaService } from "../../../services/caja.service";
import "./CierreCaja.css";

const fmt = (v) =>
  "$ " + Number(v || 0).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Caja = () => {
  const [caja, setCaja] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalFondo, setModalFondo] = useState(false);
  const [modalCorte, setModalCorte] = useState(null);
  const [inputFondo, setInputFondo] = useState("");
  const [obs, setObs] = useState("");
  const [obsTimer, setObsTimer] = useState(null);

  const cargarDatos = useCallback(async () => {
    try {
      const [resCaja, resResumen] = await Promise.all([
        cajaService.getHoy(),
        cajaService.getResumen(),
      ]);
      setCaja(resCaja.abierta ? resCaja.caja : null);
      setResumen(resResumen);
      if (resCaja.abierta) setObs(resCaja.caja.observaciones || "");
    } catch (e) {
      console.error("Error al cargar caja:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleObs = (val) => {
    setObs(val);
    clearTimeout(obsTimer);
    setObsTimer(
      setTimeout(async () => {
        try {
          await cajaService.updateObservaciones(val);
        } catch (e) {
          console.error("Error al guardar observaciones:", e);
        }
      }, 800)
    );
  };

  const abrirCaja = async () => {
    const fondo = parseFloat(inputFondo) || 0;
    try {
      await cajaService.abrir(fondo);
      setModalFondo(false);
      setInputFondo("");
      await cargarDatos();
    } catch (e) {
      alert(e.message || "Error al abrir caja");
    }
  };

  const realizarCorte = async (tipo) => {
    try {
      const data = await cajaService.corte(tipo, obs);
      alert(
        `${data.message}\nRetirar: ${fmt(data.monto_retirado)}\nNuevo fondo: ${fmt(data.nuevo_fondo)}`
      );
      setModalCorte(null);
      await cargarDatos();
    } catch (e) {
      alert(e.message || "Error al realizar corte");
    }
  };

  const hoy = new Date();
  const fechaStr = hoy
    .toLocaleDateString("es-AR", {
      weekday: "long", day: "numeric",
      month: "long", year: "numeric",
    })
    .toUpperCase();

  const efectivo = resumen?.ventas?.efectivo || 0;
  const transferencia = resumen?.ventas?.transferencia || 0;
  const gastos = resumen?.gastos || 0;
  const agregados = resumen?.agregados || 0;
  const fondo = caja?.fondo_inicial || 0;
  const totalDia = efectivo + transferencia + agregados - gastos;
  const totalCaja = fondo + efectivo;
  const enCurso = resumen?.pedidos?.en_curso || { cantidad: 0, total: 0 };
  const listos = resumen?.pedidos?.listos || { cantidad: 0, total: 0 };

  if (loading) {
    return (
      <div className="caja-page">
        <div className="caja-loading">Cargando caja...</div>
      </div>
    );
  }

  return (
    <div>
      <Titulo titulo="Gestión de Caja" />
      <div className="caja-page">

        <div className="caja-topbar">
          <p className="caja-fecha">{fechaStr}</p>
          {!caja ? (
            <button className="btn-caja1" onClick={() => setModalFondo(true)}>
              + Abrir caja
            </button>
          ) : (
            <span className={`caja-badge ${caja.estado === "cerrada" ? "badge-red" : "badge-green"}`}>
              {caja.estado === "abierta" ? "Abierta" :
               caja.estado === "corte_parcial" ? "Corte parcial" : "Cerrada"}
            </span>
          )}
        </div>

        {!caja && (
          <div className="caja-empty">
            <p>No hay caja abierta para hoy.</p>
            <button className="btn-caja1" onClick={() => setModalFondo(true)}>
              Abrir caja del día
            </button>
          </div>
        )}

        {caja && resumen && (
          <div className="caja-grid">

            <div className="caja-card">
              <div className="card-section-title">ESTADO DE PEDIDOS</div>
              <div className="pedidos-grid">
                <div className="pedido-stat">
                  <div className="pedido-lbl">
                    En curso <span className="badge badge-amber">activos</span>
                  </div>
                  <div className="pedido-num">{enCurso.cantidad}</div>
                </div>
                <div className="pedido-stat">
                  <div className="pedido-lbl">
                    Listos <span className="badge badge-green">cerrados</span>
                  </div>
                  <div className="pedido-num">{listos.cantidad}</div>
                </div>
              </div>

              <div className="divider" />

              <div className="card-section-title">DETALLES DEL TURNO</div>
              <div className="caja-row">
                <span className="row-label">Efectivo</span>
                <span className="row-value">{fmt(efectivo)}</span>
              </div>
              <div className="caja-row">
                <span className="row-label">Transferencia</span>
                <span className="row-value">{fmt(transferencia)}</span>
              </div>
              {resumen.ventas.desglose
                .filter((v) => v.metodo !== "Efectivo" && v.metodo !== "Transferencia")
                .map((v) => (
                  <div className="caja-row" key={v.metodo}>
                    <span className="row-label">{v.metodo}</span>
                    <span className="row-value">{fmt(v.total)}</span>
                  </div>
                ))}
              <div className="caja-row">
                <span className="row-label danger">Gastos</span>
                <span className="row-value danger">- {fmt(gastos)}</span>
              </div>
              <div className="caja-row">
                <span className="row-label success">Agregados</span>
                <span className="row-value success">+ {fmt(agregados)}</span>
              </div>
              <div className="caja-total-row">
                <span>Total del día</span>
                <span className={totalDia >= 0 ? "success" : "danger"}>{fmt(totalDia)}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              <div className="caja-card">
                <div className="card-section-title">CAJA</div>
                <div className="caja-row">
                  <span className="row-label">Fondo inicial</span>
                  <span className="row-value">{fmt(fondo)}</span>
                </div>
                <div className="caja-row">
                  <span className="row-label">Ventas (efectivo)</span>
                  <span className="row-value">{fmt(efectivo)}</span>
                </div>
                <div className="caja-row last">
                  <span className="row-label bold">Total real en caja</span>
                  <span className="row-value bold">{fmt(totalCaja)}</span>
                </div>
              </div>

              <div className="caja-card">
                <div className="card-section-title">OBSERVACIONES</div>
                <textarea
                  className="caja-obs"
                  placeholder="Notas del turno..."
                  value={obs}
                  onChange={(e) => handleObs(e.target.value)}
                />
              </div>

              {caja.estado !== "cerrada" && (
                <div className="caja-card">
                  <div className="card-section-title">ACCIONES DE CAJA</div>
                  <div className="acciones-grid">
                    <button
                      className="btn-caja1"
                      onClick={() => setModalCorte("parcial")}
                    >
                      Corte parcial
                    </button>
                    <button
                      className="btn-caja2"
                      onClick={() => setModalCorte("cierre")}
                    >
                      Cierre de caja
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {caja && resumen && (
          <div className="caja-footer">
            <div className="footer-items">
              <div className="footer-item">
                <label>FONDO</label>
                <span>{fmt(fondo)}</span>
              </div>
              <div className="footer-item">
                <label>VENTAS</label>
                <span>{fmt(efectivo + transferencia)}</span>
              </div>
              <div className="footer-item">
                <label>GASTOS</label>
                <span className="danger">- {fmt(gastos)}</span>
              </div>
            </div>
            <div className="footer-total">
              <label>TOTAL DEL DÍA</label>
              <span>{fmt(totalDia)}</span>
            </div>
          </div>
        )}

        {modalFondo && (
          <div className="modal-overlay" onClick={() => setModalFondo(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3>Abrir caja del día</h3>
              <p>Ingresá el fondo inicial destinado a cambio</p>
              <input
                type="number"
                placeholder="0.00"
                value={inputFondo}
                onChange={(e) => setInputFondo(e.target.value)}
                autoFocus
                min="0"
                step="0.01"
              />
              <div className="modal-btns">
                <button className="btn-caja2" onClick={() => setModalFondo(false)}>
                  Cancelar
                </button>
                <button className="btn-caja1" onClick={abrirCaja}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {modalCorte && (
          <div className="modal-overlay" onClick={() => setModalCorte(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3>{modalCorte === "parcial" ? "Corte parcial" : "Cierre de caja"}</h3>
              {resumen && (
                <div className="corte-detalle">
                  <div className="caja-row">
                    <span className="row-label">Pedidos en curso</span>
                    <span className="row-value">{enCurso.cantidad} — {fmt(enCurso.total)}</span>
                  </div>
                  <div className="caja-row">
                    <span className="row-label">Pedidos listos</span>
                    <span className="row-value success">{listos.cantidad} — {fmt(listos.total)}</span>
                  </div>
                  <div className="divider" />
                  <div className="caja-row">
                    <span className="row-label bold">A retirar</span>
                    <span className="row-value bold success">{fmt(listos.total)}</span>
                  </div>
                  <div className="caja-row">
                    <span className="row-label bold">Queda en caja</span>
                    <span className="row-value bold">{fmt(enCurso.total)}</span>
                  </div>
                </div>
              )}
              <div className="modal-btns">
                <button className="btn-caja2" onClick={() => setModalCorte(null)}>
                  Cancelar
                </button>
                <button className="btn-caja1" onClick={() => realizarCorte(modalCorte)}>
                  Confirmar {modalCorte === "parcial" ? "corte" : "cierre"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Caja;