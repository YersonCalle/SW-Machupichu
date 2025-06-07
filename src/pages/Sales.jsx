import React from 'react'
import '../styles/pages/Sales.css'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import data from '../assets/files/data.json'

function Sales() {
    const [products, setProducts] = React.useState([])
    const [total, setTotal] = React.useState(0)

    function handleAddProduct(product) {
        setProducts([...products, product])
        setTotal(total + product.price)
    }

    return (
        <>
            <TitlePage title='Punto de Venta' />
        </>
    )
}

export default Sales