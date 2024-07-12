import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { UserInterface } from "../Interfaces/UserInterface";
import Image from "next/image";

interface UserInfoModalProps {
  open: boolean;
  handleClose: () => void;
  user: UserInterface;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  open,
  handleClose,
  user,
}) => {
  const {
    id,
    name,
    email,
    phone,
    country,
    reservations = [],
    comentario = [],
    photo,
  } = user;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Información del Usuario</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center">
          <Image
            src={photo || "/iconos/usuario.png"}
            width="100"
            height="100"
            alt="User Icon"
            className="rounded-full m-1"
          />
          <Typography variant="h6">{name}</Typography>
        </div>
        <div className="flex items-center">
          <Typography className="font-medium">ID:</Typography>
          <Typography className="text-gray-600 text-sm mx-2">{id}</Typography>
        </div>
        <div className="flex items-center">
          <Typography className="font-medium">Nombre:</Typography>
          <Typography className="text-gray-600 text-sm mx-2">{name}</Typography>
        </div>
        <div className="flex items-center">
          <Typography className="font-medium">Correo:</Typography>
          <Typography className="text-gray-600 text-sm mx-2">{email}</Typography>
        </div>
        <div className="flex items-center">
          <Typography className="font-medium">Pais:</Typography>
          <Typography className="text-gray-600 text-sm mx-2">{country || "Sin información"}</Typography>
        </div>
        <div className="flex items-center">
          <Typography className="font-medium">Telefono:</Typography>
          <Typography className="text-gray-600 text-sm mx-2">{phone || "Sin información"}</Typography>
        </div>
        <Typography className="font-medium">Reservas:</Typography>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id}>
              <Typography>Check-in: {reservation.check_in_date}</Typography>
              <Typography>Check-out: {reservation.check_out_date}</Typography>
              <Typography>
                Estado del pago: {reservation.paymentStatus}
              </Typography>
              <Typography>Compañeros:</Typography>
              {reservation.companions && reservation.companions.length > 0 ? (
                reservation.companions.map((companion) => (
                  <Typography key={companion.id_acompanante}>
                    {companion.name}
                  </Typography>
                ))
              ) : (
                <Typography>No hay compañeros</Typography>
              )}
            </div>
          ))
        ) : (
          <Typography className="text-gray-600 text-sm mx-2">No hay reservas</Typography>
        )}
        <Typography className="font-medium" >Comentarios:</Typography>
        {comentario.length > 0 ? (
          comentario.map((comment, index) => (
            <div key={index}>
              <Typography>Comentario: {comment.comment}</Typography>
              <Typography>Rating: {comment.rating}</Typography>
              <Typography>
                Fecha del comentario: {comment.comment_date}
              </Typography>
              <Typography>
                Estado del comentario: {comment.comment_status}
              </Typography>
            </div>
          ))
        ) : (
          <Typography className="text-gray-600 text-sm mx-2">No hay comentarios</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserInfoModal;
