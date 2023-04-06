import React from 'react'
import { Form, Formik } from 'formik'
import { createActivoRequest } from '../api/activo.api'

function ActivoForm() {
  return (
    <div>
        <Formik
            initialValues={{
                nombre: "",
                descripcion:"",
                tipo: "",
                valor_compra: 0,
                responsable: ""
            }}
            onSubmit={ async (values, actions) => {
                console.log(values)
                try {
                    const response = await createActivoRequest(values);
                    console.log(response);
                    actions.resetForm()
                } catch (error) {
                    console.log(error)
                }
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