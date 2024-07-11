"use client";
import { Button, MenuItem, Popover, Select, Typography } from "@mui/material";
import { CiCircleMore } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";
import SimpleCarousel from "../EditHabitacion/CarouselComponent";

interface CardHabitacionProps {
  habitacion: Habitacion;
}

const CardHabitacionEstado: React.FC<CardHabitacionProps> = ({
  habitacion,
}) => {
  const { id, type, price, description, state, images, roomNumber, services } =
    habitacion;

  const [newState, setNewState] = useState(state);
  const [stateChanged, setStateChanged] = useState(false);

  const handleStateChange = (event: any) => {
    setNewState(event.target.value as string);
    setStateChanged(event.target.value !== state);
  };

  const nameHabitacion = (
    tipo_habitacion: string,
    servicios: string[]
  ): string => {
    let name = `Habitación tipo ${tipo_habitacion}`;

    if (servicios.includes("seaView")) {
      name += " con vista al mar";
    }

    if (tipo_habitacion === "suite" && servicios.includes("jacuzzi")) {
      name = "Suite de lujo con jacuzzi";
    } else if (tipo_habitacion === "deluxe") {
      name = "Habitación Deluxe con todas las comodidades";
    } else if (tipo_habitacion === "double") {
      name = "Habitación Doble perfecta para parejas";
    } else if (tipo_habitacion === "family") {
      name = "Habitación Familiar ideal para grupos grandes";
    }

    return name;
  };

  const handleSaveClick = () => {
    console.log("ID de habitación:", id);
    console.log("Nuevo estado:", newState);
  };

  return (
    <div className="my-2 border border-gray-300 w-[100%]">
      <div className="flex rounded-sm gap-2 justify-between">
        <div className="flex flex-col p-4 text-[#07282C] w-1/3">
          <div className="flex items-center ">
            <p className="font-medium">ID: </p>
            <p className=" text-sm mx-2 ">{id}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Numero: </p>
            <p className="mx-2 text-sm ">{roomNumber}</p>
          </div>
        </div>

        <div className="flex items-center w-1/3">
          <p className="font-medium">Estado: </p>
          <Select
            value={newState}
            onChange={handleStateChange}
            displayEmpty
            className="mx-2 text-sm w-full"
          >
            <MenuItem value="available">Disponible</MenuItem>
            <MenuItem value="inmaintenance">En Mantenimiento</MenuItem>
            <MenuItem value="occupied">Ocupado</MenuItem>
          </Select>
        </div>

        <div className="flex justify-center items-center p-2 w-1/3">
          <Button
            variant="contained"
            color="primary"
            endIcon={<IoMdSend style={{ marginLeft: "1em" }} />}
            onClick={handleSaveClick}
            disabled={!stateChanged}
          >
            Guardar cambio de estado
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardHabitacionEstado;
