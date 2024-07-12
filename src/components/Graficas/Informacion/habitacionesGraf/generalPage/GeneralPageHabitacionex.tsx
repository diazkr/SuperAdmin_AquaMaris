"use client";
import React, { useState } from "react";
import SelectGeneral from "../../costos/generalPage.tsx/SelectGeneral";
import ReservasTipoTotal from "../graficasHabitacion/ReservasTipo";
import ReservasPorcentaje from "../graficasHabitacion/ReservasPorcentaje";
import ReservasTotalMes from "../graficasHabitacion/ReservasTotales";

function GeneralPageHabitacion() {
  const [rangoMeses, setRangoMeses] = useState<number>(6);
  return (
    <div className=" flex flex-col justify-around h-full">
      <div>
        <SelectGeneral setRangoMeses={setRangoMeses} />
      </div>
      <div className="flex gap-6 h-[40vh]  ">
        <div className="w-1/2 bg-light-white  flex flex-col h-full shadow-eco rounded-md p-6">
          <ReservasTipoTotal rangoMeses={rangoMeses} />
        </div>
        <div className="w-1/2 bg-light-white  flex flex-col h-full shadow-eco rounded-md p-6">
          <ReservasPorcentaje
            rangoMeses={rangoMeses}
          />
        </div>
      </div>
      <div className="bg-light-white h-72  flex flex-col shadow-eco rounded-md p-6 mt-6 ">
        <ReservasTotalMes rangoMeses={rangoMeses}/>
      </div>
    </div>
  );
}

export default GeneralPageHabitacion;
