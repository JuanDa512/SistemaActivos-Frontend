import { useContext, useState } from 'react'
import { AreaContext } from './AreaContext';
import { getAreaRequest, getAreasRequest } from '../api/activo.api';

export const useArea = () => {
    const context = useContext(AreaContext);
    if (!context) {
        throw new Error("useTipo must be used within a TipoContextProvider")        
    } else {
        return context; 
    }
}

export const AreaContextProvider = ({ children }) => {
    
    const [ areas, setAreas ] = useState([]);

    const loadAreas = async () => {
        const response = await getAreasRequest()
        setAreas(response.data);
    }
    const getArea = async (id) => {
        try {
            const response = await getAreaRequest(id);
            return response.data;
        } catch (error) {
            console.error(error)            
        }
    }

    return <AreaContext.Provider value={{
        areas,
        loadAreas,
        getArea
    }}>
        { children }
    </AreaContext.Provider>
}

