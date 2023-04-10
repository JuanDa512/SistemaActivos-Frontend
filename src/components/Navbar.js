import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-zinc-700 flex justify-between px-10 py-4">
        <Link to="/" className='text-white font-bold'>
          <h1 className=''>Sistema de Activos Fijos</h1>
        </Link>
        <ul className="flex gap-x-3">
            <li>
                <Link to="/" className='bg-sky-800 px-2 py-1 text-white'>Home</Link>  
            </li>
            <li>
                <Link to="/new" className="bg-sky-800 px-2 py-1 text-white">Registrar Activo</Link>
            </li>
        </ul>   
    </div>
  )
}

export default Navbar