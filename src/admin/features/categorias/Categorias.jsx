import React, { useState, useEffect } from 'react';
import { getData } from '../../../utils/utils';
import './Categorias.css'

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalActive, setModalActive] = useState(false);
  
  const [editCat, setEditCat] = useState({ id: '', nombre: '', descripcion: '' });

  useEffect(() => {
    getData('').then(data => {
      if (data) setCategorias(data.filter(cat => cat.activo === 1));
    });
  }, []);

  const abrirModal = (cat) => {
    setEditCat(cat);
    setModalActive(true);
  };

  return (
    <div>
      <div className="header">
        <h1>Categorías</h1>
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <div className="card">
        <div className="card-header">
          <h2>Nueva Categoría</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="nombre" required />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input type="text" name="descripcion" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Agregar Categoría</button>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Lista de Categorías</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length > 0 ? (
                categorias.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.nombre}</td>
                    <td>{cat.descripcion}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-sm btn-primary" onClick={() => abrirModal(cat)}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => confirm('¿Eliminar esta categoría?')}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No hay categorías registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL EDITAR - Replicando tu lógica JS */}
      <div className={`modal ${modalActive ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Editar Categoría</h2>
            <span className="modal-close" onClick={() => setModalActive(false)}>&times;</span>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Nombre</label>
              <input 
                type="text" 
                value={editCat.nombre} 
                onChange={e => setEditCat({...editCat, nombre: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input 
                type="text" 
                value={editCat.descripcion} 
                onChange={e => setEditCat({...editCat, descripcion: e.target.value})} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categorias;