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
    <div>
        <p>{activo.nombre}</p>
        <p>{activo.descripcion}</p>
        <p>{activo.tipo}</p>
        <p>{activo.valor_compra}</p>
        <p>{activo.responsable}</p>
        <span>{activo.estado === 0 ? "✔️" : "❌"}</span>
        <span>{activo.fecha_compra}</span>
        <button onClick={() => navigate(`/edit/${activo.id}`) }>Editar Activo</button>
        <button onClick={() => deleteActivos(activo.id)}>Baja Activo</button>
        <button onClick={() => handleDone(activo.estado)}>Cambio de Estado</button>
    </div>
  )
}

export default ActivoCard