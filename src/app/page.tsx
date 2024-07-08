"use client"
import React, { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import CreateRoom from '@/components/Habitaciones/CreateRoom';

interface TabContentProps {
  selectedTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  switch (selectedTab) {
    case 'Crear nueva habitacion':
      return (<div>
        <CreateRoom />
      </div>);
    case 'Ver todas habitaciones':
      return <div>Contenido de Tab 2</div>;
    case 'Historial de ocupacion':
      return <div>Contenido de Tab 3</div>;
    default:
      return (<div>
        <CreateRoom />
      </div>);
  }
};

const MyComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Crear nueva habitacion');

  return (
    <Box>
      <div style={{ marginBottom: '1rem', padding: '1rem' }} className='gap-4'>
        {['Crear nueva habitacion', 'Ver todas habitaciones', 'Historial de ocupacion'].map(tab => (
          <Button
            key={tab}
            disabled={tab !== 'Crear nueva habitacion'} 
            onClick={() => setSelectedTab(tab)}
            variant={selectedTab === tab ? 'contained' : 'outlined'}
            className='mx-2 p-2 px-6'
            

          >
            {tab}
          </Button>
        ))}
      </div>
      <Box style={{ padding: '1rem' }} className="bg-light-white  flex flex-col h-full shadow-eco rounded-md mr-4">
        <TabContent selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default MyComponent;
