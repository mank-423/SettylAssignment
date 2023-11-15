import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import AddItem from './Pages/AddItem'

export default function App() {
  
  return (
    <div>

      <BrowserRouter>
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
