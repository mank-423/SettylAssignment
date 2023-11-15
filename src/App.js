import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import AddItem from './Pages/AddItem'
import Navbar from './Component/Navbar'

export default function App() {
  
  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/addItem' element={<AddItem />}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
