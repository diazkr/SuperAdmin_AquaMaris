interface UserBookings {
  value: number;
  percentage: number;
}

 export interface UserData {
  totalUsers: number;
  withBookings: UserBookings;
  withoutBookings: UserBookings;
}

const generarDatosUsuariosReservas = async (rangoMeses: number): Promise<UserData | null> => {
  try {
    const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/booking/percentage?months=${rangoMeses}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 

      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de usuarios de reservaciones");
    }

    const data: UserData = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos de usuarios de reservaciones", error);
    return null;
  }
};


export default generarDatosUsuariosReservas