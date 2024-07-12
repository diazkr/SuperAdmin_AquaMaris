export interface UserReservationsMes {
  mes: string;
  data: number;
}
const generarReservasMes = async (
  rangoMeses: number
): Promise<UserReservationsMes[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/forMonths?rango=${rangoMeses}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos de usuarios de reservaciones"
      );
    }

    const data: UserReservationsMes[] = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los datos de usuarios de reservaciones",
      error
    );
    return null;
  }
};

export default generarReservasMes;
