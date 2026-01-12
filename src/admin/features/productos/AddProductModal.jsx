import React, { useState, useEffect } from 'react';
import './AddProductModal.css';

function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [formData, setFormData] = useState({
    descripcion: '',
    precio: '',
    categoria_id: '',
    estado: true
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    } else if (formData.descripcion.length < 3) {
      newErrors.descripcion = 'La descripción debe tener al menos 3 caracteres';
    }
    
    if (!formData.precio) {
      newErrors.precio = 'El precio es requerido';
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }
    
    if (!formData.categoria_id) {
      newErrors.categoria_id = 'La categoría es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Enviar formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descripcion: formData.descripcion.trim(),
          precio: parseFloat(formData.precio),
          categoria_id: parseInt(formData.categoria_id),
          estado: formData.estado
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Error al crear producto');
      }

      const result = await response.json();
      console.log('Producto creado:', result);
      
      // Resetear formulario
      setFormData({
        descripcion: '',
        precio: '',
        categoria_id: '',
        estado: true
      });
      
      // Notificar al componente padre
      if (onProductAdded) {
        onProductAdded(result);
      }
      
      alert('Producto creado correctamente');
      onClose();
      
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  // Cerrar modal
  const handleClose = () => {
    setFormData({
      descripcion: '',
      precio: '',
      categoria_id: '',
      estado: true
    });
    setErrors({});
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategorias = async () => {
      setLoadingCategorias(true);
      try {
        const data = await fetch('http://localhost:3000/api/categorias').then(res => res.json());
        setCategorias(data);
      } catch (error) {
        console.error('Error cargando categorías:', error);
      } finally {
        setLoadingCategorias(false);
      }
    };

    fetchCategorias();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Crear Nuevo Producto</h3>
          <button className="close-btn" onClick={handleClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="descripcion">Descripción del Producto *</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={errors.descripcion ? 'error' : ''}
              placeholder="Ej: Lomo saltado con papas fritas"
            />
            {errors.descripcion && <span className="error-text">{errors.descripcion}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={errors.precio ? 'error' : ''}
              placeholder="Ej: 899.99"
              step="0.01"
              min="0"
            />
            {errors.precio && <span className="error-text">{errors.precio}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="categoria_id">Categoría *</label>
            <select
              id="categoria_id"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              className={errors.categoria_id ? 'error' : ''}
              disabled={loadingCategorias}
            >
              <option value="">
                {loadingCategorias ? 'Cargando categorías...' : 'Seleccionar categoría'}
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            {errors.categoria_id && <span className="error-text">{errors.categoria_id}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado}
                onChange={handleChange}
              />
              <span>Producto habilitado</span>
            </label>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;