import React, { useState, useEffect } from 'react';
import { userService } from '../../../service/userService';
import './Empleados.css';

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
      <header className="header"><h1>Gestión de Personal</h1></header>

      <section className="card">
        <form onSubmit={handleCreate} className="form-container">
          <div className="form-row">
            <input type="text" placeholder="Usuario" className="form-control" value={nuevo.usuario} 
                   onChange={e => setNuevo({...nuevo, usuario: e.target.value})} required />
            <input type="password" placeholder="Clave" className="form-control" value={nuevo.contraseña} 
                   onChange={e => setNuevo({...nuevo, contraseña: e.target.value})} required />
            <select className="form-control" value={nuevo.rol_id} onChange={e => setNuevo({...nuevo, rol_id: e.target.value})}>
              <option value={1}>Admin</option>
              <option value={3}>Mesero</option>
              <option value={4}>Cocinero</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      </section>

      <section className="card mt-20">
        <table className="table-custom">
          <thead>
            <tr><th>Usuario</th><th>Rol</th><th>Cargo</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp.id}>
                <td>{emp.usuario}</td>
                <td><span className="badge">{emp.rol?.descripcion}</span></td>
                <td>{emp.cargo?.descripcion}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => { setEdit(emp); setShowModal(true); }}>Editar</button>
                  <button className="btn btn-sm btn-danger ml-5" onClick={() => userService.delete(emp.id).then(load)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2>Editar {edit.usuario}</h2>
            <form onSubmit={handleUpdate}>
              <label>Nuevo Nombre de Usuario</label>
              <input type="text" className="form-control" value={edit.usuario} onChange={e => setEdit({...edit, usuario: e.target.value})} />
              <label>Cambiar Rol</label>
              <select className="form-control" value={edit.rol_id} onChange={e => setEdit({...edit, rol_id: e.target.value})}>
                <option value={1}>Admin</option>
                <option value={3}>Mesero</option>
                <option value={4}>Cocinero</option>
              </select>
              <button type="submit" className="btn btn-primary btn-block">Guardar</button>
              <button type="button" className="btn btn-secondary btn-block" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;