import { useEffect, useState } from "react";
import { buildDashboardData } from "../../../service/ReportService";
import { StatCard } from "../../../ui/Card/StartCard";
import './Report.css';
import Titulo from "../../../ui/Titulo/Titulo";

export default function Dashboard() {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [data, setData] = useState(null);

  const loadData = async () => {
    const res = await buildDashboardData(date);
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, [date]);

  return (
    <div className="contenedor-informe">
    
    <Titulo titulo="Informe General" />

      <div className="tarjeta">
        <div className="tarjeta-cuerpo">
          <h2 className="titulo-seccion">Seleccionar Fecha</h2>
          <div className="selector-fecha">
            <label className="estadistica-etiqueta">Fecha</label>
            <input 
              type="date" 
              className="input-fecha"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="cuadricula-estadisticas">
        <StatCard titulo="TOTAL VENTAS" valor={`$${data?.totalSales.toFixed(2) || "0.00"}`} />
        <StatCard titulo="PEDIDOS CERRADOS" valor={data?.closedOrders || 0} />
        <StatCard titulo="PROMEDIO POR PEDIDO" valor={`$${data?.averageOrder.toFixed(2) || "0.00"}`} />
      </div>

      <div className="tarjeta">
        <div className="tarjeta-cuerpo border-b">
          <h3 className="titulo-seccion">Productos Más Vendidos</h3>
        </div>
        <table className="tabla-contenedor">
          <thead className="tabla-encabezado">
            <tr>
              <th>Producto</th>
              <th className="texto-centro">Cantidad Vendida</th>
              <th className="texto-derecha">Total Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {data?.topProducts.length ? data.topProducts.map(p => (
              <tr key={p.product} className="tabla-fila">
                <td>{p.product}</td>
                <td className="texto-centro">{p.quantity}</td>
                <td className="texto-derecha font-bold">${p.total.toFixed(2)}</td>
              </tr>
            )) : (
              <tr><td colSpan="3" className="sin-datos">No hay datos para esta fecha</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="tarjeta">
        <div className="tarjeta-cuerpo border-b">
          <h3 className="titulo-seccion">Ventas por Usuario</h3>
        </div>
        <table className="tabla-contenedor">
          <thead className="tabla-encabezado">
            <tr>
              <th>Usuario</th>
              <th className="texto-centro">Pedidos Atendidos</th>
              <th className="texto-derecha">Total Ventas</th>
            </tr>
          </thead>
          <tbody>
            {data?.salesByUser.map(u => (
              <tr key={u.user} className="tabla-fila">
                <td>{u.user}</td>
                <td className="texto-centro">{u.orders}</td>
                <td className="texto-derecha font-bold">${u.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
