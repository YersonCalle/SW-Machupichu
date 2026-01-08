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
        <p className="slogan">Sabor y Confianza</p>
      </div>

      <div className="login-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form className="form-login" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <div className="input-with-icon">
              <span className="icon">👤</span>
              <input
                type="text"
                id="usuario"
                value={usuario}
                placeholder="Ingresa el usuario"
                required
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                id="password"
                value={password}
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
};

export default Login;
