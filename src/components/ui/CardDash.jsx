import React from 'react'
import './CardDash.css'

function CardDash({title, icon}) {
  return (
    <div className='card-dash'>
        <div className='card-dash-icon'>
            <img src={icon} alt="Icono" />
        </div>
        <div className='card-dash-title'>
            <h3>{title}</h3>
        </div>
    </div>
  )
}

export default CardDash
