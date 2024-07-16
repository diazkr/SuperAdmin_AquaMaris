interface DatosIngresos {
  tipo: string;
  data: number;
}

export interface DatosIngresosPorMes {
  [key: string]: DatosIngresos[];
}

export const generarDatosIngresosPorMesTipo = async (rangoMeses: number): Promise<DatosIngresosPorMes | null> => {
  try {
    const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/timeAndTypesRevenue?rango=${rangoMeses}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        }
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los datos de ingresos por mes y tipo");
    }
    const data = await response.json();
    const formattedData: DatosIngresosPorMes = {};

    data.forEach((entry: { [key: string]: DatosIngresos[] }) => {
      Object.keys(entry).forEach(key => {
        formattedData[key] = entry[key];
      });
    });

    return formattedData;

  } catch (error) {
    console.error("Error en obtenerDatosIngresosPorMesYTipo:", error);
    return null;
  }
};


export default generarDatosIngresosPorMesTipo;