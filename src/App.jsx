import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Páginas generales
import Login from './pages/Login.jsx';

// Páginas de administrador
import Sales from './admin/features/pedidos/Sales.jsx';
import Users from './admin/features/usuarios/Empleados.jsx';
import Report from './admin/features/informes/Report.jsx';
import Products from './admin/features/productos/Prducts.jsx';
import Printers from './admin/features/impresoras/Printers.jsx';
import Tables from './admin/features/mesas/Tables.jsx';
import Category from './admin/features/categorias/Categorias.jsx'

// Layout del administrador
import AdminLayout from './pages/Layout/AdminLayout.jsx';
import PosLayout from './pages/Layout/PosLayout.jsx';

// Páginas del mesero
import Mesas from './pos/features/mesas/Mesas.jsx';
import Pedidos from './pos/features/pedidos/Pedidos.jsx';
import Ventas from './pos/features/ventas/Ventas.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout><Sales /></AdminLayout>} />
        <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
        <Route path="/report" element={<AdminLayout><Report /></AdminLayout>} />
        <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
        <Route path="/printers" element={<AdminLayout><Printers /></AdminLayout>} />
        <Route path="/tables" element={<AdminLayout><Tables /></AdminLayout>} />
        <Route path="/category" element={<AdminLayout><Category /></AdminLayout>} />

        {/* Rutas de Mesero (POS) */}
        <Route path="/pos" element={<PosLayout />}>
          <Route index element={<Navigate to="mesas" replace />} />
          <Route path="mesas" element={<Mesas />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="ventas" element={<Ventas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;