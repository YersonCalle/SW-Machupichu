import React, { useState } from 'react';
import logo from '../assets/images/logo-machuu.png';
import Button1 from '../components/ui/Button1/Button1.jsx';
import '../styles/pages/Login.css';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/utils.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await getData('/src/assets/files/data.json');
      const usuarios = userData.usuarios;

      const usuario = usuarios.find(
        (u) => u.user === username && u.password === password
      );

      if (usuario) {
        alert(`Bienvenido ${usuario.user}`);
        if (usuario.rol === 'administrador') {
          navigate('/Tables');
        } else {
          navigate('/mesero');
        }
      } else {
        setError('Email o contraseña incorrectos'); 
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    }
  };

  return (
    <div className="body">
      <div className="login-card">
        <div className="login-header">
          <div id='logo'>
            <img src={logo} alt="Logo de Machupicchu"/>
          </div>
          <p className="mb-0">Sabor y Confianza</p>
        </div>

        <div className="login-body">
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-triangle me-2"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label" htmlFor="username">Usuario</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input className='form-control'
                  type="text"
                  id="username"
                  placeholder="Ingresa el usuario"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <div className='input-group'>
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input className='form-control'
                  type="password"
                  id="password"
                  required
                  placeholder="Ingresa la contraseña"
                  minLength="4"
                  maxLength="10"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button1 type="submit" text="Iniciar sesión" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
