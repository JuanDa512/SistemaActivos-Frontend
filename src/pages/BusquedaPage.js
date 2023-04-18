/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { getActivosRequest } from "../api/activo.api";
import Navbar from "../components/Navbar";

function BusquedaPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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
        <div className="bg-slate-300 max-w-full rounded-md p-4 mx-auto mt-32">
          <div className="mb-10" >
            <label className="text-xl mb-2 float-left">Lista de Activos</label>
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
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Activo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Descripcion</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Valor (Bs)</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Fecha de Compra</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Tipo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Persona Asignada</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Cargo</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Area Asignada</th>
                </tr>
              </thead>
              <tbody>
                {usuarios &&
                  usuarios.map((usuario) => (
                    <tr className="bg-white border border-gray-500" key={usuario.id}>
                      <td className="p-3 text-sm text-gray-700">{usuario.id}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre_activo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.descripcion}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.valor_compra}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.fecha_compra}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.tipo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.nombre} {usuario.apellido}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.cargo}</td>
                      <td className="p-3 text-sm text-gray-700">{usuario.name_area}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}

export default BusquedaPage;
