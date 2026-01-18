import React, { useState } from 'react'
import './LoadProducts.css'

import Button1 from '../../../ui/Button1/Button1.jsx'
import CardProduct from '../../../ui/CardProduct/CardProduct.jsx'
import AddProductModal from './AddProductModal.jsx'
import UpdateProductModal from './UpdateProductModal.jsx' // Importar el nuevo modal
import { getData } from '../../../utils/utils.js'

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado del modal de actualización
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto a actualizar

  // Cargar productos
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

  // Agregar productos
  const AddProduct = (e) => {
    e.preventDefault();
    setIsAddModalOpen(true);
  };

  // Callback cuando se crea un producto
  const handleProductAdded = (newProduct) => {
    // Recargar la lista de productos
    loadProducts({ preventDefault: () => {} });
  };

  // Actualizar producto - Abre el modal de edición
  const updateProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsUpdateModalOpen(true);
    }
  };

  // Callback cuando se actualiza un producto
  const handleProductUpdated = (updatedProduct) => {
    // Actualizar el producto en la lista sin recargar todo
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    // O si prefieres recargar todos los productos:
    // loadProducts({ preventDefault: () => {} });
  };

  // Deshabilitar producto
  const disableProduct = async (productId) => {
    const confirmar = window.confirm('¿Seguro que quieres deshabilitar este producto?');
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3000/api/productos/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const message = data.message ?? `Error ${response.status}`;
        throw new Error(message);
      }

      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (err) {
      console.error('Error al deshabilitar producto:', err);
      setError('No se pudo deshabilitar el producto. Intenta nuevamente.');
    }
  }

  return (
    <>
      {/* Modal para agregar producto */}
      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Modal para actualizar producto */}
      <UpdateProductModal 
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedProduct(null);
        }}
        onProductUpdated={handleProductUpdated}
        product={selectedProduct}
      />
      
      <div className='list-products'>
        <h3 className='subtitle'>Listado de productos</h3>
        <p>Para ver los productos, haga click en el botón "Cargar Productos".</p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Button1 
            text={loading ? 'Cargando...' : 'Cargar Productos'} 
            color="var(--primary)"
            onClick={loadProducts}
            disabled={loading}
          />
          
          <Button1 
            text='Agregar Producto' 
            color="var(--success, #28a745)"
            onClick={AddProduct}
          />
        </div>

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
                title={product.descripcion}
                price={product.precio}
                category={product.categoria.descripcion}
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
        <Button1 
          text='Deshabilitar Producto' 
          color="var(--primary-color)"
          onClick={() => alert('Selecciona un producto en la lista para deshabilitar.')} 
        />
      </div>
    </>
  );
}

export default Products;