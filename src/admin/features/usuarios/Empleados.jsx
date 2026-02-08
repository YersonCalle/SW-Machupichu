import React, { useState, useEffect } from 'react';
import { userService } from '../../../service/userService';
import './Empleados.css';
import Titulo from '../../../ui/Titulo/Titulo';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo] = useState({ usuario: '', contraseña: '',nombre_apellido:"", rol_id: 3 });
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  useEffect(() => { load(); }, []);

  const load = async () => {
    const data = await userService.getAll();
    setEmpleados(data);
  };

 const handleCreate = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

  try{
    const res = await userService.create({
      ...nuevo,
      rol_id: Number(nuevo.rol_id)
    });

    if (res.ok) {
      setSuccess("Usuario creado correctamente");
      setNuevo({ usuario: '', contraseña: '', nombre_apellido: '', rol_id: 3 });
      load();
    }else{
      setError(res.message|| "Error al crear el usuario");
    }
  }catch{setError("Error de conexion con el servidor");}

  setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    try { 
    const res = await userService.update(edit.id, {
      usuario: edit.usuario,
      nombre_apellido : edit.nombre_apellido,
      rol_id: Number(edit.rol_id)
    });

    if (res.ok) {
      setSuccess(" Usuario actualizado correctamente");
      setShowModal(false);
      load();
    }else{
      setError(res.message || "Error al actualizar el usuario");
    }
    }
    catch{
      setError("Error al conectar con el servidor")
    }
    setLoading(false);
  };
  const clearMessages = () => {
    setSuccess("");
    setError("");
  }

  return (
    <div className="empleados-container">
      <Titulo titulo="Gestion de Usuarios" />

    {success && <div className="alert success">{success}</div>}
    {error && <div className="alert error">{error}</div>}
    {loading && <div className="alert loading">Procesando...</div>}

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
              value={nuevo.nombre_apellido}
              onChange={(e) =>
                setNuevo({ ...nuevo, nombre_apellido: e.target.value })
              }
           
            />
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select
              className="form-control"
              value={nuevo.rol_id}
              onChange={(e) =>
                setNuevo({ ...nuevo, rol_id: Number(e.target.value) })
              }
            >
              <option value={3}>Mesero</option>
              <option value={1}>Administrador</option>
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
                  <td>{emp.nombre_apellido}</td>
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
  setEdit({
    ...emp,
    rol_id: emp.rol?.id || 3
  });
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

    {showModal && (
      <div className="modal-overlay">
        <div className="modal-content card">
          <h2>Editar </h2>

          <form onSubmit={handleUpdate}>
            <label >Nombre</label>
            <input 
              type="text" 
              className="form-control"
              value={edit.nombre_apellido}
              onChange={(e)=>
              setEdit({ ...edit , nombre_apellido : e.target.value })
            }
            />

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