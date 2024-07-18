"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import generarReservasPorcentaje, { UserReservations } from "@/callBack/habitaciones/habitacionesDashboard/ReservasPorcentaje";

interface ReservationsTotalesProps {
  rangoMeses: number;
}

const ReservasPorcentaje: React.FC<ReservationsTotalesProps> = ({ rangoMeses }) => {
  const [tipoGrafico, setTipoGrafico] = useState<"pie">("pie");
  const [datosReservas, setDatosReservas] = useState<UserReservations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await generarReservasPorcentaje(rangoMeses);
      if (data) {
        setDatosReservas(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [rangoMeses]);

  if (loading) {
    return (<div className="h-full flex justify-center items-center">
      <CircularProgress color="primary" />
    </div>);
  }

  const colores = [
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
    labels: datosReservas.map((dato) => dato.type),
    datasets: [
      {
        label: "Reservaciones",
        data: datosReservas.map((dato) => dato.data),
        backgroundColor: colores,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="h-full flex flex-col w-[100%]">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-normal text-sm">
          Reservaciones por tipo de habitación
        </h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="chart-container w-full h-[400px]">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReservasPorcentaje;
