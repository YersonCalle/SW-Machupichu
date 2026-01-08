import React, { useState } from 'react';
import logo from '../assets/images/logo-machuu.png';
import Button1 from '../ui/Button1/Button1.jsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getData } from '../utils/utils.js';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
   
      const usuarios = await getData('http://localhost:3000/api/usuarios');

      const userFound = usuarios.find(
        u => u.usuario === usuario && u.contraseña === password
      );

      if (!userFound) {
        setError('Usuario o contraseña incorrectos');
        return;
      }

      if (userFound.estado === 0) {
        setError('Cuenta desactivada');
        return;
      }

      localStorage.setItem('user_id', userFound.id);
      localStorage.setItem('user_name', userFound.usuario);
      localStorage.setItem('user_role', userFound.rol.descripcion);

      if (userFound.rol.descripcion === 'Administrador') {
        navigate('/admin');
      } else {
        navigate('/pos');
      }

    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
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
            <label className="form-label" htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
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
