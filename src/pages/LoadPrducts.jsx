import React from 'react'
import '../styles/pages/LoadProducts.css'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'



function LoadPrducts() {


  const AddProduct = (e) => {
    alert('Agregaste un producto')
    }
  const DeleteProduct = (e) => {
    alert('Eliminaste un producto')
  }
  const UpdateProduct = (e) => {
    alert('Actualizaste un producto')
  }

  return (
    <>
    <TitlePage title='Productos' />
    <div className='load-container'>
        <button id='btn-add-product' onClick={AddProduct}>Agregar producto</button>
        <button id='btn-delete-product' onClick={DeleteProduct}>Eliminar producto</button>
        <button id='btn-update-product' onClick={UpdateProduct}>Modificar producto</button>
    </div>
    </>
    
  )
}

export default LoadPrducts
