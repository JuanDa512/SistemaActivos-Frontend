import React from 'react'
import { useEffect, useState } from 'react'
import { getActivosRequest } from '../api/activo.api'
import ActivoCard from '../components/ActivoCard'

function ActivoPage() {
    
    const [ activos, setActivos ] = useState([])

    useEffect(() => {
        async function loadActivos() {
            const response = await getActivosRequest()
            setActivos(response.data);
        }
        loadActivos() 
    }, [])
    
    function renderMain() {
        return activos.map((activo) => <ActivoCard activo={activo} key={activo.id} />)
    }
    
  return (
    <div>
        <h1>Activos</h1>
            {renderMain()}    
    </div>
  )
}

export default ActivoPage