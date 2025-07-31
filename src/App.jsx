import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Páginas generales
import Login from './pages/Login.jsx';

// Páginas de administrador
import Sales from './pages/Adm/Sales.jsx';
import Cash from './pages/Adm/Cash.jsx';
import Employees from './pages/Adm/Employees.jsx';
import Report from './pages/Adm/Report.jsx';
import LoadProducts from './pages/Adm/LoadPrducts.jsx';
import Clients from './pages/Adm/Clients.jsx';
import Users from './pages/Adm/Users.jsx';
import Printers from './pages/Adm/Printers.jsx';

// Layout del administrador (con Sidebar)
import AdminLayout from './pages/AdminLayout.jsx';

// Páginas del mesero (sin sidebar)
import Mesero from './pages/Mesero/IndexMesero.jsx';
import MisPedidos from './pages/Mesero/MisPedidos.jsx';
import TomarPedidos from './pages/Mesero/TomarPedido.jsx';
import VerPedidosMesa from './pages/Mesero/VerPedidoMesa.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/point-of-sale" element={<AdminLayout> <Sales /> </AdminLayout> }/>
        <Route path="/cash" element={ <AdminLayout> <Cash /> </AdminLayout>} />
        <Route path="/employees" element={ <AdminLayout> <Employees /> </AdminLayout> }/>
        <Route path="/report" element={ <AdminLayout> <Report /> </AdminLayout> }/>
        <Route path="/load-products" element={<AdminLayout> <LoadProducts /> </AdminLayout> }/>
        <Route path="/clients" element={<AdminLayout> <Clients /></AdminLayout> }/>
        <Route path="/users" element={<AdminLayout> <Users /> </AdminLayout> }/>
        <Route path="/printers"element={<AdminLayout> <Printers /></AdminLayout> }/>
        <Route path="/mesero" element={<Mesero />} />
        <Route path="/mis" element={<MisPedidos />} />
        <Route path="/tomar" element={<TomarPedidos />} />
        <Route path="/ver-pedidos-mesa" element={<VerPedidosMesa />} />
      </Routes>
    </Router>
  );
}

export default App;

