"use client";

import generarTodosLosPromoCode, { PromoCodeInterface } from "@/callBack/promociones/GetAllPromos";
import getPromoByCode from "@/callBack/promociones/GetPromoByCode";
import ErrorMessage from "@/components/Habitaciones/EditHabitacion/ErrorMessage";
import { List } from "@mantine/core";
import { Button, ListItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import CardCode from "./CardCode";

const ListaCodigosPromo: React.FC = () => {
  const [codePromo, setCodePromo] = useState<PromoCodeInterface[]>([]);
  const [codeByName, setCodeByName] = useState<PromoCodeInterface | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
    <div className="flex flex-col h-full w-full">
      <div className="bg-light-white flex shadow-eco rounded-md p-6 w-[100%] gap-4">
        <TextField
          label="Buscar código de descuento"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-full"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          endIcon={<BsSearch />}
          className="px-12"
        >
          Buscar
        </Button>
      </div>

      {loading ? (
        <Typography>Cargando códigos de descuento...</Typography>
      ) : (
        <>
          {codeByName ? (
            <div className="my-5">
              <List className="bg-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-3">
              <ListItem>
                <CardCode code={codeByName} />
              </ListItem>
            </List>

            </div>
            
          ) : codePromo.length === 0 ? (
            <ErrorMessage />
          ) : (
            <div className="my-5">
            <List className="bg-white flex flex-col shadow-eco rounded-md w-[100%] h-[30vh] xl:h-[50vh] overflow-y-auto">


              {codePromo.map((code) => (
                <ListItem key={code.id}>
                  <CardCode code={code} />
                </ListItem>
              ))}
            </List>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListaCodigosPromo;
