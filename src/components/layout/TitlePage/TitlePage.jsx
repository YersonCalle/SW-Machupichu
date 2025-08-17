import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitlePage.css';

function TitlePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/src/assets/files/data.json');
        const data = await response.json();

        const usuarios = data.usuarios;
        const userActivo = usuarios.find(u => u.isLogged === true);

        if (userActivo) {
          setUsername(userActivo.user);
        } else {
          setUsername('Invitado');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setUsername('Error');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Navega a la ruta de logout, puede ser reemplazada por lógica más avanzada
    navigate('/logout');
  };

  return (
    <div className="title-header">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="btn btn-link sidebar-toggle d-md-none">
            <i className="fas fa-bars"></i>
          </button>
          <h5 className="mb-0">Panel de Administración</h5>
        </div>

        <div className="user-dropdown">
          <button className="btn btn-link dropdown-toggle">
            <i className="fas fa-user-circle me-2"></i>
            {username}
          </button>
          <div className="dropdown-menu dropdown-menu-end">
            <div className="dropdown-info">
              <span className="text-muted">Conectado como </span>
              <strong className="dropdown-name">{username}</strong>
            </div>
            <hr className="dropdown-divider" />
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitlePage;