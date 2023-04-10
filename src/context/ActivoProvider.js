import { useContext, useState } from 'react'
import { changeEstadoActivo, getActivoRequest, getActivosRequest, updateActivoRequest } from '../api/activo.api'
import { deleteActivoRequest } from '../api/activo.api'
import { createActivoRequest } from '../api/activo.api'
import { ActivoContext } from './ActivoContext'



export const useActivo = () => {
    const context = useContext(ActivoContext);
    if (!context) {
        throw new Error("useActivos must be used within a ActivoContextProvider")        
    } else {
        return context; 
    }
}

export const ActivoContextProvider = ({ children }) => {

    const [ activos, setActivos ] = useState([])

    async function loadActivos() {
        const response = await getActivosRequest()
        setActivos(response.data);
    }

    const deleteActivos = async (id) => {
        try {
            const response = await deleteActivoRequest(id);
            setActivos(activos.filter(activos => activos.id !== id));
            console.log(response)
        } catch (error) {
            console.error(error)            
        }
    }

    const createActivos = async (activo) => {
        try {
            const response = await createActivoRequest(activo);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const getActivo = async (id) => {
        try {
            const response = await getActivoRequest(id);
            return response.data;
        } catch (error) {
            console.error(error)            
        }
    }

    const updateActivo = async (id, newData) => {
        try {
            const response = await updateActivoRequest(id, newData);
            return response.data;
        } catch (error) {
            console.error(error)            
        }
    }

    const updateEstadoActivo = async (id) => {
        try {
            const activoFound = activos.find((activo) => activo.id === id);
            await changeEstadoActivo(id, activoFound.estado === 0 ? true : false);
            setActivos(
                activos.map((activo) => activo.id === id ? {
                    ...activo, estado: !activo.estado } : activo )
            )
        } catch (error) {
            console.error(error)            
        }
    }

    

    return <ActivoContext.Provider value={{ 
        activos, 
        loadActivos, 
        deleteActivos,
        createActivos, 
        getActivo,
        updateActivo,
        updateEstadoActivo
        }}>
        { children }
    </ActivoContext.Provider>
}