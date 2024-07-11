"use client";
import React, { useState } from "react";
import IngresosTotalesBarra from "../costos/IngresosTotales";
import SelectGeneral from "./SelectGeneral";
import IngresosTotalesPorTipo from "../costos/IngresosPorTipo";
import IngresosMesTipo from "../costos/IngresoTipoMes";

function CostosPage() {
  const [rangoMeses, setRangoMeses] = useState<number>(6);
  return (
    <div className=" flex flex-col justify-around h-full">
      <div>
        <SelectGeneral setRangoMeses={setRangoMeses} />
      </div>
      <div className="flex gap-6 h-[40vh]  ">
        <div className="w-1/2 bg-light-white  flex flex-col h-full shadow-eco rounded-md p-6">
          <IngresosTotalesBarra rangoMeses={rangoMeses} />
        </div>
        <div className="w-1/2 bg-light-white  flex flex-col h-full shadow-eco rounded-md p-6">
          <IngresosTotalesPorTipo
            rangoMeses={rangoMeses}
          ></IngresosTotalesPorTipo>
        </div>
      </div>
      <div className="bg-light-white h-72  flex flex-col shadow-eco rounded-md p-6 mt-6 ">
        <IngresosMesTipo rangoMeses={rangoMeses}></IngresosMesTipo>
      </div>
    </div>
  );
}

export default CostosPage;
