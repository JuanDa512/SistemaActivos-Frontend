import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useActivo } from '../context/ActivoProvider'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { useTipo } from '../context/TipoProvider';


function ActivoForm() {

    const { createActivos, getActivo, updateActivo } = useActivo();
    const { tipos, loadTipos } = useTipo();
    const params = useParams();
    const navigate = useNavigate();

    const [ activo, setActivo ] = useState({
        nombre_activo: "",
        descripcion:"",
        id_tipo_activo: 0,
        valor_compra: 0,
    })


    useEffect(() => {
        const loadActivo = async () => {
            if (params.id) {
                const activo = await getActivo(params.id);
                setActivo({
                    nombre_activo: activo.nombre_activo,
                    descripcion: activo.descripcion,
                    id_tipo_activo: activo.id_tipo_activo,
                    valor_compra: activo.valor_compra,
                })
            }
        }
        loadActivo();
        loadTipos()
    })


  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={activo}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                if (params.id) {
                    await updateActivo(params.id, values)
                    navigate("/editactivos");
                } else {
                    await createActivos(values)
                    navigate("/menuactivos");
                }
                
                setActivo({
                    nombre_activo: "",
                    descripcion:"",
                    id_tipo_activo: 0,
                    valor_compra: 0,
                });
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-32s">
                    <h1 className='text-xl font-bold uppercase text-center'>{params.id ? "Editar Activo" : "Registrar Activo"}</h1>
                    <label className='block'>Nombre del Activo</label>
                    <input 
                        type='text' 
                        name="nombre_activo" 
                        placeholder='Nombre del Activo'
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange}
                        value={values.nombre_activo}
                    ></input>

                    <label className='block'>Descripcion del activo</label>
                    <textarea 
                        name='descripcion' 
                        rows="3" 
                        placeholder='Descripcion del Activo'
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange}
                        value={values.descripcion}
                    ></textarea>

                    <label className='block'>Tipo de Activo</label>
                    <select
                        name="id_tipo_activo" 
                        placeholder='Tipo de Activo' 
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange} 
                        value={values.id_tipo_activo}>
                            {tipos.map(e => (
                                <option key={e.id} value={e.id}>{e.tipo}</option>
                            ))}
                    </select>

                    <label className='block'>Valor del Activo (Bs)</label>
                    <input 
                        type='number' 
                        name="valor_compra" 
                        placeholder='Valor del Activo' 
                        className="px-2 py-1 rounded-sm w-full"
                        step="any"
                        onChange={handleChange}
                        value={values.valor_compra}
                    ></input>
                    <button type='submit' disabled={isSubmitting} className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-2'>
                        {isSubmitting ? "Guardando" : "Guardar"}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default ActivoForm