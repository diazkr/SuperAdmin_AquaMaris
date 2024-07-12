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
} from "@mui/material";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  habitacion: Habitacion;
  handleSave: (updatedHabitacion: Habitacion) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  habitacion,
  handleSave,
}) => {
  const [editedHabitacion, setEditedHabitacion] =
    useState<Habitacion>(habitacion);

  const handleChange = (e: any)=>{
    const { name, value } = e.target;
    setEditedHabitacion((prev) => ({ ...prev, [name as string]: value }));
  };


  const handleSaveClick = () => {
    handleSave(editedHabitacion);
    handleClose();
  };

  return (
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
          type="text"
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Estado</InputLabel>
          <Select
            name="state"
            value={editedHabitacion.state}
            onChange={handleChange}
            label="Estado"
          >
            <MenuItem value="available">Disponible</MenuItem>
            <MenuItem value="inmaintenance">En Mantenimiento</MenuItem>
            <MenuItem value="occupied">Ocupado</MenuItem>
          </Select>
        </FormControl>
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
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
