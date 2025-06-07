import React from 'react'
import '../styles/pages/LoadProducts.css'
import TitlePage from '../components/layout/TitlePage/TitlePage.jsx'
import Button1 from '../components/ui/Button1/Button1.jsx'
import CardProduct from '../components/ui/CardProduct/CardProduct.jsx'


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
    <div className='list-products'>
      <h3 className='subtitle'>Listado de productos</h3>
      <CardProduct title='Pollo' id={20} price={500} descrip='Pollo a la brasa pe'/>
      <CardProduct title='Chaufa' id={20} price={400} descrip='Chaufa mixto'/>
      <CardProduct title='Lomo saltado' id={20} price={300} descrip='Lomo a lo pobre webon'/>
      <CardProduct title='Chola de oro' id={20} price={200} descrip='Chola de tu hermana'/>
      <CardProduct title='Salchipapa' id={20} price={250} descrip='Salchipapon'/>

    </div>
    <div className='load-container'>
        <h3 className='subtitle'>Eliminar Producto</h3>
        <p>Precaución:</p>
        <p>Tenga en cuenta que al ELIMINAR un producto se borrara COMPLETAMENTE del sistema, esto incluye si hay alguna mesa activa con este producto seleccionado. Se recomienda eliminar con cuidado y fuera de horario laboral,</p>
        <Button1 text='ELIMINAR PRODUCTO' onClick={DeleteProduct}></Button1>
    </div>
    </>
    
  )
}

export default LoadPrducts