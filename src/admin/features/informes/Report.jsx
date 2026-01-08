import { useState} from "react"
import './Report.css'

const Report = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const salesData = {
    today: [
      { label: "10:00", value: 150 },
      { label: "12:00", value: 320 },
      { label: "14:00", value: 280 },
      { label: "16:00", value: 180 },
      { label: "18:00", value: 420 },
      { label: "20:00", value: 380 },
      { label: "22:00", value: 220 },
    ],
    week: [
      { label: "Lun", value: 1200 },
      { label: "Mar", value: 1800 },
      { label: "Mié", value: 1600 },
      { label: "Jue", value: 2100 },
      { label: "Vie", value: 2800 },
      { label: "Sáb", value: 3200 },
      { label: "Dom", value: 2400 },
    ],
    month: [
      { label: "Sem 1", value: 8500 },
      { label: "Sem 2", value: 9200 },
      { label: "Sem 3", value: 8800 },
      { label: "Sem 4", value: 10500 },
    ],
  }

  const topProducts = [
    { name: "Pollo a la Brasa", sales: 45, revenue: 1125 },
    { name: "Medio Pollo", sales: 32, revenue: 480 },
    { name: "Arroz Chaufa", sales: 28, revenue: 504 },
    { name: "Inca Kola", sales: 67, revenue: 335 },
    { name: "Papa Rellena", sales: 23, revenue: 138 },
  ]

  return (
    <>
    <div className="reports-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">S/ 2,450</div>
          <div className="stat-label">Ventas de Hoy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">156</div>
          <div className="stat-label">Pedidos Completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">S/ 157</div>
          <div className="stat-label">Ticket Promedio</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Mesas Activas</div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-title">Productos Más Vendidos</div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad Vendida</th>
                <th>Ingresos</th>
                
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.sales}</td>
                  <td>S/ {product.revenue}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default Report
