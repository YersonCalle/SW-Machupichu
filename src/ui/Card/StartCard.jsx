import './StartCard.css'

export const StatCard = ({ titulo, valor }) => (
  <div className="tarjeta-estadistica">
    <p className="estadistica-etiqueta">{titulo}</p>
    <h2 className="estadistica-valor">{valor}</h2>
  </div>
);
