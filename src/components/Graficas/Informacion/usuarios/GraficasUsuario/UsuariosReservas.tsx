"use client";
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Button, ButtonGroup } from "@mui/material";
import generarDatosUsuariosReservas from "@/callBack/usuarios/UsuarioReservasMock";

interface UsuariosPremiumTotalesProps {
  rangoMeses: number;
}

const UsuariosReservas: React.FC<UsuariosPremiumTotalesProps> = ({
  rangoMeses,
}) => {
  const [tipoGrafico, setTipoGrafico] = useState<"bar" | "pie">("bar");
  const datosUsuarios = generarDatosUsuariosReservas(rangoMeses);
  console.log(datosUsuarios);

  const colores = [
    'rgba(75, 192, 192, 0.5)',  // medio
    'rgba(15, 132, 132, 1)',    // oscuro
  ];

  const dataPie = {
    labels: ["Con Reservas", "Sin Reservas"],
    datasets: [
      {
        label: "Porcentaje de Usuarios",
        data: [datosUsuarios.withBookings.percentage, datosUsuarios.withoutBookings.percentage],
        backgroundColor: colores,
        borderColor: colores,
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: ["Con Reservas", "Sin Reservas"],
    datasets: [
      {
        label: "Usuarios",
        data: [datosUsuarios.withBookings.value, datosUsuarios.withoutBookings.value],
        backgroundColor: colores,
        borderColor: colores,
        borderWidth: 1,
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

  const handleTipoGraficoChange = (tipo: "bar" | "pie") => {
    setTipoGrafico(tipo);
  };

  return (
    <div className="h-full flex flex-col w-[100%]">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-normal text-sm">
          Usuarios Premium
        </h2>
        <div>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              size="small"
              variant={tipoGrafico === "bar" ? "contained" : "outlined"}
              onClick={() => handleTipoGraficoChange("bar")}
            >
              Barra
            </Button>
            <Button
              size="small"
              variant={tipoGrafico === "pie" ? "contained" : "outlined"}
              onClick={() => handleTipoGraficoChange("pie")}
            >
              Pie
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="chart-container w-full h-full">
          {tipoGrafico === "bar" ? <Bar data={dataBar} options={options}/> : <Pie data={dataPie} options={options}/>}
        </div>
      </div>
    </div>
  );
};

export default UsuariosReservas;
