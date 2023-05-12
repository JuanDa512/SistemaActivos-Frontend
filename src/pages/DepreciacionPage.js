import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useTipo } from '../context/TipoProvider';
import { Form, Formik } from 'formik';
import { getDepreciacionRequest, getTipoRequest } from '../api/activo.api';
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReporteDepreciacion from "../components/ReporteDepreciacion"; 

function DepreciacionPage() {
    const [activos, setActivos] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [tipo, setTipo] = useState([])
    const { tipos, loadTipos } = useTipo({});

    const [ depreciacion ] = useState({
        id_tipo_activo: 0,
        date: ""
    })

    const limpiardatos = () => {
        setActivos([])
        setIsOpen((prev) => !prev)  
    }

    const mostrarDepreciacion = async (datos) => {
        for (let index = 0; index < datos.length; index++) {
            activos.push(datos[index])
        }
        setIsOpen((prev) => !prev)  
    }

    useEffect(() => {
        loadTipos()
    })

  return (
    <div>
        <Navbar/>
        <Formik
            initialValues={depreciacion}
            enableReinitialize={true}
            onSubmit={ async (values, actions) => {
                console.log(values)
                const result = await getDepreciacionRequest(values)
                const datos = result.data
                const tipo = await getTipoRequest(values.id_tipo_activo)
                setTipo(tipo.data) 
                mostrarDepreciacion(datos)    
            }}>
            {({ handleChange, handleSubmit, values, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="bg-slate-300 rounded-md p-4 mx-auto  max-w-xl mt-20">
                    <h1 className='text-xl font-bold uppercase text-center'>Calculo de Depreciacion de los Activos Fijos</h1>
                    <label className='block'>Seleccione el Tipo de Activo</label>
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
                    <label className='block'>Ingrese hasta que mes quiere realizar la depreciacion</label>
                    <input 
                        type='month' 
                        name="date" 
                        placeholder='Fecha de Depreciacion'
                        min="2023-05"
                        className="px-2 py-1 rounded-sm w-full"
                        onChange={handleChange}
                        value={values.date}
                    ></input>
                    <button type='submit' disabled={isSubmitting} className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-2'>
                        {isSubmitting ? "Calculando Depreciacion" : "Calcular Depreciacion"}
                    </button>    
                </Form>
            )}
        </Formik>
        <div className="bg-slate-300 max-w-xl rounded-md p-4 mx-auto -m-9">
            <button className=' bg-indigo-500 px-2 py-1 text-white w-full rounded-md my-2'
                onClick={() => {limpiardatos()}}>
                Limpiar Monitoreo
            </button>
            <PDFDownloadLink
                document={<ReporteDepreciacion activos={activos} tipo={tipo} />}
                fileName="ReporteDepreciacion.pdf">
                    <div className="bg-indigo-500 px-2 py-1 text-white w-full rounded-md text-center">
                    <label className='text-white'> Generar Reporte </label>
                    </div>
            </PDFDownloadLink>
            
        </div> 
        {isOpen && (
            <div className="bg-slate-300  max-w-full rounded-md p-4 mx-auto mt-12">
                <label className="text-xl mb-2 font-bold">Depreciacion de los activos</label>
                <label className='block'>Años de vida: {tipo.anosdevida} años</label>
                <label className='block'>Porcentaje de Depreciacion: {tipo.depreciacion} %</label>
                <div className="mt-1">
                    <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-500">
                        <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">ID</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Activo</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Fecha Compra</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Valor de Compra</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Valor Neto</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Depreciacion Mensual</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Depreciacion Acumulada</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Valor Residual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activos.map((usuario) => (
                            <tr className="bg-white border border-gray-500" key={usuario.id_activo}>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.id_activo}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.nombre_activo}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.fecha_compra}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.valor_compra}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.valor_neto}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.depre_mes}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.depre_acumulada}</td>
                            <td className="p-3 text-sm text-gray-700 text-center">{usuario.valor_residual}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                
            </div>  
        )}
        
    </div>
  )
}

export default DepreciacionPage