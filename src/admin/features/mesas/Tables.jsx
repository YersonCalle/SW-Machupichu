import React, { useState, useEffect } from "react";
import { mesaService } from "../../../service/mesaService";
import Titulo from "../../../ui/Titulo/Titulo";
import Button2 from "../../../ui/Buttnon-Form/Button2";
import "./Table.css";

const Tables = () => {
  const [mesas, setMesas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nuevaMesa, setNuevaMesa] = useState({ numero: "", capacidad: "" });
  const [editMesa, setEditMesa] = useState({ id: null, numero: "", capacidad: "", estado: "disponible" });

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    try {
      const data = await mesaService.getAll();
      setMesas(data);
    } catch (err) {
      setMensaje("Error al cargar las mesas");
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await mesaService.create(nuevaMesa);
      setNuevaMesa({ numero: "", capacidad: "" });
      setMensaje("Mesa creada correctamente");
      cargarMesas();
    } catch (err) {
      alert("No se pudo crear la mesa");
    }
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await mesaService.update(editMesa.id, editMesa);
      setShowModal(false);
      cargarMesas();
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  const eliminarMesa = async (id) => {
    if (!window.confirm("¿Eliminar mesa?")) return;
    try {
      await mesaService.delete(id);
      cargarMesas();
    } catch (err) {
      alert("No se pudo eliminar");
    }
  };
  const abrirModalEditar = (mesa) => {
  setEditMesa({
    id: mesa.id,
    numero: mesa.numero,
    capacidad: mesa.capacidad,
    estado: mesa.estado?.descripcion?.toLowerCase() ,
  });
  setShowModal(true);
};

  return (
    <div>
      
      < Titulo titulo="Gestion de Mesas"/>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <div className="card-table">
        <div className="card-header">
          <h2>Agregar Nueva Mesa</h2>
        </div>

        <form onSubmit={handleAgregar} className="form-container ">
          <div className="form-row">
            <div className="form-grou">
              <label>Número de Mesa</label>
              <input
                type="number"
                className="form-control"
                value={nuevaMesa.numero}
                onChange={(e) =>
                  setNuevaMesa({ ...nuevaMesa, numero: e.target.value })
                }
                required
              />
            </div>

            <div className="form-groups">
              <label>Capacidad</label>
              <input
                type="number"
                className="form-control"
                value={nuevaMesa.capacidad}
                onChange={(e) =>
                  setNuevaMesa({ ...nuevaMesa, capacidad: e.target.value })
                }
                required
              />
            </div>
          </div>
          <Button2 type="submit" text="Agregar Mesa" />
        </form>
      </div>

      <div className="card mt-20">
        <div className="card-header"><h2>Lista de Mesas</h2></div>
        <div className="table-container">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Número</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {mesas.map((mesa) => (
                <tr key={mesa.id}>
                  <td>Mesa {mesa.numero ?? mesa.id}</td>
                  <td>{mesa.capacidad} personas</td>
                  <td>
                    <span className={`badge badge-${mesa.estado?.descripcion === "disponible" ? "success" : "danger"}`}>
                      {mesa.estado?.descripcion }
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => abrirModalEditar(mesa)}>Editar</button>
                    <button className="btn btn-sm btn-danger ml-5" onClick={() => eliminarMesa(mesa.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2>Editar Mesa</h2>
            <hr />

            <form onSubmit={guardarEdicion}>
              <div className="form-group">
              <label>Número</label>
              <input
                type="number"
                className="form-control"
                value={editMesa.numero}
                onChange={(e) =>
                  setEditMesa({ ...editMesa, numero: e.target.value })}/>
              </div>
              
              <div className="form-group">
              <label>Capacidad</label>
              <input
                type="number"
                className="form-control"
                value={editMesa.capacidad}
                onChange={(e) =>
                  setEditMesa({ ...editMesa, capacidad: e.target.value })}/>
              </div>
              
              <div className="form-group">
              <label>Estado</label>
              <select
                className="form-control"
                value={editMesa.estado}
                onChange={(e) =>
                  setEditMesa({ ...editMesa, estado: e.target.value })}>

                <option value="libre">Libre</option>
                <option value="ocupada">Ocupada</option>
              </select>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
