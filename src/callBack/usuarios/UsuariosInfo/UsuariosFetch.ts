// utils/api.ts

import { UserInterface } from "@/components/Interfaces/UserInterface";

export const obtenerUsuarios = async (): Promise<UserInterface[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user?limit=300`
    );
    if (!response.ok) {
      throw new Error("Error al obtener las habitaciones");
    }
    const data: UserInterface[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerHabitaciones:", error);
    return [];
  }
};

export const buscarUsuarioPorNombre = async (
  name: string
): Promise<UserInterface[] | null> => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/search/byName?name=${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al buscar la habitación por número");
    }
    const data: UserInterface[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en buscarHabitacionPorNumero:", error);
    return null;
  }
};
