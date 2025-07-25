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
      <div className="title-container">
        <div className="title-left">
          <button className="toggle-button">
            <i className="fas fa-bars"></i>
          </button>
          <h5 className="panel-label">Panel de Administración</h5>
        </div>

        <div className="user-dropdown">
          <button className="dropdown-toggle">
            <i className="fas fa-user-circle icon-user"></i>
            {username}
          </button>
          <div className="dropdown-menu">
            <div className="dropdown-info">
              <span className="dropdown-text">Conectado como</span>
              <strong className="dropdown-name">{username}</strong>
            </div>
            <hr className="dropdown-divider" />
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt icon-logout"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitlePage;