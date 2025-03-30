import React from 'react'

function Login() {
  return (
    <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
    </form>
  )
}

export default Login
