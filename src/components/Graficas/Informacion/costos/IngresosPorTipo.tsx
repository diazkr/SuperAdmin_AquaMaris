"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import IngresosPorTipo, {
  DatosIngresos,
} from "@/callBack/costos/IngresosPorTipo";
import IngresosTipoPorcentaje from "@/callBack/costos/IngresosTipoPorcentaje";

interface IngresosTotalesBarraProps {
  rangoMeses: number;
}

const IngresosTotalesPorTipo: React.FC<IngresosTotalesBarraProps> = ({
  rangoMeses,
}) => {
  const [tipoGrafico, setTipoGrafico] = useState<"bar" | "pie">("bar");
  const [datosIngresos, setDatosIngresos] = useState<DatosIngresos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchDatosIngresos = async () => {
      setLoading(true);
      const datos =
        tipoGrafico === "bar"
          ? await IngresosPorTipo(rangoMeses)
          : await IngresosTipoPorcentaje(rangoMeses);
      if (datos) {
        setDatosIngresos(datos);
      }
      setLoading(false);
    };
    fetchDatosIngresos();
  }, [rangoMeses, tipoGrafico]);

  if (loading) {
    return (<div className="h-full flex justify-center items-center">
      <CircularProgress color="primary" />
    </div>);
  }

  const data = {
    labels: datosIngresos.map((dato) => dato.tipo),
    datasets: [
      {
        label: tipoGrafico === "bar" ? "Ingresos" : "Porcentaje",
        data: datosIngresos.map((dato) => dato.data),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: colores,
        tension: 0.4,
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
  const handleTipoGraficoChange = (tipo: "bar" | "pie") => {
    setTipoGrafico(tipo);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-normal text-sm">
          Ingresos totales por tipo de habitación
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
          {tipoGrafico === "bar" ? (
            <Bar data={data} options={options} />
          ) : (
            <div className="p-4 h-full w-[100%] flex justify-center ">
              <Pie data={data} options={options} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngresosTotalesPorTipo;
