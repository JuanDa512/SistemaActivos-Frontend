import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Form, Formik } from 'formik';
import { useActivo } from '../context/ActivoProvider';
import { useArea } from '../context/AreaProvider'

function AsignarRfidForm() {

    const { getActivo, updateActivo } = useActivo();
    const { areas, loadAreas } = useArea();

    const params = useParams();
    const navigate = useNavigate();

    const [ activo, setActivo ] = useState({
        id: 0,
        id_rfid: "",
        id_area: 0,
        nombre_activo: "",
        descripcion:"",
        valor_compra: 0,
    })

    useEffect(() => {
        const loadActivo = async () => {
            const activo = await getActivo(params.id);
            setActivo({
                id: activo.id,
                id_rfid: activo.id_rfid,
                id_area: activo.id_area,
                nombre_activo: activo.nombre_activo,
                descripcion: activo.descripcion,
                valor_compra: activo.valor_compra,
            })
        }
        loadActivo();
        loadAreas();
    })
  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={activo}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                console.log(values)
                await updateActivo(params.id, values)
                navigate("/asignacionRFID");
                setActivo({
                    id: 0,
                    id_rfid: "",
                    id_area: 0,
                    nombre_activo: "",
                    descripcion:"",
                    valor_compra: 0,
                });
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 w-max rounded-md p-4 mx-auto mt-52">
                    <h1 className='text-xl font-bold uppercase text-center mb-5'>Asignacion de Area y Codigo RFID</h1>
                    <div className='bg-white w-max'>
                        <h1 className='text-xl font-bold uppercase text-left'>Detalle del Activo</h1>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-500">
                                <tr>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Descripcion</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Valor de la Compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border border-gray-500" key={values.id}>
                                    <td className="p-3 text-sm text-gray-700">{values.id}</td>
                                    <td className="p-3 text-sm text-gray-700">{values.nombre_activo}</td>
                                    <td className="p-3 text-sm text-gray-700">{values.descripcion}</td>
                                    <td className="p-3 text-sm text-gray-700">{values.valor_compra}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='grid grid-cols-2 gap-2 grid-rows-2 mt-10'>
                        <label className='p-1'>Seleccione el Area a Asignar:</label>
                        <label className='p-1'>Ingrese el Codigo RFID:</label>
                        <select
                            name="id_area" 
                            placeholder='Seleccione el Area' 
                            className="px-2 py-1 rounded-sm w-full"
                            onChange={handleChange} 
                            value={values.id_area}>
                                {areas.map(e => (
                                    <option key={e.id} value={e.id}>{e.name_area}</option>
                                ))}
                        </select>
                        <input 
                            type='text' 
                            name="id_rfid" 
                            placeholder='Nombre del Activo'
                            className="px-2 py-1 rounded-sm w-full"
                            onChange={handleChange}
                            value={values.id_rfid}
                        ></input>
                    </div>
                        
                    <button type='submit' disabled={isSubmitting} className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-3'>
                        {isSubmitting ? "Asignando" : "Asignar"}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default AsignarRfidForm