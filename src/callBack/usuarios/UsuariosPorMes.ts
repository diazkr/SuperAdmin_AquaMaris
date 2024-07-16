export interface UserDataMes {
  month: string;
  count: number;
}

const generarDatosUsuariosMes = async (
  rangoMeses: number
): Promise<UserDataMes[] | null> => {
  try {
    const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/registered/months?months=${rangoMeses}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, 

        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos de usuarios registrados por mes"
      );
    }

    const data: UserDataMes[] = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los datos de usuarios registrados por mes",
      error
    );
    return null;
  }
};

export default generarDatosUsuariosMes;
