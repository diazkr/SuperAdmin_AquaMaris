import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";
import CardHabitacion from "./CardHabitacion"; // Importamos CardHabitacion para mostrarla en el modal de éxito

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  habitacion: Habitacion;
  onSaveSuccess: (updatedHabitacion: Habitacion) => void; // Añadimos un callback para cuando la actualización sea exitosa
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  habitacion,
  onSaveSuccess,
}) => {
  const [editedHabitacion, setEditedHabitacion] =
    useState<Habitacion>(habitacion);
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedHabitacion((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,

      [name]: name === "roomNumber" ? Number(value) : value,
    }));
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const { images, services, ...rest } = editedHabitacion;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${editedHabitacion.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...rest,
            price: Number(editedHabitacion.price),
            roomNumber: Number(editedHabitacion.roomNumber)
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onSaveSuccess(data); // Llamamos al callback con la habitación actualizada
        setOpenSuccessModal(true);
      } else {
        console.error("Error al actualizar la habitación");
      }
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
    } finally {
      setLoading(false);
      handleClose(); // Cerramos el modal de edición
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    handleClose(); // Llamamos handleClose para actualizar la lista
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Editar Habitación</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Tipo</InputLabel>
            <Select
              name="type"
              value={editedHabitacion.type}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value="standard">Estándar</MenuItem>
              <MenuItem value="double">Doble</MenuItem>
              <MenuItem value="deluxe">Deluxe</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
              <MenuItem value="family">Familiar</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Precio"
            type="number"
            name="price"
            value={editedHabitacion.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            name="description"
            value={editedHabitacion.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Número de Habitación"
            type="text"
            name="roomNumber"
            value={editedHabitacion.roomNumber}
            onChange={handleChange}
            fullWidth
          />
          {/* Agrega más campos de ser necesario */}
        </DialogContent>
        <DialogActions className="mx-3">
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSaveClick}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal de Éxito */}
      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg w-[70vw] p-6">
          <Typography id="modal-modal-title" variant="h6" component="h2" color={"primary"}>
          La habitación se ha actualizado correctamente.
          </Typography>
          
          <CardHabitacion habitacion={editedHabitacion} onStateChange={()=> (console.log("hola"))}/>
            <div className=" mx-4 flex justify-end">
            <Button
            onClick={handleCloseSuccessModal}
            variant="outlined"
            color="primary"
            size="large"
          >
            Cerrar
          </Button>

            </div>
          
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
