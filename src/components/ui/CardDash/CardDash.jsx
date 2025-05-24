import React from 'react'
import './CardDash.css'
import { useNavigate } from 'react-router-dom'

function CardDash({title, icon, url}) {
  const navigate = useNavigate()
  return (
    <div className='card-dash' onClick={() => navigate(url)}> 
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
