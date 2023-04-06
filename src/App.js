import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ActivoPage from './pages/ActivoPage'
import ActivoForm from './pages/ActivoForm'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ActivoPage/>} />
        <Route path="/new" element={<ActivoForm/>} />
      </Routes>    
    </>
  )
}

export default App