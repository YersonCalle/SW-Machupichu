import React from 'react'
import '../styles/pages/Sales.css'
import CardSale from '../components/ui/CardSale/CardSale.jsx'
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
    <main className='main-mostrador'>
        <div class="sales-tittle">
            <h1>MACHUPICCHU</h1>
        </div>
        <div class="sales-detail">
            <div class="detail">
                <h2>DETALLE</h2>
                <div class="detail-products">
                    {products.map((product, index) => (
                        <div key={index} className="product-item">
                            <h3>{product.name}</h3>
                            <h3>$ {product.price}</h3>
                        </div>
                    ))}
                <div className="total product-item">
                    <h3>TOTAL</h3>
                    <h3>$ {total}</h3>
                </div>
            </div>
        </div>
            <div class="sales-products">
                <h2>PRODUCTOS</h2>
                <div class="products">
                    {data.products.map((product, index) => (
                        <CardSale key={index} title={product.name} price={product.price} onClick={() => handleAddProduct(product)} />
                    ))}
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Sales