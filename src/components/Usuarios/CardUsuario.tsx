"use client";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { UserInterface } from "../Interfaces/UserInterface";
import Image from "next/image";
import UserInfoModal from "./UserInfoModal";
import ConfirmBanDialog from "./DialogBannear";

interface CardUserProps {
  user: UserInterface;
  reloadUsers: () => void;
}

const CardUsuario: React.FC<CardUserProps> = ({ user, reloadUsers }) => {
  const {
    id,
    name,
    email,
    phone,
    country,
    reservations,
    comentario,
    photo,
    is_locked,
  } = user;
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmBan, setOpenConfirmBan] = useState(false);
  const [loadingBan, setLoadingBan] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenConfirmBan = () => {
    setOpenConfirmBan(true);
  };

  const handleCloseConfirmBan = () => {
    setOpenConfirmBan(false);
  };

  const handleConfirmBan = async () => {
    setLoadingBan(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/superadmin/blockUser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Usuario baneado: ${name}`);
        await reloadUsers();
      } else {
        console.error("Error al bannear el usuario");
      }
    } catch (error) {
      console.error("Error al bannear el usuario:", error);
    } finally {
      setLoadingBan(false);
      handleCloseConfirmBan();
    }
  };

  return (
    <div className="my-2 border border-gray-300 w-[100%]">
      <div className="flex rounded-sm gap-2 justify-between">
        <div className="flex flex-col p-4 text-[#07282C]">
          <div>
            <div className="flex gap-1 m-1 py-1 mx-4">
              <Image
                src={photo || "/iconos/usuario.png"}
                width="40"
                height="40"
                alt="User Icon"
                className="rounded-full m-1"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <p className="font-medium">Nombre: </p>
          <p className="mx-2 text-sm ">{name}</p>
        </div>

        <div className="flex items-center">
          <p className="font-medium">Email: </p>
          <p className="mx-2 text-sm ">{email}</p>
        </div>

        <div className="flex justify-center items-center p-2 gap-6">
          <Button variant="outlined" color="primary" onClick={handleOpenModal}>
            Ver más información
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleOpenConfirmBan}
            disabled={is_locked || loadingBan}
          >
            {loadingBan ? <CircularProgress size={24} /> : "Bannear usuario"}
          </Button>
        </div>
      </div>

      <UserInfoModal
        open={openModal}
        handleClose={handleCloseModal}
        user={user}
      />

      <ConfirmBanDialog
        open={openConfirmBan}
        handleClose={handleCloseConfirmBan}
        handleConfirm={handleConfirmBan}
        userName={name}
      />
    </div>
  );
};

export default CardUsuario;
