import React from 'react'
import Navbar from '../components/Navbar'

function ActivosMenu() {
  return (
    <div>
        <Navbar/>
        <div className='grid gap-4 grid-cols-2 grid-rows-3 bg-slate-300 max-w-xl rounded-md p-5 mx-auto mt-32'>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">   
                <a href={"/newActivo"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Registrar Activos
                    </div>
                </a>     
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">   
                <a href={"/asignacionRFID"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Asignar RFID al Activo
                    </div>
                </a>     
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">   
                <a href={"/asignacionPersonal"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Asignar Activos al Personal
                    </div>
                </a>     
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">   
                <a href={"/depreciacionPage"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Calcular Depreciacion
                    </div>
                </a>     
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg hor">   
                <a href={"/busqueda"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Busqueda de Activos
                    </div>
                </a>     
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg hor">   
                <a href={"/editactivos"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Editar Activos
                    </div>
                </a>     
            </div>
        </div>
    </div>
    
  )
}

export default ActivosMenu