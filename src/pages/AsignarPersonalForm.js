import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Form, Formik } from 'formik';
import { useActivo } from '../context/ActivoProvider';
import { usePersonal } from '../context/PersonalProvider';

function AsignarPersonalForm() {

    const { getActivo, updateActivo } = useActivo();
    const { personal, loadPersonal } = usePersonal();

    const params = useParams();
    const navigate = useNavigate();

    const [ activo, setActivo ] = useState({
        id: 0,
        id_responsable: 0,
        nombre_activo: "",
        descripcion:"",
        valor_compra: 0,
    })

    useEffect(() => {
        const loadActivo = async () => {
            const activo = await getActivo(params.id);
            setActivo({
                id: activo.id,
                id_responsable: activo.id_responsable,
                nombre_activo: activo.nombre_activo,
                descripcion: activo.descripcion,
                valor_compra: activo.valor_compra,
            })
        }
        loadActivo();
        loadPersonal();
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
                navigate("/asignacionPersonal");
                setActivo({
                    id: 0,
                    id_responsable: 0,
                    nombre_activo: "",
                    descripcion:"",
                    valor_compra: 0,
                });
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 w-max rounded-md p-4 mx-auto mt-28">
                    <h1 className='text-xl font-bold uppercase text-center mb-5'>Asignacion del Activo</h1>
                    <div className='bg-white w-max'>
                        <h1 className='text-xl font-bold uppercase text-left'>Detalle del Activo a Asignar</h1>
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
                        <label className='p-1'>Seleccione a la persona a asignar:</label>
                        <label className='p-1'>Cargo de la Persona:</label>
                        <select
                            name="id_responsable" 
                            placeholder='Seleccione Personal' 
                            className="px-2 py-1 rounded-sm w-full"
                            onChange={handleChange} 
                            value={values.id_responsable}>
                                {personal.map(e => (
                                    <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
                                ))}
                        </select>
                        <select
                            name="id_resposanble" 
                            placeholder='Muestra Cargo' 
                            className="px-2 py-1 rounded-sm w-full"
                            disabled={true}
                            onChange={handleChange} 
                            value={values.id_responsable}>
                                {personal.map(e => (
                                    <option key={e.id} value={e.id}>{e.cargo}</option>
                                ))}
                        </select>
                        
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

export default AsignarPersonalForm