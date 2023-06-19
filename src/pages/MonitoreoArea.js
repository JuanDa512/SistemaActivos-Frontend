import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import Navbar from '../components/Navbar'
import { useArea } from '../context/AreaProvider'
import { useEffect } from 'react';
import { getMonitoreoArea } from '../api/activo.api';
import { useNavigate } from 'react-router-dom';

function MonitoreoArea() {

    const { areas, loadAreas } = useArea();
    const navigate = useNavigate();
    const [ lectura,  ] = useState({
        id_area: 0,
        time: 30
    })

    useEffect(() => {
        loadAreas()
    })

  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={lectura}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                const result = await getMonitoreoArea(values)
                const datos = result.data
                navigate(`/lecturaMonitoreo/${datos.id_monitoreo}/${datos.id_area_lectura}`)                          
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-52">
                    <h1 className='text-xl font-bold uppercase text-center'>Monitoreo de Activos por Area</h1>
                    
                    <label className='block'>Seleccione el Area de Lectura</label>
                    <select
                        name="id_area" 
                        placeholder='Area de Lectura' 
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange} 
                        value={values.id_area}>
                            {areas.map(e => (
                                <option key={e.id} value={e.id}>{e.name_area}</option>
                            ))}
                    </select>

                    <button type='submit' disabled={isSubmitting} className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-2'>
                        {isSubmitting ? "Lectura en Proceso" : "Comenzar Monitoreo"}
                    </button>
                    
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default MonitoreoArea