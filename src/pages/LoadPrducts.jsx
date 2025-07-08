import React, { useState } from 'react'
import '../styles/pages/LoadProducts.css'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import Button1 from '../components/ui/Button1/Button1.jsx'
import CardProduct from '../components/ui/CardProduct/CardProduct.jsx'
import { getData } from '../utils/utils.js'

function LoadProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await getData('/src/assets/files/data.json');
      
      if (response && response.products) {
        setProducts(response.products);
        console.log('Productos cargados:', response.products);
      } else {
        setError('No se encontraron productos en el archivo');
      }
      
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const AddProduct = (e) => {
    alert('Agregaste un producto');
  };

  async function eliminarDato(id) {
    try {
      const response = await fetch(`/src/assets/files/data.json${id}`, {
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

  const deleteProduct = (productId) => {
    alert(`Eliminaste el producto ${productId}`);
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
                title={product.name || product.nombre}
                price={product.price || product.precio}
                descrip={product.description || product.descripcion}
                category={product.category}
                image={product.image}
                onUpdate={() => updateProduct(product.id)}
                onDelete={() => deleteProduct(product.id)}
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <p>No hay productos cargados. Haz click en "Cargar Productos" para verlos.</p>
        )}
      </div>

      <div className='load-container'>
        <h3 className='subtitle'>Eliminar Producto</h3>
        <p>Precaución:</p>
        <p>Tenga en cuenta que al ELIMINAR un producto se borrará COMPLETAMENTE del sistema, esto incluye si hay alguna mesa activa con este producto seleccionado. Se recomienda eliminar con cuidado y fuera de horario laboral.</p>
        <Button1 text='ELIMINAR PRODUCTO' onClick={deleteProduct} />
      </div>
    </>
  );
}

export default LoadProducts;