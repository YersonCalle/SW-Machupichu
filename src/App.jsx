import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Sales from './pages/Sales.jsx'
import Cash from './pages/Cash.jsx'
import Employees from './pages/Employees.jsx'
import Report from './pages/Report.jsx'
import LoadProducts from './pages/LoadPrducts.jsx'
import SideBar from './components/layout/SideBar/SideBar.jsx'
import Clients from './pages/Clients.jsx'
import Users from './pages/Users.jsx'
import Printers from './pages/Printers.jsx'

//mesero
import Mesero from './pages/Mesero/IndexMesero.jsx'
import MisPedidos from './pages/Mesero/MisPedidos.jsx'
import TomarPedidos from './pages/Mesero/TomarPedido.jsx'
import VerPedidosMesa from './pages/Mesero/VerPedidoMesa.jsx'

function Layout({ children }) {
  const location = useLocation();
  const hideSidebar = location.pathname === '/';

  return (
    <div className="app-layout">
      {!hideSidebar && <SideBar />}
      <div className="main-content">{children}</div>
    </div>
  );
}


function App() {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/point-of-sale" element={<Sales />} />
        <Route path="/cash" element={<Cash />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/report" element={<Report />} />
        <Route path="/load-products" element={<LoadProducts />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/users' element={<Users />} />
        <Route path='/printers'element={<Printers/>}/>
        <Route path='/mesero'element={<Mesero/>}/>
        <Route path='/mis'element={<MisPedidos/>}/>
        <Route path='/tomar-pedidos'element={<TomarPedidos/>}/>
        <Route path='/ver-pedidos-mesa'element={<VerPedidosMesa/>}/>
      </Routes>
    </Layout>
  </BrowserRouter>
  )
}

export default App
