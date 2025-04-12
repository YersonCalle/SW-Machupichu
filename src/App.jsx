import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Sales from './pages/Sales.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cash from './pages/Cash.jsx'
import Employees from './pages/Employees.jsx'
import Report from './pages/Report.jsx'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/point-of-sale" element={<Sales />} />
      <Route path="/cash" element={<Cash />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
