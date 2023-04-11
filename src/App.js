import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ActivoPage from './pages/ActivoPage'
import ActivoForm from './pages/ActivoForm'
import { ActivoContextProvider } from './context/ActivoProvider'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="bg-gray-400 h-screen">
        <div className='container mx-auto py-4'>
          <ActivoContextProvider>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/activos" element={<ActivoPage/>} />
              <Route path="/home" element={<HomePage/>} />
              <Route path="/new" element={<ActivoForm/>} />
              <Route path="/edit/:id" element={<ActivoForm/>} />
            </Routes>    
          </ActivoContextProvider>
        </div>
    </div>
  )
}

export default App