import { useContext, useState } from 'react'
import { PersonalContext } from './PersonalContext';
import { getPersonalRequest } from '../api/activo.api';

export const usePersonal = () => {
    const context = useContext(PersonalContext);
    if (!context) {
        throw new Error("useTipo must be used within a TipoContextProvider")        
    } else {
        return context; 
    }
}

export const PersonalContextProvider = ({ children }) => {
    
    const [ personal, setPersonal ] = useState([]);

    const loadPersonal = async () => {
        const response = await getPersonalRequest()
        setPersonal(response.data);
    }

    return <PersonalContext.Provider value={{
        personal,
        loadPersonal,
    }}>
        { children }
    </PersonalContext.Provider>
}

