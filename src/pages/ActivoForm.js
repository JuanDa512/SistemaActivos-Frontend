import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useActivo } from '../context/ActivoProvider'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'


function ActivoForm() {

    const { createActivos, getActivo, updateActivo } = useActivo();
    const params = useParams();
    const navigate = useNavigate();

    const [ activo, setActivo ] = useState({
        nombre: "",
        descripcion:"",
        tipo: "",
        valor_compra: 0,
        responsable: ""
    })

    useEffect(() => {
        const loadActivo = async () => {
            if (params.id) {
                const activo = await getActivo(params.id);
                setActivo({
                    nombre: activo.nombre,
                    descripcion: activo.descripcion,
                    tipo: activo.tipo,
                    valor_compra: activo.valor_compra,
                    responsable: activo.responsable,
                })
            }
        }
        loadActivo();

    })

  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={activo}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                console.log(values)
                if (params.id) {
                    await updateActivo(params.id, values)
                } else {
                    await createActivos(values)
                }
                navigate("/activos");
                setActivo({
                    nombre: "",
                    descripcion:"",
                    tipo: "",
                    valor_compra: 0,
                    responsable: ""
                });
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                    <h1 className='text-xl font-bold uppercase text-center'>{params.id ? "Editar Activo" : "Registrar Activo"}</h1>
                    <label className='block'>Nombre del Activo</label>
                    <input 
                        type='text' 
                        name="nombre" 
                        placeholder='Nombre del Activo'
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange}
                        value={values.nombre}
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
                    <select type='text'
                        name="tipo" 
                        placeholder='Tipo de Activo' 
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange} 
                        value={values.tipo}>
                        <option value="" disabled>seleccione el tipo</option>
                        <option value="hola 1">Hola 1</option>
                        <option value="hola 2">Hola 2</option>
                        <option value="hola 3">Hola 3</option>
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

                    <label className='block'>Responsable del Activo</label>
                    <input 
                        type='text' 
                        name="responsable" 
                        placeholder='Responsable del Activo'
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange}
                        value={values.responsable}
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