import React, { useState } from 'react'
import '../../styles/pages/LoadProducts.css'
import TitlePage from '../../components/layout/TitlePage/TitlePage.jsx'
import Button1 from '../../components/ui/Button1/Button1.jsx'
import CardProduct from '../../components/ui/CardProduct/CardProduct.jsx'
import { getData } from '../../utils/utils.js'

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await getData('http://localhost:3000/api/productos');
      
      if (Array.isArray(response) && response.length > 0) {
        setProducts(response);
        console.log('Productos cargados:', response);
      } else {
        setError('No se encontraron productos :(');
      }
      
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError('Error al cargar los productos :(');
    } finally {
      setLoading(false);
    }
  };

  const AddProduct = (e) => {
    alert('Agregaste un producto');
  };

  async function eliminarDato(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Si necesitas autenticación:
          // 'Authorization': 'Bearer tu-token'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Algunas APIs devuelven el objeto eliminado, otras solo un status
      const resultado = await response.json();
      console.log('Eliminado exitosamente:', resultado);
      
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }

  const updateProduct = (productId) => {
    alert(`Actualizaste el producto ${productId}`);
  };

  const disableProduct = (productId) => {
    alert(`Deshabilitaste el producto ${productId}`);
  }

  return (
    <>
      <TitlePage title='Productos' />
      
      <div className='list-products'>
        <h3 className='subtitle'>Listado de productos</h3>
        <p>Para ver los productos, haga click en el botón "Cargar Productos".</p>
        
        <Button1 
          text={loading ? 'Cargando...' : 'Cargar Productos'} 
          onClick={loadProducts}
          disabled={loading}
        />

        {error && (
          <div className="error-message" style={{color: 'red', margin: '10px 0'}}>
            {error}
          </div>
        )}

        {products.length > 0 && (
          <div className="products-grid">
            <h4>Productos encontrados: {products.length}</h4>
            {products.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                title={product.nombre}
                price={product.precio}
                descrip={product.descripcion}
                category={product.categoria_id}
                onUpdate={() => updateProduct(product.id)}
                onDelete={() => disableProduct(product.id)}
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <p>No hay productos cargados. Haz click en "Cargar Productos" para verlos.</p>
        )}
      </div>

      <div className='load-container'>
        <h3 className='subtitle'>Deshabilitar Producto</h3>
        <p>Precaución:</p>
        <p>Tenga en cuenta que al DESHABILITAR un producto se deshabilitará para que no se pueda seleccionar en el punto de venta, esto incluye si hay alguna mesa activa con este producto seleccionado. Se recomienda eliminar con cuidado y fuera de horario laboral.</p>
        <Button1 text='Deshabilitar Producto' onClick={disableProduct} />
      </div>
    </>
  );
}

export default Products;