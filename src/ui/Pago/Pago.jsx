import React from "react";
import "./Pago.css";

const Pago = ({ 
  metodosPago = [], 
  metodoPagoSeleccionado, 
  onSeleccionarMetodo,
  required = true 
}) => {
  
  const getIconoMetodoPago = (id) => {
    const iconos = {
      1: { emoji: "💵", color: "#10b981" }, // Efectivo
      2: { emoji: "💳", color: "#3b82f6" }, // Tarjeta de Débito
      3: { emoji: "💳", color: "#8b5cf6" }, // Tarjeta de Crédito
      4: { emoji: "🔄", color: "#f59e0b" }, // Transferencia
      5: { emoji: "📱", color: "#06b6d4" }, // Mercado Pago
    };
    return iconos[id] || { emoji: "💰", color: "#6b7280" };
  };

  return (
    <div className="metodo-pago-selector">
      <label className="metodo-pago-label">
        Método de Pago {required && <span className="required">*</span>}
      </label>
      
      <div className="metodos-pago-grid">
        {metodosPago.map((metodo) => {
          const { emoji, color } = getIconoMetodoPago(metodo.id);
          const isSelected = metodoPagoSeleccionado === metodo.id;
          
          return (
            <div
              key={metodo.id}
              className={`metodo-pago-card ${isSelected ? "seleccionado" : ""}`}
              onClick={() => onSeleccionarMetodo(metodo.id)}
              style={{ "--metodo-color": color }}
            >
              <div className="metodo-icono-wrapper">
                <span className="metodo-emoji">{emoji}</span>
              </div>
              
              <span className="metodo-nombre">{metodo.descripcion}</span>
              
              {isSelected && (
                <div className="metodo-check-icon">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {metodosPago.length === 0 && (
        <div className="sin-metodos-pago">
          <p>No hay métodos de pago disponibles</p>
        </div>
      )}
    </div>
  );
};

export default Pago;