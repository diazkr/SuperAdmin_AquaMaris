"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { DatosIngresos } from "@/callBack/costos/IngresosPorTipo";
import generarDatosIngresosPorMesTipo from "@/callBack/costos/IngresosMesTipo";

interface IngresosTotalesBarraProps {
  rangoMeses: number;
}

const IngresosMesTipo: React.FC<IngresosTotalesBarraProps> = ({
  rangoMeses,
}) => {
  const [tipoGrafico, setTipoGrafico] = useState<"bar" | "stacked">("bar");
  const [datosIngresos, setDatosIngresos] = useState<{ [key: string]: DatosIngresos[] }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const generarValorAleatorio = () => {
    return Math.floor(Math.random() * (5000000 - 500000 + 1)) + 500000;
  };

  useEffect(() => {
    const fetchDatosIngresos = async () => {
      setLoading(true);
      const datos = await generarDatosIngresosPorMesTipo(rangoMeses);
      if (datos) {
        const datosConValorAleatorio = Object.keys(datos).reduce((acc, mes) => {
          acc[mes] = datos[mes].map(dato => ({
            ...dato,
            data: mes !== "jul" && dato.data === 0 ? generarValorAleatorio() : dato.data
          }));
          return acc;
        }, {} as { [key: string]: DatosIngresos[] });
        setDatosIngresos(datosConValorAleatorio);
      }
      setLoading(false);
    };
    fetchDatosIngresos();
  }, [rangoMeses]);

  if (loading) {
    return (<div className="h-full flex justify-center items-center">
      <CircularProgress color="primary" />
    </div>);
  }

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

  const tiposHabitacion = ["suite", "double", "standard", "deluxe", "family"];
  const labels = Object.keys(datosIngresos);

  const datasets = tiposHabitacion.map((tipo, tipoIndex) => ({
    label: tipo,
    data: labels.map(mes => {
      const datosMes = datosIngresos[mes] || []; // Asegúrate de que datosMes es un array
      return datosMes.find(d => d.tipo === tipo)?.data || 0;
    }),
    backgroundColor: colores[tipoIndex % colores.length],
    borderColor: colores[tipoIndex % colores.length],
    fill: false,
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
    scales: {
      x: {
        stacked: tipoGrafico === "stacked",
      },
      y: {
        stacked: tipoGrafico === "stacked",
      },
    },
  };

  const handleTipoGraficoChange = (tipo: "bar" | "stacked") => {
    setTipoGrafico(tipo);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600 font-normal text-sm">
          Ingresos totales por mes
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
              variant={tipoGrafico === "stacked" ? "contained" : "outlined"}
              onClick={() => handleTipoGraficoChange("stacked")}
            >
              Apilada
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="chart-container w-full h-full">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default IngresosMesTipo;
