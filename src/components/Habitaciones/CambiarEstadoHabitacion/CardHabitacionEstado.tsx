"use client";
import { Button, MenuItem, Select, CircularProgress, Modal, Box, Typography, Backdrop } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";

interface CardHabitacionProps {
  habitacion: Habitacion;
  onStateChange: () => void;
}

const CardHabitacionEstado: React.FC<CardHabitacionProps> = ({
  habitacion,
  onStateChange
}) => {
  const { id, roomNumber, state } = habitacion;

  const [newState, setNewState] = useState(state);
  const [stateChanged, setStateChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleStateChange = (event: any) => {
    setNewState(event.target.value as string);
    setStateChanged(event.target.value !== state);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/suspend/${id}?state=${newState}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setOpenSuccessModal(true);
        onStateChange();  // Llamamos a esta función para actualizar la lista
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setOpenErrorModal(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Ocurrió un error inesperado.');
      setOpenErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <div className="my-2 border border-gray-300 w-[100%]">
      <div className="flex rounded-sm gap-2 justify-between">
        <div className="flex flex-col p-4 text-[#07282C] w-1/3">
          <div className="flex items-center ">
            <p className="font-medium">ID: </p>
            <p className="text-sm mx-2">{id}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium">Numero: </p>
            <p className="mx-2 text-sm">{roomNumber}</p>
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
            disabled={!stateChanged || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar cambio de estado"}
          </Button>
        </div>
      </div>
      {/* Backdrop de Cargando */}
      <Backdrop open={loading} style={{ zIndex: 1200, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Modal de Éxito */}
      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Éxito
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            El estado de la habitación se ha actualizado correctamente.
          </Typography>
          <Button onClick={handleCloseSuccessModal} variant="contained" color="primary">
            Cerrar
          </Button>
        </Box>
      </Modal>
      {/* Modal de Error */}
      <Modal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
          <div className="flex justify-end pt-4 mx-6">
            <Button onClick={handleCloseErrorModal} variant="contained" color="primary">
              Cerrar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardHabitacionEstado;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
