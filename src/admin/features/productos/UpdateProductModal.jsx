import React, { useState, useEffect } from 'react';

function UpdateProductModal({ isOpen, onClose, onProductUpdated, product }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria_id: '',
    estado: 1
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar categorías y prellenar datos del producto al abrir el modal
  useEffect(() => {
    if (isOpen) {
      loadCategories();
      if (product) {
        setFormData({
          descripcion: product.nombre || product.descripcion || '',
          precio: product.precio || '',
          categoria_id: product.categoria?.id || product.categoria_id || '',
          estado: product.estado !== undefined ? product.estado : 1
        });
      }
    }
  }, [isOpen, product]);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categorias');
      if (!response.ok) throw new Error('Error al cargar categorías');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error cargando categorías:', err);
      setError('No se pudieron cargar las categorías');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre.trim()) {
      setError('La descripción es obligatoria');
      return;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }
    if (!formData.categoria_id) {
      setError('Debes seleccionar una categoría');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Obtener la fecha actual en formato MySQL
      const fechaModificacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const response = await fetch(`http://localhost:3000/api/productos/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descripcion: formData.nombre.trim(),
          precio: parseFloat(formData.precio),
          stock: product.stock || 0, // Mantener el stock actual sin cambiarlo
          categoria_id: parseInt(formData.categoria_id),
          fecha_modificacion: fechaModificacion,
          estado: parseInt(formData.estado)
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Error ${response.status}`);
      }

      // Notificar al componente padre con el producto actualizado
      onProductUpdated({
        ...product,
        nombre: formData.nombre,
        descripcion: formData.nombre,
        precio: parseFloat(formData.precio),
        categoria_id: parseInt(formData.categoria_id),
        estado: parseInt(formData.estado)
      });
      
      // Limpiar y cerrar
      setFormData({ nombre: '', precio: '', categoria_id: '', estado: 1 });
      setError(null);
      onClose();
      
    } catch (err) {
      console.error('Error actualizando producto:', err);
      setError(err.message || 'Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ nombre: '', precio: '', categoria_id: '', estado: 1 });
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Actualizar Producto</h2>
        
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}

        <div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Descripción *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Pizza Muzzarella"
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Precio *
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Categoría *
            </label>
            <select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Seleccione una categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.descripcion || cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado === 1}
                onChange={handleChange}
                disabled={loading}
                style={{
                  marginRight: '8px',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontWeight: 'bold' }}>Habilitado</span>
            </label>
            <p style={{ 
              margin: '5px 0 0 26px', 
              fontSize: '12px', 
              color: '#666' 
            }}>
              Si está deshabilitado, el producto no estará disponible para la venta
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{
                padding: '10px 20px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {loading ? 'Actualizando...' : 'Actualizar Producto'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductModal;