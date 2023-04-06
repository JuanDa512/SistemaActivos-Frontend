import axios from "axios";

export const getActivosRequest = async () => 
    await axios.get('http://localhost:4000/activos');

export const createActivoRequest = async (activo) => 
    await axios.post('http://localhost:4000/activos', activo);

    export const deleteActivoRequest = async (id) => 
    await axios.delete(`http://localhost:4000/activos/${id}`);