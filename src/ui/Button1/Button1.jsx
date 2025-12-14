import React from 'react'
import './Button1.css'


function Button1({text, onClick}) {
  return (
    <button onClick={onClick} className='button1'>
      {text}
    </button>
  )
}

export default Button1
