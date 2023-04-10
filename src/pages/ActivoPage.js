import React from 'react'
import { useEffect } from 'react'
import ActivoCard from '../components/ActivoCard'
import { useActivo } from '../context/ActivoProvider'

function ActivoPage() {
    
    const { activos, loadActivos } = useActivo(); 

    useEffect(() => {
        loadActivos(); 
    });
    
    function renderMain() {
        if (activos.length === 0) {
            return <h1> No hay activos registrados</h1>            
        } else {
            return activos.map((activo) => <ActivoCard activo={activo} key={activo.id} />)
        }
    }
    
  return (
    <div>
        <h1>Activos</h1>
            {renderMain()}    
    </div>
  )
}

export default ActivoPage