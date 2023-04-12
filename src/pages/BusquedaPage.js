import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { getActivosRequest } from "../api/activo.api";
import Navbar from '../components/Navbar'

function BusquedaPage() {

    const [activos, setActivos] = useState([])

    const getData = async () => {
        const data = await getActivosRequest()
        setActivos(data.data);
    }

    useEffect( ()=>{
        getData()
    }, [])

    const columns = [
        {
            name: "id",
            label: "ID"
        },
        {
            name: "nombre",
            label: "NOMBRE"
        },
        {
            name: "descripcion",
            label: "DESCRIPCION"
        },
        {
            name: "tipo",
            label: "TIPO"
        },
        {
            name: "valor_compra",
            label: "VALOR (Bs)"
        },
        {
            name: "fecha_compra",
            label: "FECHA COMPRA"
        },
        {
            name: "estado",
            label: "ESTADO"
        },
        {
            name: "responsable",
            label: "RESPONSABLE"
        }
    ]
    return (
        <div>
            <Navbar/>
            <MUIDataTable 
                title={"Lista de Activos Fijos"}
                data={activos}
                columns={columns}
                className="bg-slate-300 rounded-md p-4 mx-auto mt-40"
                />
        </div>        
    )
}
export default BusquedaPage