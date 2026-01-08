import { useState } from "react"
import './Printers.css'


const Printers = () => {
  const [printers, setPrinters] = useState([
    {
      id: 1,
      name: "Impresora Principal",
      type: "Tickets",
      status: "online",
      ip: "192.168.1.100",
      model: "Epson TM-T88V",
      location: "Caja Principal",
      lastPrint: "2024-01-15 14:30:25",
    },
    {
      id: 2,
      name: "Impresora Cocina",
      type: "Cocina",
      status: "online",
      ip: "192.168.1.101",
      model: "Star TSP143III",
      location: "Cocina",
      lastPrint: "2024-01-15 14:28:15",
    },
    {
      id: 3,
      name: "Impresora Bar",
      type: "Bebidas",
      status: "offline",
      ip: "192.168.1.102",
      model: "Citizen CT-S310A",
      location: "Bar",
      lastPrint: "2024-01-15 13:45:10",
    },
    {
      id: 4,
      name: "Impresora Backup",
      type: "Tickets",
      status: "error",
      ip: "192.168.1.103",
      model: "Epson TM-T20III",
      location: "Caja Secundaria",
      lastPrint: "2024-01-15 12:15:30",
    },
  ])

  const handleTestPrint = (printerId) => {
    const printer = printers.find((p) => p.id === printerId)
    if (printer.status === "online") {
      alert(`Enviando página de prueba a ${printer.name}...`)
      // Aquí iría la lógica real de impresión
      setPrinters(printers.map((p) => (p.id === printerId ? { ...p, lastPrint: new Date().toLocaleString() } : p)))
    } else {
      alert(`La impresora ${printer.name} no está disponible`)
    }
  }

  const handleConfigPrinter = (printerId) => {
    const printer = printers.find((p) => p.id === printerId)
    alert(`Abriendo configuración de ${printer.name}...`)
    // Aquí iría la lógica de configuración
  }

  const togglePrinterStatus = (printerId) => {
    setPrinters(
      printers.map((p) => {
        if (p.id === printerId) {
          let newStatus
          if (p.status === "online") newStatus = "offline"
          else if (p.status === "offline") newStatus = "online"
          else newStatus = "offline"

          return { ...p, status: newStatus }
        }
        return p
      }),
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "online":
        return "🟢"
      case "offline":
        return "🔴"
      case "error":
        return "🟡"
      default:
        return "⚪"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "online":
        return "En Línea"
      case "offline":
        return "Desconectada"
      case "error":
        return "Error"
      default:
        return "Desconocido"
    }
  }

  return (
    <>
    <div className="printers-container">
      <div className="products-header">
        <h2>Gestión de Impresoras</h2>
        <button className="add-product-btn">+ Agregar Impresora</button>
      </div>

      <div className="printers-grid">
        {printers.map((printer) => (
          <div key={printer.id} className="printer-card">
            <div className="printer-header">
              <div className="printer-name">{printer.name}</div>
              <div
                className={`printer-status status-${printer.status}`}
                onClick={() => togglePrinterStatus(printer.id)}
                style={{ cursor: "pointer" }}
              >
                {getStatusIcon(printer.status)} {getStatusLabel(printer.status)}
              </div>
            </div>

            <div className="printer-info">
              <div className="info-row">
                <span className="info-label">Tipo:</span>
                <span className="info-value">{printer.type}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Modelo:</span>
                <span className="info-value">{printer.model}</span>
              </div>
              <div className="info-row">
                <span className="info-label">IP:</span>
                <span className="info-value">{printer.ip}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ubicación:</span>
                <span className="info-value">{printer.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Última Impresión:</span>
                <span className="info-value">{printer.lastPrint}</span>
              </div>
            </div>

            <div className="printer-actions">
              <button
                className="test-btn"
                onClick={() => handleTestPrint(printer.id)}
                disabled={printer.status !== "online"}
              >
                Probar
              </button>
              <button className="config-btn" onClick={() => handleConfigPrinter(printer.id)}>
                Configurar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container" style={{ marginTop: "30px" }}>
        <div className="chart-title">Estado de Impresoras</div>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#38a169" }}>
                {printers.filter((p) => p.status === "online").length}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>En Línea</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#e53e3e" }}>
                {printers.filter((p) => p.status === "offline").length}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>Desconectadas</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ed8936" }}>
                {printers.filter((p) => p.status === "error").length}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>Con Error</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Printers
