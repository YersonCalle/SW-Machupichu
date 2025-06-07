import React from 'react'
import './TitlePage.css'
import Button1 from '../../ui/Button1/Button1'


function TitlePage({title}) {

  const handleBackClick = () => {
    window.history.back();
  }
  const handleLogoutClick = () => {
    window.location.href = '/';
  }

  return (
    <div className='title-page'>
      <Button1 text='Atras' onClick={handleBackClick} />
      <h1 className=''>{title}</h1>
      <Button1 text='Cerrar sesión' onClick={handleLogoutClick} />
    </div>
  )
}

export default TitlePage
