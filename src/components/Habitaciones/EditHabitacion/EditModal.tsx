import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Habitacion } from '@/components/Interfaces/HabitacionInterface';

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  habitacion: Habitacion;
  handleSave: (updatedHabitacion: Habitacion) => void;
}

const EditModal: React.FC<EditModalProps> = ({ open, handleClose, habitacion, handleSave }) => {
  const [editedHabitacion, setEditedHabitacion] = useState<Habitacion>(habitacion);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedHabitacion((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    handleSave(editedHabitacion);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Editar Habitación</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tipo"
          type="text"
          name="type"
          value={editedHabitacion.type}
          onChange={handleChange}
          fullWidth
        />
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
        <TextField
          margin="dense"
          label="Estado"
          type="text"
          name="state"
          value={editedHabitacion.state}
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
