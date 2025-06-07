import React from 'react'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import '../styles/pages/Users.css'


function Employees() {


  return (
    <>
    <TitlePage title='Empleados' />
    <main>
        <section class="users-users">    
            <section class="users-employees">
            <div class="users-categories">
                <h2>Administrador</h2>
                <div class="lista"></div>
            </div>
            <div class="users-categories">
                <h2>Cocineros</h2>
                <div class="lista"></div>
            </div>
            <div class="users-categories">
                <h2>Meseros</h2>
                <div class="lista"></div>
            </div>
        </section>

        <aside class="users-actions">
            <button>Añadir</button>
            <button>Permisos</button>
            <button>Documentos</button>
            <button>Modificar</button>
            <button>Dar de Baja</button>
        </aside>
        </section> 
    </main>


    </>
  )
}

export default Employees
