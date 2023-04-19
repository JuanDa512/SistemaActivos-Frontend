/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { getActivosRequest } from "../api/activo.api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AsignarPersonal() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

  const peticionGet = async () => {
    const response = await getActivosRequest();
    setUsuarios(response.data);
    setTablaUsuarios(response.data);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.nombre_activo
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) || 
        elemento.tipo
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div>
      <Navbar/>
        <div className="bg-slate-300 w-max rounded-md p-4 mx-auto mt-32">
          <div className="mb-10" >
            <label className="text-xl mb-2 float-left">Asignacion del activo al personal</label>
            <input
              className="w-2/5 float-right"
              value={busqueda}
              placeholder="Búsqueda por Nombre"
              onChange={handleChange}
            />
          </div>

          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-500">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Descripcion</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Persona Asignada</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody>
                {usuarios &&
                  usuarios.map((usuario) => (
                    <tr className="bg-white border border-gray-500" key={usuario.id}>
                      <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.descripcion}</td>
                      <td className={usuario.nombre ? 'p-3 text-sm text-gray-700' : 'font-bold  p-3 text-sm text-indigo-500'}>{usuario.nombre ? usuario.nombre+" "+usuario.apellido : "Sin Asignar"}</td>
                      <td><button 
                        className="bg-sky-500 p-3 text-sm text-gray-700"
                        onClick={() => navigate(`/asignarPersonal/${usuario.id}`) }>Actualizar
                        </button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}

export default AsignarPersonal;