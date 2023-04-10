import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ActivoPage from './pages/ActivoPage'
import ActivoForm from './pages/ActivoForm'
import { ActivoContextProvider } from './context/ActivoProvider'
import Login from './pages/Login'

function App() {
  return (
    <div className="bg-gray-400 h-screen">
        <div className='container mx-auto py-4'>
          <ActivoContextProvider>
            <Routes>
              <Route path="/" element={<ActivoPage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/new" element={<ActivoForm/>} />
              <Route path="/edit/:id" element={<ActivoForm/>} />
            </Routes>    
          </ActivoContextProvider>
        </div>
    </div>
  )
}

export default App