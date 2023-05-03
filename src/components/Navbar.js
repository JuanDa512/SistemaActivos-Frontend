import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserProvider';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const {getUser} = useUser();
  const [user, setUser ] = useState({
    id: 0,
    username:"",
    password: "",
  });
  const id = localStorage.getItem('user')
  
  useEffect(() => {
    const loadUser = async () => {
      const usuario = await getUser(id);
      setUser({
          id: usuario.id,
          username: usuario.username,
          password: usuario.password,
      })
    }
    loadUser();
  })

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800'>
          SISTEMA DE ACTIVOS
        </div>

        <ul className={'md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in'}>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <a href={"/menuactivos"} className='text-gray-800 hover:text-gray-400 duration-500'>ACTIVOS</a>
          </li>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <a href={"/menumonitoreo"} className='text-gray-800 hover:text-gray-400 duration-500'>MONITOREO</a>
          </li>
          <div className='relative flex flex-col items-center w-full h-full rounded pl-10'>
            <button className='bg-blue-700 text-white p-2 w-32 flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'
              onClick={() => setIsOpen((prev) => !prev)}>
              {user.username}
            </button>
            {isOpen && (
              <div className='bg-blue-600 absolute top-14 flex-col items-start rounded-lg p-2 w-32 text-white'>
                <ul>
                  <li className='hover:bg-blue-400'>
                    <a href={`/editUsuario/${user.id}`}>Editar Perfil</a>
                  </li>
                  <li className='hover:bg-blue-400'>
                    <a href={"/"}>Cerrar Sesion</a>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </ul>
      </div>
    </div>
  )
}

export default Navbar