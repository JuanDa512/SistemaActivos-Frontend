import { useContext, useState } from 'react'
import { UserContext } from './UserContext';
import { getUserRequest, updateUserRequest } from '../api/activo.api';

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider")        
    } else {
        return context; 
    }
}

export const UserContextProvider = ({ children }) => {
    
    const [ users, setUsers ] = useState([]);

    const loadUsers = async () => {
        const response = await getUserRequest()
        setUsers(response.data);
    }

    const getUser = async (id) => {
        try {
            const response = await getUserRequest(id);
            return response.data;
        } catch (error) {
            console.error(error)            
        }
    }

    const updateUser = async (id, newData) => {
        try {
            const response = await updateUserRequest(id, newData);
            return response.data;
        } catch (error) {
            console.error(error)            
        }
    }

    return <UserContext.Provider value={{
        users,
        loadUsers,
        getUser,
        updateUser
    }}>
        { children }
    </UserContext.Provider>
}

