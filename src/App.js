import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import React, {  createContext } from 'react'
// const data = createContext()
// const data1 = createContext()
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import AddRecipiForm from './components/AddRecipiForm/AddRecipiForm';
import ResipDetailsPage from './components/ResipDetailsPage/ResipDetailsPage';
function App() {
  return (
    <>
     {/* <AppProvider> */}
     <BrowserRouter>
        <Routes>
      
        <Route path='/' element ={<Login/>}/>
        <Route path='/register' element ={<Register/>}/>
        <Route path='/home' element ={<Home/>}/>
        <Route path='/create' element={<AddRecipiForm/>}/>
        <Route path='/recipi' element={<ResipDetailsPage/>}/>
      
        </Routes>
      </BrowserRouter>
     {/* </AppProvider> */}
      

    </>
  );
}
export default App;
