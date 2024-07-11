"use client"
import React, { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import CreateRoom from '@/components/Habitaciones/CrearNuevaHabitacion/CreateRoom';
import ListaHabitaciones from '@/components/Habitaciones/EditHabitacion/ListHabitacion';
import ListaHabitacionesEstado from '@/components/Habitaciones/CambiarEstadoHabitacion/ListHabitacionEstado';

interface TabContentProps {
  selectedTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  switch (selectedTab) {
    case 'Crear nueva habitacion':
      return (<div className='bg-light-white  flex flex-col h-full shadow-eco rounded-md mr-4'>
        <CreateRoom />
      </div>);
    case 'Editar habitacion':
      return (
        <ListaHabitaciones/>
      );
    case 'Deshabilitar habitacion':
      return (<div>
        <ListaHabitacionesEstado/>
      </div> )
    default:
      return (<div>
        <CreateRoom />
      </div>);
  }
};

const MyComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Editar habitacion');

  return (
    <Box>
      <div style={{ padding: '1rem' }} className='gap-4'>
        {['Editar habitacion', 'Deshabilitar habitacion', 'Crear nueva habitacion',].map(tab => (
          <Button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            variant={selectedTab === tab ? 'contained' : 'outlined'}
            className='mx-2 p-2 px-6'
            

          >
            {tab}
          </Button>
        ))}
      </div>
      <Box style={{ padding: '1rem' }} className=" flex flex-col mr-4">
        <TabContent selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default MyComponent;
