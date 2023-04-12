import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ActivoPage from './pages/ActivoPage'
import ActivoForm from './pages/ActivoForm'
import { ActivoContextProvider } from './context/ActivoProvider'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import BusquedaPage from './pages/BusquedaPage'
import ActivosMenu from './pages/ActivosMenu'
import MonitoreoPage from './pages/MonitoreoPage'

function App() {
  return (
    <div className="bg-gray-400 h-screen">
        <div className='container mx-auto py-4'>
          <ActivoContextProvider>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/home" element={<HomePage/>} />
              <Route path="/menuactivos" element={<ActivosMenu/>} />
              <Route path="/menumonitoreo" element={<MonitoreoPage/>} />
              <Route path="/activos" element={<ActivoPage/>} />
              <Route path="/newActivo" element={<ActivoForm/>} />
              <Route path="/edit/:id" element={<ActivoForm/>} />
              <Route path="/busqueda" element={<BusquedaPage/>} />
            </Routes>    
          </ActivoContextProvider>
        </div>
    </div>
  )
}

export default App