/*import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-zinc-700 flex justify-between px-10 py-4">
        <Link to="/activos" className='text-white font-bold'>
          <h1 className=''>Sistema de Activos Fijos</h1>
        </Link>
        <ul className="flex gap-x-3">
            <li>
                <Link to="/activos" className='bg-sky-800 px-2 py-1 text-white'>Home</Link>  
            </li>
            <li>
                <Link to="/new" className="bg-sky-800 px-2 py-1 text-white">Registrar Activo</Link>
            </li>
        </ul>   
    </div>
  )
}

export default Navbar*/

import React, { useState } from 'react'
import Button from './Button';

const Navbar = () => {
    let Links =[
      {name:"HOME",link:"/home"},
      {name:"ACTIVOS",link:"/new"},
      {name:"ABOUT",link:"/"},
      {name:"BLOG'S",link:"/"},
      {name:"CONTACT",link:"/"},
    ];
    let [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
        SISTEMA DE ACTIVOS
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
        <Button>
          Get Started
        </Button>
      </ul>
      </div>
    </div>
  )
}

export default Navbar