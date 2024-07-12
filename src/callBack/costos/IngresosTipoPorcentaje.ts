interface DatosIngresos {
    tipo: string;
    data: number;
  }
  
  const IngresosTipoPorcentaje = async (
    rangoMeses: number
  ): Promise<DatosIngresos[] | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/typesRevenuePercent?rango=${rangoMeses}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos de ingresos por mes");
      }
      const data: DatosIngresos[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error en generarDatosIngresosPorMes:", error);
      return null;
    }
  };
  
  export default IngresosTipoPorcentaje;
  