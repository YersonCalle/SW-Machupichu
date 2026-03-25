import { useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from '../../ui/SideBar/SideBar';
import "../../App.css";

const PosLayout = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    { label: 'Plano de Mesas', path: '/pos/mesas' },
    { label: 'Pedidos Activos', path: '/pos/pedidos' }
  ];

  return (
    <div style={{ display: 'flex' }}>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      <Sidebar rol="mesero" menuItems={menu} open={open} setOpen={setOpen} />

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <main style={{ flex: 1, padding: '0px', backgroundColor: '#f3f4f6', height: '100vh', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PosLayout;