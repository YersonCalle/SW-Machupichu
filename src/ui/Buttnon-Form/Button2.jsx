import React from 'react'
import './Button2.css'


function Button2({text, onClick}) {
  return (
    <button onClick={onClick} className='btn-form' >
      {text}
    </button>
  )
}

export default Button2;
