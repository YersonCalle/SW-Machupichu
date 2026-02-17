import React, { useState, useEffect } from 'react'
import './LoadProducts.css'

import Button1 from '../../../ui/Button1/Button1.jsx'
import CardProduct from '../../../ui/CardProduct/CardProduct.jsx'
import AddProductModal from './AddProductModal.jsx'
import UpdateProductModal from './UpdateProductModal.jsx'
import { ProductsService } from '../../../service/products.service.js' // ← USAR EL SERVICIO

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Cargar productos automáticamente al montar
  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Simplificado - sin `e.preventDefault()`
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ProductsService.getAll(); // ← SERVICIO
      
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

  // ✅ Abrir modal de agregar
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // ✅ Callback cuando se crea un producto
  const handleProductAdded = (newProduct) => {
    // Opción 1: Agregar el nuevo producto al estado sin recargar
    setProducts(prev => [...prev, newProduct]);
    
    // Opción 2: Recargar todo (si prefieres datos frescos)
    // loadProducts();
  };

  // ✅ Actualizar producto - Abre el modal de edición
  const handleUpdateClick = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsUpdateModalOpen(true);
    }
  };

  // ✅ Callback cuando se actualiza un producto
  const handleProductUpdated = (updatedProduct) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  // ✅ Deshabilitar producto - USANDO SERVICIO
  const handleDisableProduct = async (productId) => {
    const confirmar = window.confirm('¿Seguro que quieres deshabilitar este producto?');
    if (!confirmar) return;

    try {
      await ProductsService.delete(productId); // ← SERVICIO
      
      // Remover del estado local
      setProducts(prev => prev.filter(p => p.id !== productId));
      
    } catch (error) {
      console.error('Error al deshabilitar producto:', error);
      setError('No se pudo deshabilitar el producto. Intenta nuevamente.');
    }
  };

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
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Button1 
            text={loading ? 'Cargando...' : 'Recargar Productos'} 
            color="var(--primary)"
            onClick={loadProducts}
            disabled={loading}
          />
          
          <Button1 
            text='Agregar Producto' 
            color="var(--success, #28a745)"
            onClick={handleAddClick}
          />
        </div>

        {error && (
          <div className="error-message" style={{color: 'red', margin: '10px 0'}}>
            {error}
          </div>
        )}

        {loading && <p>Cargando productos...</p>}

        {!loading && products.length > 0 && (
          <div className="products-grid">
            <h4>Productos encontrados: {products.length}</h4>
            {products.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                title={product.descripcion}
                price={product.precio}
                category={product.categoria?.descripcion || 'Sin categoría'}
                onUpdate={() => handleUpdateClick(product.id)}
                onDelete={() => handleDisableProduct(product.id)}
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      <div className='load-container'>
        <h3 className='subtitle'>Deshabilitar Producto</h3>
        <p>Precaución:</p>
        <p>Tenga en cuenta que al DESHABILITAR un producto se deshabilitará para que no se pueda seleccionar en el punto de venta, esto incluye si hay alguna mesa activa con este producto seleccionado. Se recomienda eliminar con cuidado y fuera de horario laboral.</p>
      </div>
    </>
  );
}

export default Products;