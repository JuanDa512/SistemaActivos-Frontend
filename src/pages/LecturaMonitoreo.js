import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useActivo } from '../context/ActivoProvider';
import { useArea } from '../context/AreaProvider';
import { getLecturaMonitoreo } from '../api/activo.api';

function LecturaMonitoreo() {
  const params = useParams();
  const { getActivoRfid, getActivosArea } = useActivo();
  const { getArea } = useArea();
  const [activos, setActivos] = useState([]);
  const [lectura, setLectura] = useState([]);
  const [estados] = useState([]);
  const [estadosbien] = useState([]);
  const [nuevos] = useState([]);

  const [area, setArea] = useState({
      name_area: "",
      bloque: "",
      piso: ""
  });

  useEffect(() => {
      const loadDatos = async () => {
          const datos = await getActivosArea(params.id_area);
          const datosarea = await getArea(params.id_area);
          const lectura = await getLecturaMonitoreo(params.id_monitoreo)
          setActivos(datos)
          setLectura(lectura.data)
          setArea({
              name_area: datosarea.name_area,
              bloque: datosarea.bloque,
              piso: datosarea.piso
          })
      }
      loadDatos();
  })
    

  return (
    <div>
      <Navbar/>
        <div className="bg-slate-300  max-w-full rounded-md p-4 mx-auto mt-20">
          <div className="grid grid-rows-2 bg-white rounded-md p-4 mx-auto" >
            <label className="text-xl mb-2 float-left font-bold">Monitoreo Terminado</label>
            <label className="text-xl mb-2 float-left">Area de Lectura: {area.name_area}</label>
          </div>
          
          <div className="mt-4">
            <label className="font-bold">Activos encontrados en el area de {area.name_area}</label>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-500">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID_RFID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Persona Asignada</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Cargo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Estado de Lectura</th>
                </tr>
              </thead>
              <tbody>
                {estadosbien.map((usuario) => (
                    <tr className="bg-white border border-gray-500" key={usuario.id}>
                      <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.id_rfid}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.persona_asignada}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.cargo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.estado}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <label className="font-bold">Activos no encontrados en el area de {area.name_area}</label>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-500">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID_RFID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Persona Asignada</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Cargo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Estado de Lectura</th>
                </tr>
              </thead>
              <tbody>
                {estados.map((usuario) => (
                    <tr className="bg-white border border-gray-500" key={usuario.id}>
                      <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.id_rfid}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.persona_asignada}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.cargo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.estado}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
    
          <div className='mt-4'>
            <label className="font-bold">Activos encontrados en el area de {area.name_area} pero pertenencen a otra Area</label>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-500">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID_RFID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Area Asignada</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Persona Asignada</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Cargo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Estado de Lectura</th>
                </tr>
              </thead>
              <tbody>
                {nuevos.map((usuario) => (
                    <tr className="bg-white border border-gray-500" key={usuario.id}>
                      <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.id_rfid}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.name_area}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre+" "+usuario.apellido}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.cargo}</td>
                      <td className="p-3 text-sm text-gray-700">Activo Encontrado en el Area</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default LecturaMonitoreo