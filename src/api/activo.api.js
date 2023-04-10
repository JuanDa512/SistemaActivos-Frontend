import axios from "axios";

export const getActivosRequest = async () => 
    await axios.get('http://localhost:4000/activos');

export const createActivoRequest = async (activo) => 
    await axios.post('http://localhost:4000/activos', activo);

export const deleteActivoRequest = async (id) => 
    await axios.delete(`http://localhost:4000/activos/${id}`);

export const getActivoRequest = async (id) => 
    await axios.get(`http://localhost:4000/activos/${id}`);

export const updateActivoRequest = async (id, newData) => 
    await axios.put(`http://localhost:4000/activos/${id}`, newData);

export const changeEstadoActivo = async (id, estado) => 
    await axios.put(`http://localhost:4000/activos/${id}`, {
        estado,
    });

export const login = async (username, password) => 
    await axios.post(`http://localhost:4000/login`, {username, password});