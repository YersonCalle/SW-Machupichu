import React, { useState, useEffect } from 'react';
import { categoryService } from '../../../service/categoryService';
import './Categorias.css'
import Titulo from '../../../ui/Titulo/Titulo';
import Button2 from '../../../ui/Buttnon-Form/Button2';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const [nuevaCategoria, setNuevaCat] = useState({ nombre: "", descripcion: "" });
  const [editCat, setEditCat] = useState({ id: '', nombre: '', descripcion: '' });

  useEffect(() => {
    cargarCat();
  }, []);

  const cargarCat = async () => {
    try {
      const data = await categoryService.getAll();
      setCategorias(data);
    } catch {
      setMensaje("Error al cargar las categorias");
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await categoryService.create(nuevaCategoria);
      setNuevaCat({ nombre: "", descripcion: "" });
      setMensaje("Nueva Categoria Creada");
      cargarCat();
    } catch (err) {
      alert("No se puede crear la categoria");
    }
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await categoryService.update(editCat.id, editCat);
      setModalActive(false);
      cargarCat();
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  const eliminarCat = async (id) => {
    if (!window.confirm("¿Eliminar categoria?")) return;
    try {
      await categoryService.delete(id);
      cargarCat();
    } catch (err) {
      alert("No se pudo eliminar");
    }
  };

  const abrirModal = (cat) => {
    setEditCat({
      id: cat.id,
      nombre: cat.nombre,
      descripcion: cat.descripcion
    });
    setModalActive(true);
  };

  return (
    <div>

      <Titulo titulo="Gestion de Categorias" />

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <div className="card">
        <div className="card-header">
          <h2>Nueva Categoría</h2>
        </div>
        <form onSubmit={handleAgregar} className="form-container ">
          <div className="form-row">
            <div className="form-grou">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nuevaCategoria.nombre}
                onChange={(e) =>
                  setNuevaCat({ ...nuevaCategoria, nombre: e.target.value })
                }
                required
              />
            </div>

            <div className="form-groups">
              <label>Descripcion</label>
              <input
                type="text"
                className="form-control"
                value={nuevaCategoria.descripcion}
                onChange={(e) =>
                  setNuevaCat({ ...nuevaCategoria, descripcion: e.target.value })
                }
                required
              />
            </div>
          </div>
          <Button2 type="submit" text="Agregar Categoria" />
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
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => abrirModal(cat)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarCat(cat.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No hay categorías registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`modal ${modalActive ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Editar Categoría</h2>
            <span className="modal-close" onClick={() => setModalActive(false)}>
              &times;
            </span>
          </div>
          <form onSubmit={guardarEdicion}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={editCat.nombre}
                onChange={e => setEditCat({ ...editCat, nombre: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input
                type="text"
                value={editCat.descripcion}
                onChange={e => setEditCat({ ...editCat, descripcion: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categorias;
