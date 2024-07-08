"use client"
import React, { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';

interface TabContentProps {
  selectedTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  switch (selectedTab) {
    case 'Todos los usuarios':
      return <div>Contenido de Tab 1</div>;
    case 'Comentarios':
      return <div>Contenido de Tab 2</div>;
    case 'Graficas':
      return <div>Contenido de Tab 3</div>;
    default:
      return <div>Seleccione una pestaña</div>;
  }
};

const UsuariosPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Tab 1');

  return (
    <Box>
      <div style={{ marginBottom: '1rem', padding: '1rem' }} className='gap-4'>
        {['Todos los usuarios', 'Comentarios', 'Graficas'].map(tab => (
          <Button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            variant={selectedTab === tab ? 'contained' : 'outlined'}
            className='mx-2 p-2 px-6'
            disabled

          >
            {tab}
          </Button>
        ))}
      </div>
      <Box style={{ padding: '1rem' }} className="bg-light-white  flex flex-col h-screen shadow-eco rounded-md mr-4">
        <TabContent selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default UsuariosPage;
