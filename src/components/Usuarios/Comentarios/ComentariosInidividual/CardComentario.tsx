"use client";
import {
  Button,
  Rating,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Comentario } from "@/components/Interfaces/UserInterface";

interface CardUserProps {
  comentario: Comentario;
}

const CardComentario: React.FC<CardUserProps> = ({ comentario }) => {
  const { id, comment, rating, comment_date, comment_status } = comentario;
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleAprobar = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            commentId: id,
            newStatus: 'APPROVED',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al aprobar el comentario');
      }

      setSnackbarMessage(`Usted ha aprobado el comentario con id ${id}`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error al aprobar el comentario');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleNegar = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            commentId: id,
            newStatus: 'DENIED',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al negar el comentario');
      }

      setSnackbarMessage(`Usted ha negado el comentario con id ${id}`);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error al negar el comentario');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <div className="my-1 border border-gray-300 w-[100%]">
      <div className="flex rounded-sm gap-2 justify-between">
        <div>
          <div>
            <Rating name="read-only" value={rating} readOnly />
          </div>
          <div className="flex items-center">
            <p className="mx-2 text-xs text-gray-600 ">{comment_date}</p>
          </div>

          <div className="flex items-center">
            <p className="mx-2 text-sm ">{comment}</p>
          </div>
        </div>

        <div className="flex justify-center items-center p-2 gap-6">
          <Button
            variant="contained"
            disabled={comment_status === "APPROVED"}
            onClick={handleAprobar}
          >
            Aprobar
          </Button>

          <Button
            variant="outlined"
            color="error"
            disabled={comment_status === "DENIED"}
            onClick={handleNegar}
          >
            Negar
          </Button>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: 'top', horizontal: 'right'  }}

      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CardComentario;
