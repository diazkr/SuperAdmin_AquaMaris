interface DatosIngresos {
    tipo: string;
    data: number;
  }
  
  const IngresosTipoPorcentaje = async (
    rangoMeses: number
  ): Promise<DatosIngresos[] | null> => {
    try {
      const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/typesRevenuePercent?rango=${rangoMeses}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 

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
  