import React, { useState } from 'react';
import logo from '../assets/images/logo-machuu.png';
import Button1 from '../components/ui/Button1/Button1.jsx';
import '../styles/pages/Login.css';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/utils.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
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
        alert('Email o contraseña incorrectos');
      }
    } catch (error) {
      alert('Error de conexión: ' + error.message);
    }
  };

  return (
    <>
      <div className="login">
        <h2>LOGIN</h2>
        <div className="login-container">
          <img src={logo} alt="Logo de Machupicchu" className="logo-login" />

          <form className="form-login" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa el usuario"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Ingresa la contraseña"
                minLength="4"
                maxLength="10"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button1 type="submit" text="Iniciar sesión" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
