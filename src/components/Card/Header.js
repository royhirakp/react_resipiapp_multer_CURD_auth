import React from 'react'
import "./Header.css"
import { useNavigate } from "react-router-dom";

import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
const Header = () => {
  const navgate = useNavigate()
  function LogOut (){
    localStorage.removeItem('logToken')
    navgate('/') //
}
  return (
    <div className='headerContainer'>
        <div className='logobutton' onClick={()=>navgate('/home')}>
            <LocalDiningIcon/>   Recipe App
            {/* <RestaurantMenuIcon/>    */}
        </div>

        <button onClick={()=>LogOut()}>logout</button>
        
    </div>
  )
}

export default Header
