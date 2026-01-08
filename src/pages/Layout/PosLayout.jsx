import { Outlet } from 'react-router-dom';
import Sidebar from '../../ui/SideBar/SideBar';
import "../../App.css";

const PosLayout = () => {
  const menu = [
    { label: 'Plano de Mesas', path: '/pos/mesas' },
    { label: 'Pedidos Activos', path: '/pos/pedidos' }
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar rol="mesero" menuItems={menu} />
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f3f4f6', height: '100vh', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PosLayout;