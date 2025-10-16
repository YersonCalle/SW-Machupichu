import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TitlePage.css'

function TitlePage() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/src/assets/files/data.json')
        const data = await response.json()

        const usuarios = data.usuarios
        const userActivo = usuarios.find((u) => u.isLogged === true)

        if (userActivo) {
          setUsername(userActivo.user)
        } else {
          setUsername('Invitado')
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error)
        setUsername('Error')
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="title-header">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="btn btn-link sidebar-toggle d-md-none">
            <i className="fas fa-bars"></i>
          </button>
          <h5 className="mb-0">Panel de Administración</h5>
        </div>

        <div className="dropdown">
          {/* botón para desplegar menú */}
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user-circle me-2"></i>
            {username}
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span className="dropdown-item-text">
                <small className="text-muted">Conectado como </small> <br />
                <strong className="dropdown-name">{username}</strong>
              </span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TitlePage
