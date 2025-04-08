import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Sales from './pages/Sales.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ventas/punto-de-venta" element={<Sales />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
