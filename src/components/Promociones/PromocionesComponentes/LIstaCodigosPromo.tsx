import React from "react";
import { List } from "@mantine/core";
import {
  Button,
  CircularProgress,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import CardCode from "./CardCode";
import { PromoCodeInterface } from "@/callBack/promociones/GetAllPromos";
import ErrorMessage from "@/components/Habitaciones/EditHabitacion/ErrorMessage";
import { BsSearch } from "react-icons/bs";

interface ListaCodigosPromoProps {
  codePromo: PromoCodeInterface[];
  loading: boolean;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
  codeByName: PromoCodeInterface | null;
}

const ListaCodigosPromo: React.FC<ListaCodigosPromoProps> = ({
  codePromo,
  loading,
  search,
  onSearchChange,
  onSearchSubmit,
  codeByName,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-light-white flex shadow-eco rounded-md p-6 w-[100%] gap-4">
        <TextField
          label="Buscar código de descuento"
          variant="outlined"
          value={search}
          onChange={onSearchChange}
          className="w-full"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSearchSubmit}
          endIcon={<BsSearch />}
          className="px-12"
        >
          Buscar
        </Button>
      </div>

      {loading ? (
        <div className="h-52 flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
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
