"use client";
import React, { useState } from "react";
import SelectGeneral from "../costos/generalPage.tsx/SelectGeneral";
import UsuariosTotales from "./GraficasUsuario/UsuarioTotal";
import UsuariosReservas from "./GraficasUsuario/UsuariosReservas";
import UsuariosPremiumGrafica from "./GraficasUsuario/UsuariosPremium";

function UsuariosPageInfo() {
  const [rangoMeses, setRangoMeses] = useState<number>(6);
  return (
    <div className=" flex flex-col gap-4">
      <div>
        <SelectGeneral setRangoMeses={setRangoMeses} />
      </div>

      <div className="flex gap-6 h-[40vh]  ">
        <div className="w-[100%] bg-light-white flex flex-col h-full shadow-eco rounded-md p-6">
          <UsuariosTotales rangoMeses={rangoMeses} />
        </div>
      </div>

      <div className="flex gap-6 h-72">
        <div className="bg-light-white flex flex-col h-full shadow-eco rounded-md p-6 w-1/2">
          <UsuariosReservas rangoMeses={rangoMeses} />
        </div>
        <div className="bg-light-white flex flex-col h-full shadow-eco rounded-md p-6 w-1/2">
          <UsuariosPremiumGrafica rangoMeses={rangoMeses} />
        </div>
      </div>
    </div>
  );
}

export default UsuariosPageInfo;
