import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Páginas generales
import Login from './pages/Login.jsx';

// Páginas de administrador
import Sales from './admin/features/pedidos/Sales.jsx';
import Cash from './admin/CashClosing.jsx';
import Users from './admin/features/usuarios/Users.jsx';
import Report from './admin/features/informes/Report.jsx';
import Products from './admin/features/productos/Prducts.jsx';
import Printers from './admin//features/impresoras/Printers.jsx';
import Tables from './admin/features/mesas/Tables.jsx';

// Layout del administrador (con Sidebar)
import AdminLayout from './pages/Layout/AdminLayout.jsx';

// Páginas del mesero (sin sidebar)
import Mesero from './pos/IndexMesero.jsx';
import MisPedidos from './pos/MisPedidos.jsx';
import TomarPedidos from './pos/TomarPedido.jsx';
import VerPedidosMesa from './pos/VerPedidoMesa.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/point-of-sale" element={<AdminLayout> <Sales /> </AdminLayout> }/>
        <Route path="/cash" element={ <AdminLayout> <Cash /> </AdminLayout>} />
        <Route path="/users" element={ <AdminLayout> <Users /> </AdminLayout> }/>
        <Route path="/report" element={ <AdminLayout> <Report /> </AdminLayout> }/>
        <Route path="/products" element={<AdminLayout> <Products /> </AdminLayout> }/>
        <Route path="/printers"element={<AdminLayout> <Printers /></AdminLayout> }/>
        <Route path="/tables" element={<AdminLayout> <Tables /></AdminLayout>}/>
        <Route path="/mesero" element={<Mesero />} />
        <Route path="/mis" element={<MisPedidos />} />
        <Route path="/tomar" element={<TomarPedidos />} />
        <Route path="/ver-pedidos-mesa" element={<VerPedidosMesa />} />
      </Routes>
    </Router>
  );
}

export default App;

