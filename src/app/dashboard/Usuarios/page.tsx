"use client";
import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import ListaUsuario from "@/components/Usuarios/ListUsuarios";
import ComentariosPageInfo from "@/components/Usuarios/Comentarios/ComentariosPage/ComentariosPage";

interface TabContentProps {
  selectedTab: string;
}

// hola
const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  switch (selectedTab) {
    case "Editar usuarios":
      return (
        <div>
          <ListaUsuario></ListaUsuario>
        </div>
      );
    case "Comentarios":
      return (
        <div>
          {" "}
          <ComentariosPageInfo />
        </div>
      );
    default:
      return (
        <div>
          {" "}
          <ListaUsuario></ListaUsuario>
        </div>
      );
  }
};

const UsuariosPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Editar usuarios");

  return (
    <Box>
      <div style={{ padding: "1rem" }} className="gap-4">
        {["Editar usuarios", "Comentarios"].map((tab) => (
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
      <Box style={{ padding: "1rem" }} className="flex flex-col h-full mr-4">
        <TabContent selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default UsuariosPage;
