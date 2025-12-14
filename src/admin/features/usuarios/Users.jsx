import { useState, useEffect } from "react"
import TitlePage from '../../../ui/TitlePage/TitlePage.jsx';
import './Employees.css'

const API_URL = "http://localhost:3000/api/usuarios"

const Employees = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    usuario: "",
    rol_id: 3, // por defecto "mesero"
    contraseña: "",
    estado: "activo",
    fecha_creacion: new Date().toISOString().split("T")[0],
    fecha_modificacion: new Date().toISOString().split("T")[0],
    fecha_ultimo_acceso: null
  })

  const roles = [
    { id: 1, label: "Administrador" },
    { id: 2, label: "Gerente" },
    { id: 3, label: "Mesero" },
    { id: 4, label: "Cocina" },
  ]

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/get`)
        const data = await res.json()
        if (res.ok) {
          setEmployees(data.usuarios || [])
        } else {
          console.error(data.message)
        }
      } catch (error) {
        console.error("Error al cargar los usuarios:", error)
      }
    }
    fetchEmployees()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const method = editingEmployee ? "PUT" : "POST"
    const url = editingEmployee
      ? `${API_URL}${editingEmployee.id}`
      : `${API_URL}/:id`

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      alert(editingEmployee ? "Empleado actualizado" : "Empleado agregado")

      setShowModal(false)
      setEditingEmployee(null)
      // refresca la lista
      const refresh = await fetch(`${API_URL}/get`)
      const updated = await refresh.json()
      setEmployees(updated.usuarios || [])
    } catch (error) {
      console.error("Error:", error)
      alert("Error al guardar usuario")
    }
  }

  // ✅ Eliminar usuario
  const handleDeleteEmployee = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      alert("Usuario eliminado correctamente")
      setEmployees(employees.filter((e) => e.id !== id))
    } catch (error) {
      console.error(error)
      alert("Error al eliminar usuario")
    }
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setFormData(employee)
    setShowModal(true)
  }

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setFormData({
      usuario: "",
      rol_id: 3,
      contraseña: "",
      estado: "activo",
      fecha_creacion: new Date().toISOString().split("T")[0],
      fecha_modificacion: new Date().toISOString().split("T")[0],
      fecha_ultimo_acceso: null
    })
    setShowModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <TitlePage />
      <div className="employees-container container-fluid p-4">
        <div className="employees-header">
          <h2><i className="fas fa-users me-2"></i>Gestión de Usuarios</h2>
          <button className="btn btn-danger" onClick={handleAddEmployee}>
            <i className="fas fa-plus me-2"></i>Agregar Empleado
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.usuario}</td>
                      <td>{roles.find((r) => r.id === e.rol_id)?.label || "—"}</td>
                      <td>{e.estado}</td>
                      <td>{new Date(e.fecha_creacion).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleEditEmployee(e)} className="btn btn-sm btn-warning me-2">Editar</button>
                        <button onClick={() => handleDeleteEmployee(e.id)} className="btn btn-sm btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{editingEmployee ? "Editar Usuario" : "Agregar Usuario"}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
              </div>

              <form onSubmit={handleSubmit}>
                <label>Usuario</label>
                <input type="text" name="usuario" value={formData.usuario} onChange={handleInputChange} required />

                <label>Contraseña</label>
                <input type="password" name="contraseña" value={formData.contraseña} onChange={handleInputChange} required />

                <label>Rol</label>
                <select name="rol_id" value={formData.rol_id} onChange={handleInputChange}>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>

                <label>Estado</label>
                <select name="estado" value={formData.estado} onChange={handleInputChange}>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>

                <div className="form-actions">
                  <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="submit">{editingEmployee ? "Actualizar" : "Agregar"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Employees
