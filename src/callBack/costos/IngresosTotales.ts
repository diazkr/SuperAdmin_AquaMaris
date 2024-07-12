export interface DatosIngresos {
  mes: string;
  data: number;
}

const generarDatosIngresosPorMes = async (
  rangoMeses: number
): Promise<DatosIngresos[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/timeRevenue?rango=${rangoMeses}`,
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

export default generarDatosIngresosPorMes;

// const generarDatosIngresos = (rango: number): DatosIngresos[] => {
//   const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
//   const hoy = new Date();
//   let datos: DatosIngresos[] = [];

//   for (let i = rango - 1; i >= 0; i--) {
//     let fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
//     let mes = meses[fecha.getMonth()];
//     let ingreso = Math.floor(Math.random() * 500000) + 50000; // Genera ingresos aleatorios entre 50,000 y 550,000
//     datos.push({ mes: mes, data: ingreso });
//   }

//   return datos;
// };
