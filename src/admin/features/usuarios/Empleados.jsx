import React, { useState, useEffect } from 'react';
import { userService } from '../../../service/userService';
import './Empleados.css';
import Titulo from '../../../ui/Titulo/Titulo';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo] = useState({ usuario: '', contraseña: '', rol_id: 3 });
  const [edit, setEdit] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const data = await userService.getAll();
    setEmpleados(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await userService.create(nuevo);
    if (res.ok) {
      setNuevo({ usuario: '', contraseña: '', rol_id: 3 });
      load();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await userService.update(edit.id, edit);
    if (res.ok) {
      setShowModal(false);
      load();
    }
  };

  return (
    <div className="empleados-container">
      <Titulo titulo="Gestion de Usuarios" />

    <section className="card">
      <div className="card-header">
        <h2>Nuevo Empleado</h2>
      </div>

      <form onSubmit={handleCreate} className="form-container">
      
        <div className="form-row">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              value={nuevo.nombre}
              onChange={(e) =>
                setNuevo({ ...nuevo, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select
              className="form-control"
              value={nuevo.rol_id}
              onChange={(e) =>
                setNuevo({ ...nuevo, rol_id: e.target.value })
              }
            >
              <option value={3}>Mesero</option>
              <option value={1}>Administrador</option>
              <option value={4}>Cocinero</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              value={nuevo.usuario}
              onChange={(e) =>
                setNuevo({ ...nuevo, usuario: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={nuevo.contraseña}
              onChange={(e) =>
                setNuevo({ ...nuevo, contraseña: e.target.value })
              }
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Empleado
        </button>
      </form>
    </section>

    <section className="card mt-20">
      <div className="card-header">
        <h2>Lista de Empleados</h2>
      </div>

      <div className="table-container">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {empleados.length > 0 ? (
              empleados.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.nombre}</td>
                  <td>{emp.usuario}</td>
                  <td>
                    <span
                      className={`badge ${
                        emp.rol?.descripcion?.toUpperCase() === "MESERO"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {emp.rol?.descripcion}
                    </span>
                  </td>
                  <td>{emp.fecha_creacion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setEdit(emp);
                        setShowModal(true);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No hay empleados registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>

    {/* MODAL EDITAR */}
    {showModal && (
      <div className="modal-overlay">
        <div className="modal-content card">
          <h2>Editar Empleado</h2>

          <form onSubmit={handleUpdate}>
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              value={edit.usuario}
              onChange={(e) =>
                setEdit({ ...edit, usuario: e.target.value })
              }
            />

            <label>Rol</label>
            <select
              className="form-control"
              value={edit.rol_id}
              onChange={(e) =>
                setEdit({ ...edit, rol_id: e.target.value })
              }
            >
              <option value={3}>Mesero</option>
              <option value={1}>Administrador</option>
              <option value={4}>Cocinero</option>
            </select>

            <button type="submit" className="btn btn-primary btn-block">
              Guardar
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default Empleados;