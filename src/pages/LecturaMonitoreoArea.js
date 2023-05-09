import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useActivo } from '../context/ActivoProvider';
import { useArea } from '../context/AreaProvider';
import { getLecturaMonitoreo } from '../api/activo.api';
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";

function LecturaMonitoreoArea() {
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

  const handleDone = async () => {
    for (let a = 0; a < activos.length; a++) {
      let f = 0;
      let d = 0;
      for (let index = 0; index < lectura.length; index++) {
        if (activos[a].id_rfid !== lectura[index].tags) {
          d++                   
        }
        f++
      }
      if (d === f) {
        estados.push({
          id: activos[a].id,
          id_rfid: activos[a].id_rfid,
          nombre_activo: activos[a].nombre_activo,
          persona_asignada: activos[a].nombre+" "+activos[a].apellido,
          cargo: activos[a].cargo,
          estado: "Este Activo no se encontro"
        })            
      }
      if (d !== f) {
        estadosbien.push({
          id: activos[a].id,
          id_rfid: activos[a].id_rfid,
          nombre_activo: activos[a].nombre_activo,
          persona_asignada: activos[a].nombre+" "+activos[a].apellido,
          cargo: activos[a].cargo,
          estado: "Este Activo se encontro"
        })
      } 
    }
    for (let a = 0; a < lectura.length; a++) {
      let d = 0;
      for (let index = 0; index < activos.length; index++) {
        if (activos[index].id_rfid === lectura[a].tags) {
          d++                
        }  
      }
      if (d === 0) {
        const otros = await getActivoRfid(lectura[a].tags)
        nuevos.push(otros) 
      }
    }
  }   
  
  const generarReporte = () => {
    const styles = ({
      table: { 
        display: "table",
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "23%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        padding: 1
      },
      tableCol2: {
        width: "15%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        padding: 1
      },
      tableCell: { 
        margin: "auto", 
        fontSize: 10,
        padding: 1 
      }
    });
    return (
      <Document>
        <Page
          size="A4"
          style={{
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              paddingTop: 40,
              paddingBottom: 30
            }}
          >
            <Text style={{ color: "#000000", fontSize: "42px" }}>
              Reporte de Monitoreo
            </Text>
            <Text>Identificacion de Monitoreo N° {params.id_monitoreo}</Text>
            <Text>Area de lectura: {area.name_area}  Bloque {area.bloque}  {area.piso}</Text>
          </View>

          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              paddingLeft: 20
              }}>
              <Text style={{fontSize: "16"}}>Activos asignados al Area {area.name_area}</Text>
          </View>
          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
              }}>
            <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id Activo</Text> 
                </View> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id RFID</Text> 
                </View> 
                <View style={{
                  width: "15%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}>
                  <Text style={styles.tableCell}>Nombre de Activo</Text> 
                </View>
                <View style={{
                  width: "15%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Persona Asignada</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Cargo</Text> 
                </View>  
              </View>
              {activos.map((usuario) => (
                <View style={styles.tableRow} key={usuario.id}> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id}</Text> 
                  </View> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id_rfid}</Text> 
                  </View> 
                  <View style={{
                    width: "15%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}>
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.nombre_activo}</Text> 
                  </View>
                  <View style={{
                    width: "15%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.nombre+" "+usuario.apellido}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.cargo}</Text> 
                  </View>  
                </View>
              ))} 
            </View>
          </View>

          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              paddingLeft: 20,
              paddingTop: 20
              }}>
              <Text style={{fontSize: "16"}}>Activos encontrados en la lectura del area {area.name_area}</Text>
          </View>
          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
              }}>
            <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id Activo</Text> 
                </View> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id RFID</Text> 
                </View> 
                <View style={{
                  width: "15%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}>
                  <Text style={styles.tableCell}>Nombre de Activo</Text> 
                </View>
                <View style={{
                  width: "15%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Persona Asignada</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Cargo</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Estado de Lectura</Text> 
                </View> 
              </View>
              {estadosbien.map((usuario) => (
                <View style={styles.tableRow} key={usuario.id}> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id}</Text> 
                  </View> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id_rfid}</Text> 
                  </View> 
                  <View style={{
                    width: "15%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}>
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.nombre_activo}</Text> 
                  </View>
                  <View style={{
                    width: "15%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.persona_asignada}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.cargo}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.estado}</Text> 
                  </View> 
                </View>
              ))} 
            </View>
          </View>

          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              paddingLeft: 20,
              paddingTop: 20
              }}>
              <Text style={{fontSize: "16"}}>Activos no encontrados en el area {area.name_area}</Text>
          </View>
          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
              }}>
            <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id Activo</Text> 
                </View> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id RFID</Text> 
                </View> 
                <View style={{
                  width: "15%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}>
                  <Text style={styles.tableCell}>Nombre de Activo</Text> 
                </View>
                <View style={{
                  width: "15%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Persona Asignada</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Cargo</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Estado de Lectura</Text> 
                </View> 
              </View>
              {estados.map((usuario) => (
                <View style={styles.tableRow} key={usuario.id}> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id}</Text> 
                  </View> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id_rfid}</Text> 
                  </View> 
                  <View style={{
                    width: "15%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}>
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.nombre_activo}</Text> 
                  </View>
                  <View style={{
                    width: "15%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.persona_asignada}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.cargo}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.estado}</Text> 
                  </View> 
                </View>
              ))} 
            </View>
          </View>

          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              paddingLeft: 20,
              paddingTop: 20
              }}>
              <Text style={{fontSize: "16"}}>Activos encontrados pero no pertenecen al area de {area.name_area}</Text>
          </View>
          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              }}>
            <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id Activo</Text> 
                </View> 
                <View style={{
                  width: "8%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Id RFID</Text> 
                </View> 
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>Nombre de Activo</Text> 
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>Area Asignada</Text> 
                </View>
                <View style={styles.tableCol2}> 
                  <Text style={styles.tableCell}>Persona Asignada</Text> 
                </View> 
                <View style={styles.tableCol2}> 
                  <Text style={styles.tableCell}>Cargo</Text> 
                </View> 
                <View style={styles.tableCol2}> 
                  <Text style={styles.tableCell}>Estado de Lectura</Text> 
                </View> 
              </View>
              {nuevos.map((usuario) => (
                <View style={styles.tableRow} key={usuario.id}> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }} > 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id}</Text> 
                  </View> 
                  <View style={{
                    width: "8%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.id_rfid}</Text> 
                  </View> 
                  <View style={styles.tableCol2}>
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.nombre_activo}</Text> 
                  </View>
                  <View style={styles.tableCol2}>
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.name_area}</Text> 
                  </View>
                  <View style={styles.tableCol2}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.nombre+" "+usuario.apellido}</Text> 
                  </View> 
                  <View style={styles.tableCol2}> 
                    <Text style={styles.tableCell} key={usuario.id}>{usuario.cargo}</Text> 
                  </View> 
                  <View style={styles.tableCol2}> 
                    <Text style={styles.tableCell} key={usuario.id}>Activo Encontrado en el Area</Text> 
                  </View> 
                </View>
              ))} 
            </View>
          </View>
          
          
        </Page>
      </Document>
    );
  }     

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
            <button 
                className="bg-blue-600 px-2 py-1 text-white" 
                onClick={() => handleDone()}>Generar Estados
            </button>
            <PDFDownloadLink
              document={generarReporte()}
              fileName="ReporteMonitoreo.pdf">
                <div className="bg-blue-600 mt-4 text-center">
                  <label className='p-2 text-white'> Generar Reporte </label>
                </div>
            </PDFDownloadLink>
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

export default LecturaMonitoreoArea