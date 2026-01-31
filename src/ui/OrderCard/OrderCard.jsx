export default function OrderCard({
  order,
  onEdit,
  onPrepare,
  onFinish,
  onDetails
}) {
  return (
    <div className={`order-row status-${order.estado_ui}`}>

      <div className="order-main">
        <strong>Mesa {order.mesa_id}</strong>
        <span>#{order.numero_pedido}</span>
        <small>{new Date(order.fecha).toLocaleString()}</small>
      </div>

      <div className="order-items">
        {order.detalles?.map((i, idx) => (
          <span key={idx}>
            {i.cantidad}x {i.descripcion}
          </span>
        ))}
      </div>

      <div className="order-total">
        ${order.total}
      </div>

      <div className="order-actions">

        {order.estado_ui !== "cancelado" && (
          <button className="btn secondary" onClick={onEdit}>
            Editar
          </button>
        )}

        {order.estado_ui === "cola" && (
          <button className="btn warning" onClick={onPrepare}>
            Preparar
          </button>
        )}

        {order.estado_ui === "preparacion" && (
          <button className="btn success" onClick={onFinish}>
            Terminado
          </button>
        )}

        {order.estado_ui === "cancelado" && (
          <button className="btn dark" onClick={onDetails}>
            Detalles
          </button>
        )}

      </div>
    </div>
  );
}
