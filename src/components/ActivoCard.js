import React from 'react'
import { deleteActivoRequest } from '../api/activo.api'

function ActivoCard({ activo }) {

    const handleDelete = async (id) => {
        try {
            const response = await deleteActivoRequest(id);
            console.log(response)
        } catch (error) {
            console.error(error)            
        }
    }

  return (
    <div>
        <p>{activo.nombre}</p>
        <p>{activo.descripcion}</p>
        <p>{activo.tipo}</p>
        <p>{activo.valor_compra}</p>
        <p>{activo.responsable}</p>
        <span>{activo.estado === 0 ? "✔️" : "❌"}</span>
        <span>{activo.fecha_compra}</span>
        <button>Editar Activo</button>
        <button onClick={() => handleDelete(activo.id)}>Baja Activo</button>
    </div>
  )
}

export default ActivoCard