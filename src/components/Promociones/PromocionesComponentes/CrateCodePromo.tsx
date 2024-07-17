import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import createPromoCode from '@/callBack/promociones/CreatePromoCode';
import { PromoCodeInterface } from '@/callBack/promociones/GetAllPromos';

interface CreateCodePromoProps {
  addNewPromoCode: (newCode: PromoCodeInterface) => void;
}

const CreateCodePromo: React.FC<CreateCodePromoProps> = ({ addNewPromoCode }) => {
  const [description, setDescription] = useState('');
  const [percentage, setPercentage] = useState<number | string>('');
  const [availableUses, setAvailableUses] = useState<number | string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    description: false,
    percentage: false,
    availableUses: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    validateForm();
  }, [description, percentage, availableUses]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (description === '') newErrors.description = 'La descripción es obligatoria';
    if (percentage === '' || isNaN(Number(percentage))) newErrors.percentage = 'El porcentaje debe ser un número';
    if (availableUses === '' || isNaN(Number(availableUses))) newErrors.availableUses = 'Los usos disponibles deben ser un número';

    setErrors(newErrors);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async () => {
    if (Object.keys(errors).length > 0) return;

    const promoData = {
      description,
      percentage: Number(percentage),
      available_uses: Number(availableUses),
    };

    const response = await createPromoCode(promoData);

    if (response) {
      addNewPromoCode(response);
      setSuccess('Código promocional creado exitosamente');
      setOpenSnackbar(true);
      setDescription('');
      setPercentage('');
      setAvailableUses('');
      setErrors({});
      setTouched({ description: false, percentage: false, availableUses: false });
    } else {
      setErrors({ api: 'Error al crear el código promocional' });
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <p className='text-gray-600'>Crear código de descuento</p>
      <div>
        <Box component="form" noValidate autoComplete="off" className='flex w-[100%] gap-6 items-center justify-center'>
          <div>
            <TextField
              fullWidth
              margin="normal"
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => handleBlur('description')}
              error={!!errors.description && touched.description}
              helperText={touched.description && errors.description}
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="normal"
              label="Porcentaje"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              onBlur={() => handleBlur('percentage')}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={!!errors.percentage && touched.percentage}
              helperText={touched.percentage && errors.percentage}
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="normal"
              label="Usos Disponibles"
              value={availableUses}
              onChange={(e) => setAvailableUses(e.target.value)}
              onBlur={() => handleBlur('availableUses')}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={!!errors.availableUses && touched.availableUses}
              helperText={touched.availableUses && errors.availableUses}
            />
          </div>
          {errors.api && (
            <Typography color="error" variant="body2">
              {errors.api}
            </Typography>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={Object.keys(errors).length > 0 || !description || !percentage || !availableUses}
            >
              Crear Código de descuento
            </Button>
          </Box>
        </Box>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Código promocional creado exitosamente
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateCodePromo;
