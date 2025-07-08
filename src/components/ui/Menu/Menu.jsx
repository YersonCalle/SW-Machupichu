import React from 'react'
import './Menu.css'

function CardSale({title, price, onClick}) {
  return (
    <div className='prod' onClick={onClick}>
        <div className='prod-title'>
            <h3>{title}</h3>
        </div>
        <div className='prod-price'>
            <h3>$ {price}</h3>
        </div>
    </div>
  )
}

export default CardSale