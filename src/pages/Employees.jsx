
import { useState } from "react"
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import '../styles/pages/Employees.css'


const Employees = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Carlos Mendoza",
      email: "carlos@machupicchu.com",
      phone: "+51 987 654 321",
      role: "admin",
      status: "active",
      hireDate: "2023-01-15",
    },
    {
      id: 2,
      name: "María García",
      email: "maria@machupicchu.com",
      phone: "+51 987 654 322",
      role: "manager",
      status: "active",
      hireDate: "2023-02-20",
    },
    {
      id: 3,
      name: "José Rodríguez",
      email: "jose@machupicchu.com",
      phone: "+51 987 654 323",
      role: "waiter",
      status: "active",
      hireDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Ana López",
      email: "ana@machupicchu.com",
      phone: "+51 987 654 324",
      role: "waiter",
      status: "active",
      hireDate: "2023-04-05",
    },
    {
      id: 5,
      name: "Pedro Vargas",
      email: "pedro@machupicchu.com",
      phone: "+51 987 654 325",
      role: "kitchen",
      status: "inactive",
      hireDate: "2023-01-30",
    },
  ])

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
        id: Math.max(...employees.map((e) => e.id)) + 1,
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

  return (
    <>
    <TitlePage title='Empleados' />
    
    <div className="employees-container">
      <div className="employees-header">
        <h2>Gestión de Empleados</h2>
        <button className="add-product-btn" onClick={handleAddEmployee}>
          + Agregar Empleado
        </button>
      </div>

      <div className="employees-table">
        <table className="table">
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
            {employees.map((employee) => (
              <tr key={employee.id}>
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
                    <button className="edit-btn" onClick={() => handleEditEmployee(employee)}>
                      Editar
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingEmployee ? "Editar Empleado" : "Agregar Empleado"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rol</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="form-select">
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
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
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEmployee ? "Actualizar" : "Agregar"}
                </button>
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

