import React from "react";
import { Route, Routes } from "react-router-dom";
import ActivoForm from "./pages/ActivoForm";
import { ActivoContextProvider } from "./context/ActivoProvider";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import BusquedaPage from "./pages/BusquedaPage";
import ActivosMenu from "./pages/ActivosMenu";
import MonitoreoPage from "./pages/MonitoreoPage";
import { TipoContextProvider } from "./context/TipoProvider";
import AsignarRfid from "./pages/AsignarRfid";
import AsignarRfidForm from "./pages/AsignarRfidForm";
import { AreaContextProvider } from "./context/AreaProvider";
import AsignarPersonal from "./pages/AsignarPersonal";
import AsignarPersonalForm from "./pages/AsignarPersonalForm";
import { PersonalContextProvider } from "./context/PersonalProvider";

function App() {
  return (
    <div className="bg-gray-400 h-screen">
      <div className="container mx-auto py-4">
        <ActivoContextProvider>
          <TipoContextProvider>
            <AreaContextProvider>
              <PersonalContextProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/menuactivos" element={<ActivosMenu />} />
                  <Route path="/menumonitoreo" element={<MonitoreoPage />} />
                  <Route path="/asignacionRFID" element={<AsignarRfid />} />
                  <Route path="/asignacionPersonal" element={<AsignarPersonal />} />
                  <Route path="/newActivo" element={<ActivoForm />} />
                  <Route path="/edit/:id" element={<ActivoForm />} />
                  <Route path="/asignarRFID/:id" element={<AsignarRfidForm />} />
                  <Route path="/asignarPersonal/:id" element={<AsignarPersonalForm />} />
                  <Route path="/busqueda" element={<BusquedaPage />} />
                </Routes>
              </PersonalContextProvider>
            </AreaContextProvider>
          </TipoContextProvider>
        </ActivoContextProvider>
      </div>
    </div>
  );
}

export default App;
