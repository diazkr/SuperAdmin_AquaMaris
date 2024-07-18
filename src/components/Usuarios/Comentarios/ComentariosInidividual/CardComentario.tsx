"use client";
import {
  Button,
  Rating,
  Snackbar,
  Alert,
  CircularProgress,
  SnackbarCloseReason,
} from "@mui/material";
import { useState } from "react";
import { Comentario } from "@/components/Interfaces/UserInterface";
import Image from "next/image";

interface CardUserProps {
  comentario: Comentario;
  onComentarioActualizado: () => void;
}

const CardComentario: React.FC<CardUserProps> = ({
  comentario,
  onComentarioActualizado,
}) => {
  const { id, comment, rating, comment_date, comment_status, user } =
    comentario;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [loadingAprobar, setLoadingAprobar] = useState(false);
  const [loadingNegar, setLoadingNegar] = useState(false);

  const handleAprobar = async () => {
    setLoadingAprobar(true);
    setSnackbarMessage(`Usted ha aprobado el comentario con id ${id}`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: id,
            newStatus: "APPROVED",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al aprobar el comentario");
      }

      onComentarioActualizado();
    } catch (error) {
      setSnackbarMessage("Error al aprobar el comentario");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.log("Snackbar should open with error message.");
    } finally {
      setLoadingAprobar(false);
    }
  };

  const handleNegar = async () => {
    setLoadingNegar(true);
    setSnackbarMessage(`Usted ha negado el comentario con id ${id}`);
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: id,
            newStatus: "DENIED",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al negar el comentario");
      }

      onComentarioActualizado();
    } catch (error) {
      setSnackbarMessage("Error al negar el comentario");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoadingNegar(false);
    }
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    console.log("Snackbar is closing");
    setOpenSnackbar(false);
  };
  const getImageUrl = (userPhoto: string | undefined) => {
    if (userPhoto && !userPhoto.endsWith("photo.jpg")) {
      return userPhoto;
    }
    return "/iconos/usuario.png";
  };
  return (
    <div className="my-1 border border-gray-300 w-[100%]">
      <div className="flex  rounded-sm gap-2 justify-between">
        <div className="flex">
          <div className="flex justify-center items-center m-3">
            <Image
              src={getImageUrl(user.user_photo)}
              width="40"
              height="40"
              alt="User Icon"
              className="rounded-full m-1"
            />
          </div>
          <div>
            <div>
              <p className="mx-2 text-xs text-gray-600 ">{user.name}</p>
            </div>
            <div className="flex items-center">
              <p className="mx-2 text-sm ">{comment}</p>
            </div>

            <div>
              <Rating name="read-only" value={rating} readOnly />
            </div>
            <div className="flex items-center">
              <p className="mx-2 text-xs text-gray-600 ">{comment_date}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-2 gap-6">
          <Button
            variant="contained"
            disabled={comment_status === "APPROVED" || loadingAprobar}
            onClick={handleAprobar}
          >
            {loadingAprobar ? <CircularProgress size={24} /> : "Aprobar"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            disabled={comment_status === "DENIED" || loadingNegar}
            onClick={handleNegar}
          >
            {loadingNegar ? <CircularProgress size={24} /> : "Negar"}
          </Button>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CardComentario;
