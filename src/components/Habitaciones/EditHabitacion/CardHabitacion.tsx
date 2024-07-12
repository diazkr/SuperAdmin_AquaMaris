"use client";
import { Button, Popover, Typography } from "@mui/material";
import { CiCircleMore } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";
import SimpleCarousel from "./CarouselComponent";
import EditModal from "./EditModal";

interface CardHabitacionProps {
  habitacion: Habitacion;
}

const CardHabitacion: React.FC<CardHabitacionProps> = ({ habitacion }) => {
  const { id, type, price, description, state, images, roomNumber, services } =
    habitacion;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverContent, setPopoverContent] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);


  const router = useRouter();

  const serviceNames: { [key: string]: string } = {
    wifi: "Wi-Fi",
    television: "Televisión",
    seaView: "Vista al mar",
    airConditioning: "Aire acondicionado",
    heater: "Calefacción",
    safeBox: "Caja fuerte",
    parking: "Estacionamiento",
    fridge: "Refrigerador",
    breakfast: "Desayuno",
    jacuzzi: "Jacuzzi",
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

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

  const handleEditSave = (updatedHabitacion: Habitacion) => {
    console.log("Habitación actualizada:", updatedHabitacion);
  };



  const formatPrice = (price: string | number): string => {
    const priceStr = typeof price === "number" ? price.toString() : price;
    const trimmedPrice = priceStr.includes(".")
      ? priceStr.slice(0, -3)
      : priceStr;
    const numberPrice = parseInt(trimmedPrice, 10);
    return numberPrice.toLocaleString("es-ES");
  };

  const formatServices = (services: string[]): string => {
    return services.map(service => serviceNames[service] || service).join(", ");
  };
  return (
    <div className="my-2 border border-gray-300 w-[100%]">
      <div className="flex rounded-sm gap-4 justify-between">
        <div className="flex flex-col p-4 gap-1 text-[#07282C]">
        <div className="flex items-center">
            <p className="font-medium">ID de habitación: </p>
            <p className="mx-2 text-sm ">{id}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Nombre de habitación: </p>
            <p className="mx-2 text-sm ">{nameHabitacion(type, services)}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Descripción: </p>
            <p className="mx-2 text-sm ">{description}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Numero de habitación: </p>
            <p className="mx-2 text-sm ">{roomNumber}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Estado: </p>
            <p className="mx-2 text-sm ">{state}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Precio: </p>
            <p className="mx-2 text-sm ">{formatPrice(price)}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Servicios: </p>
            <p className="mx-2 text-sm ">{formatServices(services)}</p>
          </div>
        </div>
        <div className="w-[30%]">
          <SimpleCarousel images={images} />
        </div>
      </div>

      <div className="bg-gray-100 flex justify-around p-4">
        <Button
          variant="outlined"
          size="small"
          startIcon={<CiCircleMore />}
          sx={{ width: "auto" }}
          disabled
        >
          Ver información en página principal
        </Button>

        <Button
          variant="contained"
          color="primary"
          endIcon={<IoMdSend style={{ marginLeft: "1em" }} />}
          onClick={handleEditClick}
        >
          Editar habitación
        </Button>
      </div>

      <EditModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        habitacion={habitacion}
        handleSave={handleEditSave}
      />


    </div>
  );
};

export default CardHabitacion;
