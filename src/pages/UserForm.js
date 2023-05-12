import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserProvider';


function UserForm() {

    const { getUser, updateUser } = useUser();
    const params = useParams();
    const navigate = useNavigate();

    const [user, setUser ] = useState({
        username:"",
        password: "",
      });

    useEffect(() => {
        const loadUser = async () => {
          const usuario = await getUser(params.id);
          setUser({
              id: usuario.id,
              username: usuario.username,
              password: usuario.password,
          })
        }
        loadUser();
      })


  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={user}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                await updateUser(params.id, values)
                    navigate("/");
                    setUser({
                    nusername:"",
                    password: "",
                });
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-24">
                    <h1 className='text-xl font-bold uppercase text-center'>Editar Datos de Usuario</h1>
                    <label className='block'>Nombre de Usuario</label>
                    <input 
                        type='text' 
                        name="username" 
                        placeholder='Nombre de Usuario'
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange}
                        value={values.username}
                    ></input>

                    <label className='block'>Contraseña</label>
                    <input 
                        type='password' 
                        name="password" 
                        placeholder='Contraseña del Usuario' 
                        className="px-2 py-1 rounded-sm w-full"
                        step="any"
                        onChange={handleChange}
                        value={values.password}
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

export default UserForm