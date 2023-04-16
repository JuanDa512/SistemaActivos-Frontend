import { useContext, useState } from 'react'
import { TipoContext } from './TipoContext';
import { getTipoRequest } from '../api/activo.api';

export const useTipo = () => {
    const context = useContext(TipoContext);
    if (!context) {
        throw new Error("useTipo must be used within a TipoContextProvider")        
    } else {
        return context; 
    }
}

export const TipoContextProvider = ({ children }) => {
    
    const [ tipos, setTipos ] = useState([]);

    const loadTipos = async () => {
        const response = await getTipoRequest()
        setTipos(response.data);
    }

    return <TipoContext.Provider value={{
        tipos,
        loadTipos,
    }}>
        { children }
    </TipoContext.Provider>
}

