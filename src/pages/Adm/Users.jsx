import { useState, useEffect } from "react"
import TitlePage from '../../components/layout/TitlePage/TitlePage.jsx'
import '../../styles/pages/Employees.css'
import { getData } from '../../utils/utils.js'

const Employees = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [employees, setEmployees] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "waiter",
    status: "active",
    hireDate: "",
  })

  const roles = [
    { value: "admin", label: "Administrador" },
    { value: "manager", label: "Gerente" },
    { value: "waiter", label: "Mesero" },
    { value: "kitchen", label: "Cocina" },
  ]

  const getRoleLabel = (role) => {
    const roleObj = roles.find((r) => r.value === role)
    return roleObj ? roleObj.label : role
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "waiter",
      status: "active",
      hireDate: "",
    })
    setShowModal(true)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      status: employee.status,
      hireDate: employee.hireDate,
    })
    setShowModal(true)
  }

  const handleDeleteEmployee = (employeeId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
      setEmployees(employees.filter((e) => e.id !== employeeId))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingEmployee) {
      setEmployees(employees.map((e) => (e.id === editingEmployee.id ? { ...e, ...formData } : e)))
    } else {
      const newEmployee = {
        id: Math.max(...employees.map((e) => e.id), 0) + 1,
        ...formData,
      }
      setEmployees([...employees, newEmployee])
    }

    setShowModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const userData = await getData("/src/assets/files/data.json")
        setEmployees(userData.usuarios || [])
      } catch (error) {
        console.error("Error al cargar los usuarios:", error)
      }
    }

    fetchEmployees()
  }, [])

  return (
    <>
    <TitlePage />
    <div className="employees-container container-fluid p-4">
      <div className="employees-header">
        <h2><i class="fas fa-users me-2"></i>Gestión de Usuarios</h2>
        <button className="btn btn-danger" onClick={handleAddEmployee}><i class="fas fa-plus me-2"></i>Agregar Empleado</button>
      </div>

      //mensaje de alerta ---

    <div className="card">
    <div className="card-body">
      <div className="employees-table table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha de Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className="employee-info">
                    <div className="employee-avatar">{getInitials(employee.name)}</div>
                    <div>
                      <div className="employee-name">{employee.name}</div>
                      <div className="employee-email">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td>{employee.phone}</td>
                <td>
                  <span className={`role-badge role-${employee.role}`}>{getRoleLabel(employee.role)}</span>
                </td>
                <td>
                  <span className={`status-${employee.status}`}>
                    {employee.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                <td>
                  <div className="product-actions">
                    <button className="edit-btn" onClick={() => handleEditEmployee(employee)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.id)}>Eliminar</button>
                  </div>
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
              <h3 className="modal-title">{editingEmployee ? "Editar Empleado" : "Agregar Empleado"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Rol</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="form-select">
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Estado</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="form-select">
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Fecha de Ingreso</label>
                <input type="date" name="hireDate" value={formData.hireDate} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editingEmployee ? "Actualizar" : "Agregar"}</button>
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



