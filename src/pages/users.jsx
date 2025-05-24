import React from 'react'
import '../styles/pages/Users.css'


function Sales() {
    const [products, setProducts] = React.useState([])
    const [total, setTotal] = React.useState(0)

    function handleAddProduct(product) {
        setProducts([...products, product])
        setTotal(total + product.price)
    }

  return (
    <>
    <header>
        <h1>Machupicchu</h1>
    </header>
    <main>
        <h2>Empleados</h2>
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

export default Users
