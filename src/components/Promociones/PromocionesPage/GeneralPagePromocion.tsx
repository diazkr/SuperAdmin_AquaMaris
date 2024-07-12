"use client";
import React, { useState } from "react";
import CrateCodePromo from "../PromocionesComponentes/CrateCodePromo";
import ListaCodigosPromo from "../PromocionesComponentes/LIstaCodigosPromo";

function GeneralPagePromo() {
  const [rangoMeses, setRangoMeses] = useState<number>(6);
  return (
    <div className=" flex flex-col justify-around h-full gap-4">
      
        <div className="bg-light-white  flex flex-col h-full shadow-eco rounded-md p-6">

            <CrateCodePromo></CrateCodePromo>
          
        </div>

        <div className="h-full  ">
            <ListaCodigosPromo/>
        </div>
      
    </div>
  );
}

export default GeneralPagePromo;
