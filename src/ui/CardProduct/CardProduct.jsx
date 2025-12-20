import React from 'react'
import './CardProduct.css'
import Button1 from '../Button1/Button1'


function CardProduct({title, id, price, descrip, onUpdate, onDelete, category, image}) {
  return (
    <div className='card-product'>
      <div className='card-product-left'>
        <div className='card-product-info'>
            <p className='card-product-id'>#{id}</p>
            <h2 className='card-product-title'>{title}</h2>
            <p className='card-product-price'>${price}</p>
            <p className='card-product-category'> {category}</p>
        </div>
      </div>
        <div className='card-product-actions'>
            <Button1 text='Editar' onClick={onUpdate} className='card-product-button'></Button1>
            <Button1 text='Deshabilitar' onClick={onDelete} className='card-product-button'></Button1>
        </div>
    </div>
  )
}

export default CardProduct
