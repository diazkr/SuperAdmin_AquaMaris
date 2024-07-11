import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmBanDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  userName: string;
}

const ConfirmBanDialog: React.FC<ConfirmBanDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  userName,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmar baneo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro que quiere bannear al usuario {userName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="error">
          Sí, estoy seguro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBanDialog;
