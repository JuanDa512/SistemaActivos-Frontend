import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ActivoPage from './pages/ActivoPage'
import ActivoForm from './pages/ActivoForm'
import Navbar from './components/Navbar'
import { ActivoContextProvider } from './context/ActivoProvider'

function App() {
  return (
    <ActivoContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ActivoPage/>} />
        <Route path="/new" element={<ActivoForm/>} />
        <Route path="/edit/:id" element={<ActivoForm/>} />
      </Routes>    
    </ActivoContextProvider>
  )
}

export default App