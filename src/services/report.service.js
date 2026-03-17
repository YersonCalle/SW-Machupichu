import { apiRequest } from "../api/apiConfig";

export const getSalesByDate = (date) => {
  return apiRequest(`/ventas?fecha_inicio=${date}&fecha_fin=${date}`);
};

export const buildDashboardData = async (date) => {
  const sales = await getSalesByDate(date);

  const totalSales = sales.reduce((s, v) => s + Number(v.total), 0);
  const closedOrders = sales.length;
  const averageOrder = closedOrders ? totalSales / closedOrders : 0;

  const productMap = {};
  const userMap = {};

  sales.forEach(sale => {
    const user = sale.numero_pedido || "Sin usuario";

    userMap[user] ??= { orders: 0, total: 0 };
    userMap[user].orders++;
    userMap[user].total += Number(sale.total);

    sale.detalles.forEach(d => {
      productMap[d.descripcion] ??= { quantity: 0, total: 0 };
      productMap[d.descripcion].quantity += d.cantidad;
      productMap[d.descripcion].total += Number(d.subtotal);
    });
  });

  return {
    totalSales,
    closedOrders,
    averageOrder,
    topProducts: Object.entries(productMap).map(([product, v]) => ({
      product,
      ...v
    })),
    salesByUser: Object.entries(userMap).map(([user, v]) => ({
      user,
      ...v
    }))
  };
};
