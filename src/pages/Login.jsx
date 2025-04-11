import React from 'react'
import logo from '../assets/images/logo-machuu.png'
import '../styles/pages/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      alert('Bienvenido');
      navigate('/dashboard')
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }


  return (
    <form className="form-login" >
        <img src={logo} alt="Logo de Machupicchu" className='logo-login' />
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
        <button type="submit" onClick={handleSubmit} className="btn-login">Iniciar Sesión</button>
    </form>
  )
}

export default Login
