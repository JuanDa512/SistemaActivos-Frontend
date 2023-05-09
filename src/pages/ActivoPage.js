/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { changeEstadoActivo, getActivosRequest } from "../api/activo.api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function ActivoPage() {
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

  const handleDone = async (id) => {
    const activoFound = usuarios.find((activo) => activo.id === id);
        await changeEstadoActivo(id, activoFound.estado === 0 ? true : false);
        setUsuarios(
            usuarios.map((activo) => activo.id === id ? {
                ...activo, estado: !activo.estado } : activo )
        )
    }

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
        <div className="bg-slate-300 max-w-full rounded-md p-4 mx-auto mt-24">
          <div className="mb-10" >
            <label className="text-xl mb-2 float-left">Lista de Activos para Edicion</label>
            <input
              className="w-2/5 float-right"
              value={busqueda}
              placeholder="Búsqueda por Activo o Tipo"
              onChange={handleChange}
            />
          </div>

          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-500">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Estado</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Descripcion</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Tipo de Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Valor (Bs)</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios &&
                  usuarios.map((usuario) => (
                    <tr className="bg-white border border-gray-500" key={usuario.id}>
                      <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.estado >= 1 ? "activo" : "baja"}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.descripcion}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.tipo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.valor_compra}</td>
                      <td className="grid gap-0"><button
                        className="bg-yellow-200 px-2 text-black"
                        onClick={() => navigate(`/edit/${usuario.id}`) }>Editar Activo
                        </button>
                        <button 
                            className="bg-slate-300 px-2 text-black" 
                            onClick={() => handleDone(usuario.id)}>Baja Activo
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

export default ActivoPage;