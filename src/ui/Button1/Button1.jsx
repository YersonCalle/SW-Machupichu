import React from 'react'
import './Button1.css'


function Button1({text, color, onClick}) {
  return (
    <button onClick={onClick} className='button1' style={{backgroundColor: color}}>
      {text}
    </button>
  )
}

export default Button1
