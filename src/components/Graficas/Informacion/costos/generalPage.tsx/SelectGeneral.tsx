import React, { useState } from "react";
import { Select, FormControl, InputLabel, SelectChangeEvent, MenuItem } from "@mui/material";


interface SelectGeneralProps {
    setRangoMeses: (value: number) => void;
  }
const SelectGeneral: React.FC<SelectGeneralProps> = ({ setRangoMeses }) => {
  const [ubicacion, setUbicacion] = useState<string>('Aqua Maris San Andrés');

  const handleUbicacionChange = (event: SelectChangeEvent<string>) => {
    setUbicacion(event.target.value as string);
  };

  const handleRangoChange = (event: SelectChangeEvent<number>) => {
    setRangoMeses(Number(event.target.value));
  };

  return (
    <div className='bg-light-white flex justify-between gap-12 h-full shadow-eco rounded-md p-3 mb-4'>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Ubicación</InputLabel>
        <Select value={ubicacion} onChange={handleUbicacionChange} label="Ubicación">
          <MenuItem value="Aqua Maris San Andrés">Aqua Maris San Andrés</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Ver datos de:</InputLabel>
        <Select defaultValue={6} onChange={handleRangoChange} label="Ver datos de:">
        <MenuItem value={1}>Último mes</MenuItem>
          <MenuItem value={3}>Últimos 3 meses</MenuItem>
          <MenuItem value={5}>Últimos 5 meses</MenuItem>
          <MenuItem value={6}>Últimos 6 meses</MenuItem>
          <MenuItem value={10}>Últimos 10 meses</MenuItem>
          <MenuItem value={12}>Últimos 12 meses</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectGeneral;
