import React from 'react'
import { LoginContaxt } from "./LoginContaxt";
import Test from "../components/Test";


const Providor = () => {
    const [a, seta] = useState('testcontex');
const [b, setB ]= useState('its bbbbbbb')
  return (
    <div>
        <LoginContaxt.Provider value={{a,seta,b}}>
             <Test/>
        </LoginContaxt.Provider>
      
    </div>
  )
}

export default Providor
