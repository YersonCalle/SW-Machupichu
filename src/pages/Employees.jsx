import React from 'react'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import '../styles/pages/Employees.css'
import Button1 from '../components/ui/Button1/Button1.jsx'


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
            <Button1 text='Añadir'></Button1>
            <Button1 text='Permisos'></Button1>
            <Button1 text='Documentos'></Button1>
            <Button1 text='Modificar'></Button1>
            <Button1 text='Dar de Baja'></Button1>
        </aside>
        </section> 
    </main>


    </>
  )
}

export default Employees
