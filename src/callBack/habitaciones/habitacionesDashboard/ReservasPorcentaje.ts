export interface UserReservations {
  type: string;
  data: number;
}
const generarReservasPorcentaje = async (rangoMeses: number): Promise<UserReservations[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/forMonths/typeRoom/porcent?rango=${rangoMeses}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de usuarios de reservaciones");
    }

    const data: UserReservations[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos de usuarios de reservaciones", error);
    return null;
  }
};


export default generarReservasPorcentaje;