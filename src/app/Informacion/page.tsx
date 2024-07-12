"use client";
import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import CostosPage from "@/components/Graficas/Informacion/costos/generalPage.tsx/CostosPage";
import UsuariosPageInfo from "@/components/Graficas/Informacion/usuarios/UsuariosPageInfo";
import GeneralPageHabitacion from "@/components/Graficas/Informacion/habitacionesGraf/generalPage/GeneralPageHabitacionex";

interface TabContentProps {
  selectedTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  switch (selectedTab) {
    case "Costos":
      return (
        <div>
          <CostosPage></CostosPage>
        </div>
      );
    case "Usuarios":
      return (
        <div>
          <UsuariosPageInfo/>
        </div>
      );
    case "Reservas":
      return (
        <div>
          <GeneralPageHabitacion/>
        </div>
      );
    default:
      return (
        <div>
          <CostosPage></CostosPage>
        </div>
      );
  }
};

const InformacionPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Costos");

  return (
    <Box>
      <div style={{ padding: "1rem" }}>
        {["Costos", "Usuarios", "Reservas"].map((tab) => (
          <Button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            variant={selectedTab === tab ? "contained" : "outlined"}
            className="mx-2 p-2 px-6"
          >
            {tab}
          </Button>
        ))}
      </div>
      <Box style={{ padding: "1rem" }} className="flex flex-col mr-4">
        <TabContent selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default InformacionPage;
