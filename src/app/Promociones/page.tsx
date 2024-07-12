"use client";
import React, { useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import GeneralPagePromo from "@/components/Promociones/PromocionesPage/GeneralPagePromocion";

interface TabContentProps {
  selectedTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  switch (selectedTab) {
    case "Codigos de descuento":
      return (
        <div>
          <GeneralPagePromo />
        </div>
      );
    default:
      return (
        <div>
          <GeneralPagePromo />
        </div>
      );
  }
};

const PromocionesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    "Codigos de descuento"
  );

  return (
    <Box >
      <div style={{ padding: "1rem" }} className="gap-4">
        {["Codigos de descuento"].map((tab) => (
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

export default PromocionesPage;
