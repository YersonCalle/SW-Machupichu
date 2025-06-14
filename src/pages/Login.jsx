import React from 'react'
import logo from '../assets/images/logo-machuu.png'
import Button1 from '../components/ui/Button1/Button1.jsx'
import '../styles/pages/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../assets/files/data.json'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showModal , setShowModal] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      alert('Bienvenido');
      navigate('/point-of-sale');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert('Registro enviado');
    setShowModal(false);
  };

async function getData(rutaArchivo) {
  try {
    const response = await fetch(rutaArchivo);
    
    if (!response.ok) {
      throw new Error(`No se pudo encontrar: ${rutaArchivo}`);
    }
    
    const data = await response.json();
    console.log(`Contenido de ${rutaArchivo}:`, data);
    return data;
    
  } catch (error) {
    console.error(`Error leyendo ${rutaArchivo}:`, error.message);
  }
}



  return (
    <>
    <div class='login'>
          <h2>LOGIN</h2>
        <div class='login-container'>
        <img src={logo} alt="Logo de Machupicchu" className='logo-login' />
        
    <form className="form-login" >
        <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input 
              type="text"
              id="username"
              name="username"
              placeholder='Ingresa el usuario'
              aria-required="true"
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
              placeholder='Ingresa la contraseña'
              aria-required="true" 
              minLength="4"
              maxLength="10"
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <Button1 text='Iniciar Sesión' onClick={() => getData('/src/assets/files/data.json')} />
        <Button1 text='Agregar Usuario' onClick={() => setShowModal(true)} />
    </form>    
    </div>
  </div>
  
  {showModal && (
  <div className="login-modal">
    <div className="login-modalAdd">
      <form onSubmit={handleRegisterSubmit}>
        <h2>Registrar Usuario</h2>
        <div className='login-modal-form'>
        <label htmlFor="name">Nombre</label>
        <input type="name" name='name'/>
        <label htmlFor="user">Usuario</label>
        <input type="text" name="user" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password-add" />
        <label htmlFor="token">Token</label>
        <input type="password" name="token" />
        
      </div>      
        <div className='modal-btn'>
        <Button1 text='Registrar' />
        <Button1 text='Cancelar' onClick={() => setShowModal(false)} />
        </div>
      
      </form>

    </div>
  </div>
)}
</>
  );  
}

export default Login
