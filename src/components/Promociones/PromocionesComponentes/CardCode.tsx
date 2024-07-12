import React from "react";
import { Typography } from "@mui/material";
import { PromoCodeInterface } from "@/callBack/promociones/GetAllPromos";

interface CardCodeProps {
  code: PromoCodeInterface;
}

const CardCode: React.FC<CardCodeProps> = ({ code }) => {
  const stateBackgroundColor = code.state === "AVAILABLE" ? "bg-green-200" : "bg-orange-200";
  const stateTextColor = code.state === "AVAILABLE" ? "text-green-900" : "text-orange-900";

  return (
    <div className="w-full m-2 mx-4 p-4 border border-1 border-gray-200 shadow-sm ">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex">
            <Typography className="font-semibold text-gray-700" component="div">
              Código:
            </Typography>
            <Typography className="px-2 text-cyan-800 text-lg" component="div">
              {code.code}
            </Typography>
          </div>

          <Typography className="text-gray-700 text-sm" color="text.secondary">
            Descripción: {code.description}
          </Typography>
        </div>

        <div className="flex gap-1">
          <Typography className="font-medium text-green-900">
            Porcentaje:
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {code.percentage}%
          </Typography>
        </div>

        <div className="flex gap-1">
          <Typography className="font-medium text-gray-600">
            Usos disponibles:
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {code.available_uses}
          </Typography>
        </div>

        <div>
          <Typography className={`${stateBackgroundColor} ${stateTextColor} px-2 py-1 rounded`}>
            {code.state}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CardCode;
