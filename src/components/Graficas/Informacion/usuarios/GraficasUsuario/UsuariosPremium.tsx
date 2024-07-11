"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Button, ButtonGroup } from "@mui/material";
import generarDatosUsuariosMembresia, { MembershipData } from "@/callBack/usuarios/UsuariosPremiumMock";

interface UsuariosPremiumTotalesProps {
  rangoMeses: number;
}

const UsuariosPremiumGrafica: React.FC<UsuariosPremiumTotalesProps> = ({
  rangoMeses,
}) => {
  const [tipoGrafico, setTipoGrafico] = useState<"bar" | "pie">("pie");
  const [datosUsuarios, setDatosUsuarios] = useState<MembershipData | null>(null);

  useEffect(() => {
    const fetchDatosUsuarios = async () => {
      const datos = await generarDatosUsuariosMembresia(rangoMeses);
      setDatosUsuarios(datos);
    };
    fetchDatosUsuarios();
  }, [rangoMeses]);

  if (!datosUsuarios) {
    return <p>Cargando datos...</p>;
  }


  const colores = [
    'rgba(75, 192, 192, 0.5)',  // medio
    'rgba(15, 132, 132, 1)',    // oscuro
  ];

  const dataPie = {
    labels: ["Con Reservas", "Sin Reservas"],
    datasets: [
      {
        label: "Porcentaje de Usuarios",
        data: [datosUsuarios.withMembership.percentage, datosUsuarios.withoutMembership.percentage],
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
        data: [datosUsuarios.withMembership.value, datosUsuarios.withoutMembership.value],
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
          Usuarios con membresía
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

export default UsuariosPremiumGrafica;
