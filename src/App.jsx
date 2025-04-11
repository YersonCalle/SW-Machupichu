import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Sales from './pages/Sales.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Caja from './pages/Caja.jsx'
import Employees from './pages/Employees.jsx'
import Report from './pages/Report.jsx'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/punto-de-venta" element={<Sales />} />
      <Route path="/caja" element={<Caja />} />
      <Route path="/empleados" element={<Employees />} />
      <Route path="/informes" element={<Report />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
