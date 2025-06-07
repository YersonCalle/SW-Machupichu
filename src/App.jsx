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
      </Routes>
    </Layout>
  </BrowserRouter>
  )
}

export default App
