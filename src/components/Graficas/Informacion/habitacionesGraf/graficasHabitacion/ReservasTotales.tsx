"use client";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import generarReservasMes, {
  UserReservationsMes,
} from "@/callBack/habitaciones/habitacionesDashboard/ReservasTotal";

interface ReservationsTotalesProps {
  rangoMeses: number;
}

const ReservasTotalMes: React.FC<ReservationsTotalesProps> = ({
  rangoMeses,
}) => {
  const [tipoGrafico, setTipoGrafico] = useState<"line" | "bar">("line");
  const [datosReservas, setDatosReservas] = useState<UserReservationsMes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await generarReservasMes(rangoMeses);
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
    labels: datosReservas.map((dato) => dato.mes),
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleTipoGraficoChange = (tipo: "line" | "bar") => {
    setTipoGrafico(tipo);
  };

  return (
    <div className="h-full flex flex-col w-[100%]">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-normal text-sm">
          Reservaciones totales
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
          {tipoGrafico === "line" ? (
            <Line data={data} options={options} />
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservasTotalMes;
