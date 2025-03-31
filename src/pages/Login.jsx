import React from 'react'
import logo from '../assets/images/logo-machu.svg'
import '../styles/pages/Login.css'
function Login() {
  return (
    <form className="form-login" >
        <h2>MACHUPICCHU</h2>
        <img src={logo} alt="Logo de Machupicchu" className='logo-login' />
        <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required placeholder='Ingresa el usuario' aria-required="true"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required placeholder='Ingresa la contraseña' aria-required="true" 
            minlength="4" maxlength="10" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$" 
            title="La contraseña debe tener al menos 4 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial (como !, @, #, etc.)"/>
        </div>
        <button type="submit">Iniciar Sesion</button>
    </form>
  )
}

export default Login
