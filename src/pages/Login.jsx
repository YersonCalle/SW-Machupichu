import React, { useState } from 'react';
import logo from '../assets/images/logo-machuu.png';
import Button1 from '../ui/Button1/Button1.jsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchData } from '../service/api.js';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchData('usuarios.json');

      const userFound = data.usuarios.find(
        u => u.usuario === usuario && u.password === password
      );

      if (!userFound) {
        setError('Usuario o contraseña incorrectos');
        return;
      }

      if (userFound.activo === 0) {
        setError('Cuenta desactivada');
        return;
      }

      localStorage.setItem('user_name', userFound.nombre);
      localStorage.setItem('user_role', userFound.rol);

      if (userFound.rol === 'admin') navigate('/admin');
      else navigate('/pos');

    } catch (err) {
      setError('Error de conexión');
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
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <label className="form-label" htmlFor="">Usuario</label>
            <input
              type="text"
              placeholder="Usuario"
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <label htmlFor="">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button1 type="submit" text="Iniciar sesión" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
