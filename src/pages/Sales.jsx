import React, { useState } from 'react'
import '../styles/pages/Sales.css'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import CardSale from '../components/ui/CardSale/CardSale.jsx'
import TableItem from '../components/ui/TableItem/TableItem.jsx'
import data from '../assets/files/data.json'
import { getData } from '../utils/utils.js'

function Sales() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [selectedTable, setSelectedTable] = useState(null)
  const [tables, setTables] = useState(() => {
    const initialStatuses = [
      "available", "available", "occupied", "available",
      "available", "occupied", "available", "available",
      "available", "occupied", "occupied", "occupied",
      "available", "occupied", "available", "available",
    ]
    return Array.from({ length: 16 }, (_, index) => ({
      number: index + 1,
      status: initialStatuses[index],
    }))
  })

  const handleTableStatusChange = (tableNumber, newStatus) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.number === tableNumber ? { ...table, status: newStatus } : table
      )
    )
  }

  const handleTableClick = (tableNumber) => {
    setSelectedTable(tableNumber)
  }

  function handleAddProduct(product) {
    setProducts([...products, product])
    setTotal(total + (product.price || 0))
  }

  return (
    <>
      <TitlePage title='Punto de Venta' />
      <div className="tables-container">
        <div className="tables-grid">
          {tables.map((table) => (
            <TableItem
              key={table.number}
              tableNumber={table.number}
              status={table.status}
              onStatusChange={handleTableStatusChange}
              onTableClick={handleTableClick}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Sales