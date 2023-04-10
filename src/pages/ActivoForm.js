import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useActivo } from '../context/ActivoProvider'
import { useNavigate, useParams } from 'react-router-dom';


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

        <h1>{params.id ? "Editar Activo" : "Registrar Activo"}</h1>

        <Formik
            initialValues={activo}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                console.log(values)
                if (params.id) {
                    await updateActivo(params.id, values)
                    navigate("/");
                } else {
                    await createActivos(values)
                }
                setActivo({
                    nombre: "",
                    descripcion:"",
                    tipo: "",
                    valor_compra: 0,
                    responsable: ""
                });
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit}>
                    <label>Nombre del Activo</label>
                    <input 
                        type='text' 
                        name="nombre" 
                        placeholder='Nombre del Activo'
                        onChange={handleChange}
                        value={values.nombre}
                    ></input>

                    <label>Descripcion del activo</label>
                    <textarea 
                        name='descripcion' 
                        rows="3" 
                        placeholder='Descripcion del Activo'
                        onChange={handleChange}
                        value={values.descripcion}
                    ></textarea>

                    <label>Tipo de Activo</label>
                    <select type='text'
                        name="tipo" 
                        placeholder='Tipo de Activo' 
                        onChange={handleChange} 
                        value={values.tipo}>
                        <option value="" disabled>seleccione el tipo</option>
                        <option value="hola 1">Hola 1</option>
                        <option value="hola 2">Hola 2</option>
                        <option value="hola 3">Hola 3</option>
                    </select>

                    <label>Valor del Activo (Bs)</label>
                    <input 
                        type='number' 
                        name="valor_compra" 
                        placeholder='Valor del Activo' 
                        step="any"
                        onChange={handleChange}
                        value={values.valor_compra}
                    ></input>

                    <label>Responsable del Activo</label>
                    <input 
                        type='text' 
                        name="responsable" 
                        placeholder='Responsable del Activo'
                        onChange={handleChange}
                        value={values.responsable}
                    ></input>

                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? "Guardando" : "Guardar"}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default ActivoForm