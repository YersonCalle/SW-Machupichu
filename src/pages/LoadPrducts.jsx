import React from 'react'
import '../styles/pages/LoadProducts.css'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import Button1 from '../components/ui/Button1/Button1.jsx'



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
        <Button1 text='Agregar producto' onClick={AddProduct}></Button1>
        <Button1 text='Eliminar producto' onClick={DeleteProduct}></Button1>
        <Button1 text='Actualizar producto' onClick={UpdateProduct}></Button1>
    </div>
    </>
    
  )
}

export default LoadPrducts
