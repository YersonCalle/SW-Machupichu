import { useState } from "react";

const initialState = {
  fondoInicial: "",
  ventasEfectivo: "",
  efectivo: "",
  transferencia: "",
  gastos: "",
  agregados: "",
  totalRealEnCaja: "",
  obs: "",
};

export default function CajaRestaurante() {
  const [form, setForm] = useState(initialState);
  const [pedidosEnCurso] = useState(3);
  const [pedidosEntregados] = useState(12);
  const [corteHecho, setCorteHecho] = useState(false);
  const [cierreListo, setCierreListo] = useState(false);

  const parse = (v) => parseFloat(v) || 0;

  const totalDia =
    parse(form.efectivo) +
    parse(form.transferencia) -
    parse(form.gastos) +
    parse(form.agregados);

  const diferencia =
    parse(form.totalRealEnCaja) -
    (parse(form.fondoInicial) + parse(form.ventasEfectivo));

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleReset = () => {
    setForm(initialState);
    setCorteHecho(false);
    setCierreListo(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0e0c",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .caja-root { font-family: 'DM Mono', monospace; }
        .title-font { font-family: 'Playfair Display', serif; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        .field-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
        .field-label { color: #b5a98a; font-size: 13px; letter-spacing: 0.04em; white-space: nowrap; }
        .field-input {
          background: #1a1916;
          border: 1px solid #2e2c27;
          border-radius: 6px;
          color: #705612;
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          padding: 7px 12px;
          width: 130px;
          text-align: right;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }
        .field-input:focus { border-color: #c9a84c; background: #201f1b; }
        .field-input::placeholder { color: #3e3c35; }
        .section-card {
          background: #161512;
          border: 1px solid #2a2822;
          border-radius: 12px;
          padding: 20px 22px;
        }
        .section-title {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b6350;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #222018;
        }
        .divider { border: none; border-top: 1px solid #222018; margin: 14px 0; }
        .stat-box {
          background: #1a1916;
          border: 1px solid #2e2c27;
          border-radius: 8px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .stat-label { color: #6b6350; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; }
        .stat-val { color: #f0e6cc; font-size: 20px; font-weight: 700; }
        .total-big { font-family: 'Playfair Display', serif; font-size: 26px; color: #c9a84c; }
        .badge {
          display: inline-block;
          border-radius: 20px;
          padding: 2px 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
        }
        .badge-amber { background: #c9a84c22; color: #c9a84c; border: 1px solid #c9a84c44; }
        .badge-green { background: #4caf5022; color: #81c784; border: 1px solid #4caf5044; }
        .badge-red   { background: #ef535022; color: #ef9a9a; border: 1px solid #ef535044; }
        .btn {
          border: none; cursor: pointer; border-radius: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 10px 18px;
          transition: opacity 0.2s, transform 0.1s;
        }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn:active { transform: translateY(0px); }
        .btn-gold { background: #c9a84c; color: #0f0e0c; font-weight: 700; }
        .btn-outline { background: transparent; border: 1px solid #2e2c27; color: #b5a98a; }
        .btn-ghost { background: #1a1916; color: #b5a98a; }
        .corte-active { background: #4caf5022 !important; border-color: #4caf5044 !important; }
        .cierre-active { background: #ef535022 !important; border-color: #ef535044 !important; }
        textarea {
          background: #1a1916; border: 1px solid #2e2c27; border-radius: 6px;
          color: #b5a98a; font-family: 'DM Mono', monospace; font-size: 12px;
          padding: 8px 12px; width: 100%; resize: none; outline: none;
          transition: border-color 0.2s;
        }
        textarea:focus { border-color: #c9a84c; }
        .neg { color: #ef9a9a !important; }
        .pos { color: #81c784 !important; }
      `}</style>

      <div className="caja-root" style={{ width: "100%", maxWidth: 880 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 className="title-font" style={{ color: "#f0e6cc", fontSize: 30, letterSpacing: "-0.01em" }}>
              Estado de Caja
            </h1>
            <p style={{ color: "#4a4840", fontSize: 12, marginTop: 4, letterSpacing: "0.08em" }}>
              {new Date().toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
            </p>
          </div>
          <button className="btn btn-outline" onClick={handleReset}>
            ↺ Reset
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* ── COLUMNA IZQUIERDA ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Estado de pedidos */}
            <div className="section-card">
              <div className="section-title">Estado de pedidos</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="stat-box">
                  <div>
                    <div className="stat-label">En curso</div>
                    <div className="stat-val">{pedidosEnCurso}</div>
                  </div>
                  <span className="badge badge-amber">activos</span>
                </div>
                <div className="stat-box">
                  <div>
                    <div className="stat-label">Entregados</div>
                    <div className="stat-val">{pedidosEntregados}</div>
                  </div>
                  <span className="badge badge-green">cerrados</span>
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div className="section-card" style={{ flex: 1 }}>
              <div className="section-title">Detalles del turno</div>

              <div className="field-row">
                <span className="field-label">Efectivo</span>
                <input className="field-input" type="number" placeholder="0.00"
                  value={form.efectivo} onChange={handleChange("efectivo")} />
              </div>
              <div className="field-row">
                <span className="field-label">Transferencia</span>
                <input className="field-input" type="number" placeholder="0.00"
                  value={form.transferencia} onChange={handleChange("transferencia")} />
              </div>

              <hr className="divider" />

              <div className="field-row">
                <span className="field-label" style={{ color: "#ef9a9a" }}>Gastos</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#ef9a9a", fontSize: 13 }}>−</span>
                  <input className="field-input" type="number" placeholder="0.00"
                    value={form.gastos} onChange={handleChange("gastos")} />
                </div>
              </div>
              <div className="field-row">
                <span className="field-label" style={{ color: "#81c784" }}>Agregados</span>
                <input className="field-input" type="number" placeholder="0.00"
                  value={form.agregados} onChange={handleChange("agregados")} />
              </div>

              <hr className="divider" />

              <div className="field-row" style={{ marginBottom: 0 }}>
                <span className="field-label" style={{ fontWeight: 600, color: "#f0e6cc" }}>Total del día</span>
                <span className={`total-big`} style={{ fontSize: 22 }}>
                  $ {totalDia.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* ── COLUMNA DERECHA ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Caja */}
            <div className="section-card">
              <div className="section-title">Caja</div>

              <div className="field-row">
                <span className="field-label">Fondo inicial</span>
                <input className="field-input" type="number" placeholder="0.00"
                  value={form.fondoInicial} onChange={handleChange("fondoInicial")} />
              </div>
              <div className="field-row">
                <span className="field-label">Ventas (efectivo)</span>
                <input className="field-input" type="number" placeholder="0.00"
                  value={form.ventasEfectivo} onChange={handleChange("ventasEfectivo")} />
              </div>

              <hr className="divider" />

              <div className="field-row">
                <span className="field-label">Total real en caja</span>
                <input className="field-input" type="number" placeholder="0.00"
                  value={form.totalRealEnCaja} onChange={handleChange("totalRealEnCaja")} />
              </div>

              {/* Diferencia */}
              {form.totalRealEnCaja !== "" && (
                <div style={{ marginTop: 10, background: "#111009", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#6b6350", fontSize: 12, letterSpacing: "0.08em" }}>DIFERENCIA</span>
                  <span className={diferencia >= 0 ? "pos" : "neg"} style={{ fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                    {diferencia >= 0 ? "+" : ""}$ {diferencia.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Observaciones */}
            <div className="section-card">
              <div className="section-title">Observaciones</div>
              <textarea rows={3} placeholder="Notas del turno..."
                value={form.obs} onChange={handleChange("obs")} />
            </div>

            {/* Acciones de corte */}
            <div className="section-card">
              <div className="section-title">Acciones de caja</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className={`btn ${corteHecho ? "btn-ghost corte-active" : "btn-gold"}`}
                  style={{ flex: 1 }}
                  onClick={() => setCorteHecho((v) => !v)}
                >
                  {corteHecho ? "✓ Corte parcial" : "Corte parcial"}
                </button>
                <button
                  className={`btn ${cierreListo ? "btn-ghost cierre-active" : "btn-outline"}`}
                  style={{ flex: 1 }}
                  onClick={() => setCierreListo((v) => !v)}
                >
                  {cierreListo ? "✓ Cierre de caja" : "Cierre de caja"}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer resumen */}
        <div style={{
          marginTop: 16, borderRadius: 12, background: "#161512",
          border: "1px solid #2a2822", padding: "16px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12
        }}>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Fondo", val: `$ ${parse(form.fondoInicial).toFixed(2)}` },
              { label: "Ventas", val: `$ ${parse(form.ventasEfectivo).toFixed(2)}` },
              { label: "Gastos", val: `- $ ${parse(form.gastos).toFixed(2)}`, neg: true },
            ].map(({ label, val, neg }) => (
              <div key={label}>
                <div className="stat-label">{label}</div>
                <div style={{ color: neg ? "#ef9a9a" : "#b5a98a", fontSize: 14, marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="stat-label">Total del día</div>
            <div className="total-big">$ {totalDia.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}