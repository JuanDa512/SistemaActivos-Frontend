import { useContext, useState } from 'react'
import { AreaContext } from './AreaContext';
import { getAreasRequest } from '../api/activo.api';

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

    return <AreaContext.Provider value={{
        areas,
        loadAreas,
    }}>
        { children }
    </AreaContext.Provider>
}

