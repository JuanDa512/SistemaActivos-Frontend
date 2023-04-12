import React from 'react'
import Navbar from '../components/Navbar'

function MonitoreoPage() {
  return (
    <div>
        <Navbar/>
        <div className='grid gap-4 grid-rows-2 bg-slate-300 max-w-sm rounded-md p-5 mx-auto mt-72 max-h-max'>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">   
                <a href={"/monitoreoall"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Monitoreo Completo
                    </div>
                </a>     
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">   
                <a href={"/monitoreoarea"} className='text-gray-800 hover:text-gray-400 duration-500'>
                    <div className="px-6 py-4 bg-slate-100" >
                        Monitoreo por Area
                    </div>
                </a>     
            </div>
        </div>
    </div>
  )
}

export default MonitoreoPage