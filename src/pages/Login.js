import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { login } from '../api/activo.api'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [ usuario, setUsuario ] = useState({
        username: "",
        contrasena: ""
    });

  return (
    <div>
        <Formik 
             initialValues={usuario}
             enableReinitialize={true}
             onSubmit={ async (values, actions) => {
                const response = await login(values.username, values.contrasena);
                const user = response.data
                if (user.length === 0) {
                    console.log("No existe el usuario");
                    setUsuario({
                        username: "",
                        contrasena: "",
                    });
                } else {
                    navigate("/home");
                }
                
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-64">
                    <div>
                        <label className='block'>Usuario</label>
                        <input 
                            type='text'
                            name='username'
                            className="px-2 py-1 my-2 rounded-sm w-full"
                            placeholder='Ingrese Usuario'
                            onChange={handleChange}
                            value={values.username}
                        ></input>
                    </div>
                    <div>
                        <label className="block">Contraseña</label>
                        <input 
                            type='password'
                            name='contrasena'
                            className="px-2 py-1 my-2 rounded-sm w-full"
                            placeholder='Ingrese Contraseña'
                            onChange={handleChange}
                            value={values.contrasena}
                        ></input>
                    </div>
                    <button type='submit' disabled={isSubmitting}  
                        className='bg-blue-500 px-2 py-1 my-2 text-white w w-full rounded-md'>
                            {isSubmitting ? "Iniciando" : "Iniciar"}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default Login