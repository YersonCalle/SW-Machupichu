import React, { useState } from 'react';
import logo from '../assets/images/logo-machuu.png';
import Button1 from '../ui/Button1/Button1.jsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/usuarios/get');
      if (!res.ok) throw new Error('Error al conectar con el servidor');

      const data = await res.json();
      const usuarios = data.usuarios || data;

      const usuario = usuarios.find(
        (u) => u.usuario === username && u.contraseña === password
      );

      if (usuario) {
        alert(`Bienvenido ${usuario.usuario}`);
        if ((u) =>u.roles === '0') {
          navigate('/Tables');
        } else {
          navigate('/mesero');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    }
  };

  return (
    <div className="body">
      <div className="login-card">
        <div className="login-header">
          <div id="logo">
            <img src={logo} alt="Logo de Machupicchu" />
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
                <span className="input-group-text"><i className="fas fa-user"></i></span>
                <input
                  className="form-control"
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
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="Ingresa la contraseña"
                  required
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
