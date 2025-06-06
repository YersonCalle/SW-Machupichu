import React, { useState } from 'react';
import '../styles/pages/Dashboard.css';
import { caja, puntoDeVenta, empleado, reportes } from '../assets/icons/index.js';
import CardDash from '../components/ui/CardDash/CardDash.jsx';
import { useNavigate } from 'react-router-dom';

const panels = [
  {
    title: 'Ventas',
    cards: [
      { title: 'Puntos de Venta', icon: puntoDeVenta, url: '/point-of-sale' },
      { title: 'Caja', icon: caja, url: '/cash' },
      { title: 'Empleados y Saldo', icon: empleado, url: '/employees' },
      { title: 'Informes', icon: reportes, url: '/report' },
    ],
  },
  {
    title: 'Control',
    cards: [
      { title: 'Empleados', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Usuarios', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Tablas', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Mapa de Mesas', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
    ],
  },
  {
    title: 'Compras',
    cards: [
      { title: 'Reportes Mensuales', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Ingreso de compras', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Cuentas de Proveedores', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
    ],
  },
  {
    title: 'Clientes',
    cards: [
      { title: 'Ficha de clientes', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Tablas', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
    ],
  },
  {
    title: 'Productos',
    cards: [
      { title: 'Carga de productos', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png', url: '/load-products' },
      { title: 'Caja de insumos', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Cargo de gustos', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
      { title: 'Tablas', icon: 'https://cdn-icons-png.flaticon.com/512/0/100.png' },
    ],
  },
]

function Dashboard() {
  const [currentPanel, setCurrentPanel] = useState(0);

  const handleNext = () => {
    setCurrentPanel((prev) => (prev + 1) % panels.length);
  };

  const handlePrev = () => {
    setCurrentPanel((prev) => (prev - 1 + panels.length) % panels.length);
  };

  return (
    <div className="dashboard">
      <h1>{panels[currentPanel].title}</h1>
      <div className="dashboard-container">
        {panels[currentPanel].cards.map((card, index) => (
          <CardDash
            key={index}
            title={card.title}
            icon={card.icon}
            url={card.url} 
          />
        ))}
      </div>
      <div className="dashboard-navigation">
        <button className="dash-btn" onClick={handlePrev}>
          Anterior
        </button>
        <button className="dash-btn" onClick={handleNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Dashboard;