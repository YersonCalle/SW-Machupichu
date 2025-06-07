import React from 'react'
import '../styles/pages/Sales.css'
import CardSale from '../components/ui/CardSale/CardSale.jsx'
import data from '../assets/files/data.json'
import SideBar from '../components/layout/SideBar/SideBar.jsx'

function Sales() {
    const [products, setProducts] = React.useState([])
    const [total, setTotal] = React.useState(0)

    function handleAddProduct(product) {
        setProducts([...products, product])
        setTotal(total + product.price)
    }

    return (
        <>
            <main className='main-mostrador'>
                <div className="sales-container">
                    <div class="sales-tittle">
                        <h1>Punto de venta</h1>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Sales