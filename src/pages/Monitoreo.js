import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import Navbar from '../components/Navbar'
import { getMonitoreo } from '../api/activo.api';
import { useActivo } from '../context/ActivoProvider';


function Monitoreo() {
    const [activos, setActivos] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const { getActivoRfid } = useActivo();

    const [ lectura,  ] = useState({
        time: 5
    })

    const limpiardatos = () => {
        setActivos([])
        setIsOpen((prev) => !prev)  
    }
    
    const obtenerActivos = async (datos) => {
        for (let index = 0; index < datos.length; index++) {
            const otros = await getActivoRfid(datos[index])
            activos.push(otros)
        }
        setIsOpen((prev) => !prev)  
    }

  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={lectura}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                const result = await getMonitoreo(values)
                const datos = result.data 
                obtenerActivos(datos)      
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-28">
                    <h1 className='text-xl font-bold uppercase text-center'>Monitoreo Completo</h1>
                    <button type='submit' disabled={isSubmitting} className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-2'>
                        {isSubmitting ? "Lectura en Proceso" : "Comenzar Monitoreo"}
                    </button>    
                </Form>
            )}
        </Formik>
        <div className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto -m-8">
            <button className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-2'
                onClick={() => {limpiardatos()}}>
                Limpiar Monitoreo
            </button>
        </div> 
        {isOpen && (
            <div className="bg-slate-300  max-w-full rounded-md p-4 mx-auto mt-20">
                <label className="text-xl mb-2 float-left font-bold">Resultado del Monitoreo</label>
            <div className="mt-4">
                <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-500">
                    <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">ID_RFID</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Persona Asignada</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Cargo</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Area Asignada</th>
                    </tr>
                </thead>
                <tbody>
                    {activos.map((usuario) => (
                        <tr className="bg-white border border-gray-500" key={usuario.id}>
                        <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                        <td className="p-3 text-sm text-gray-700">{usuario.id_rfid}</td>
                        <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                        <td className="p-3 text-sm text-gray-700">{usuario.nombre+" "+usuario.apellido}</td>
                        <td className="p-3 text-sm text-gray-700">{usuario.cargo}</td>
                        <td className="p-3 text-sm text-gray-700">{usuario.name_area}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>  
        )}
        
    </div>
  )
}

export default Monitoreo