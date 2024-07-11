"use client";
import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import generarDatosIngresos from "@/callBack/costos/IngresosTotales";
import { Button, ButtonGroup } from "@mui/material";

interface IngresosTotalesBarraProps {
  rangoMeses: number;
}

const UsuariosTotales: React.FC<IngresosTotalesBarraProps> = ({
  rangoMeses,
}) => {
  const [tipoGrafico, setTipoGrafico] = useState<"line" | "bar">("line");
  const datosIngresos = generarDatosIngresos(rangoMeses);
  console.log(datosIngresos);

  const colores = [
    "rgba(75, 192, 192, 0.5)", // medio
    "rgba(55, 172, 172, 0.4)", // intermedio claro
    "rgba(75, 192, 192, 0.3)", // claro
    "rgba(35, 152, 152, 0.7)", // intermedio oscuro
    "rgba(75, 192, 192, 0.5)", // medio
    "rgba(15, 132, 132, 1)", // oscuro
    "rgba(75, 192, 192, 0.7)", // más oscuro
    "rgba(95, 212, 212, 0.2)", // claro
    "rgba(55, 172, 172, 0.6)", // medio
    "rgba(35, 152, 152, 0.9)", // muy oscuro
    "rgba(75, 192, 192, 1)", // original
    "rgba(15, 132, 132, 0.8)", // más oscuro
  ];

  const data = {
    labels: datosIngresos.map((dato) => dato.mes),
    datasets: [
      {
        label: "Usuarios",
        data: datosIngresos.map((dato) => dato.data),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: tipoGrafico === "bar" ? colores : "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  const handleTipoGraficoChange = (tipo: "line" | "bar") => {
    setTipoGrafico(tipo);
  };

  return (
    <div className="h-full flex flex-col w-[100%]">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-normal text-sm">
          Usuarios registrados al mes
        </h2>
        <div>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              size="small"
              variant={tipoGrafico === "line" ? "contained" : "outlined"}
              onClick={() => handleTipoGraficoChange("line")}
            >
              Línea
            </Button>
            <Button
              size="small"
              variant={tipoGrafico === "bar" ? "contained" : "outlined"}
              onClick={() => handleTipoGraficoChange("bar")}
            >
              Barra
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="chart-container w-full h-full">
          {tipoGrafico === "line" ? <Line data={data} options={options}/> : <Bar data={data} options={options}/>}
        </div>
      </div>
    </div>
  );
};

export default UsuariosTotales;
