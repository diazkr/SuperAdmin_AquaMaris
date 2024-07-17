"use client";
import React, { useState, useEffect } from "react";
import generarTodosLosPromoCode, { PromoCodeInterface } from "@/callBack/promociones/GetAllPromos";
import getPromoByCode from "@/callBack/promociones/GetPromoByCode";
import CreateCodePromo from "../PromocionesComponentes/CrateCodePromo";
import ListaCodigosPromo from "../PromocionesComponentes/LIstaCodigosPromo";

function GeneralPagePromo() {
  const [rangoMeses, setRangoMeses] = useState<number>(6);
  const [codePromo, setCodePromo] = useState<PromoCodeInterface[]>([]);
  const [codeByName, setCodeByName] = useState<PromoCodeInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCode = async () => {
      const codeData = await generarTodosLosPromoCode();
      if (codeData) {
        setCodePromo(codeData);
      }
      setLoading(false);
    };

    fetchCode();
  }, []);

  const addNewPromoCode = (newCode: PromoCodeInterface) => {
    setCodePromo((prevCodes) => [newCode, ...prevCodes]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    if (search) {
      const codeData = await getPromoByCode(search);
      setCodeByName(codeData);
      setCodePromo([]); // Clear the list to show only the searched code
    } else {
      const codeData = await generarTodosLosPromoCode();
      if (codeData) {
        setCodePromo(codeData);
        setCodeByName(null);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-around h-full gap-4">
      <div className="bg-light-white flex flex-col h-full shadow-eco rounded-md p-6">
        <CreateCodePromo addNewPromoCode={addNewPromoCode} />
      </div>
      <div className="h-full">
        <ListaCodigosPromo
          codePromo={codePromo}
          loading={loading}
          search={search}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          codeByName={codeByName}
        />
      </div>
    </div>
  );
}

export default GeneralPagePromo;
