import React from 'react'

import { useActivo } from '../context/ActivoProvider';
import { useNavigate } from 'react-router-dom';

function ActivoCard({ activo }) {

    const { deleteActivos, updateEstadoActivo } = useActivo();
    const navigate = useNavigate();

    const handleDone = async () => {
        await updateEstadoActivo(activo.id)
    }

  return (
    <div className="bg-sky-600 rounded-md p-4">
        <header className='flex justify-between'>
          <h2 className='text-sm font-bold'>{activo.nombre}</h2>
          <span>{activo.estado === 0 ? "✔️" : "❌"}</span>
        </header>
        <header className='text-xs px-2 py-1 bg-slate-50 my-2'>
          <p>{activo.descripcion}</p>
          <p>{activo.tipo}</p>
          <p>{activo.valor_compra}</p>
          <p>{activo.responsable}</p>
          <span>{activo.fecha_compra}</span>
        </header>
        <div className='flex gap-x-1'>
          <button
            className="bg-yellow-200 px-2 py-1 text-black"
            onClick={() => navigate(`/edit/${activo.id}`) }>Editar Activo
          </button>
          <button
            className="bg-red-300 px-2 py-1 text-black"
            onClick={() => deleteActivos(activo.id)}>Baja Activo
          </button>
          <button 
            className="bg-slate-300 px-2 py-1 text-black" 
            onClick={() => handleDone(activo.estado)}>Cambio de Estado
          </button>
        </div>
    </div>
  )
}

export default ActivoCard