// utils/api.ts
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";

interface HabitacionesResponse {
    totalPages: number;
    allRooms: Habitacion[];
  }

export const obtenerHabitaciones = async (): Promise<Habitacion[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
    if (!response.ok) {
      throw new Error("Error al obtener las habitaciones");
    }
    const data: HabitacionesResponse = await response.json();
    return data.allRooms;
  } catch (error) {
    console.error("Error en obtenerHabitaciones:", error);
    return [];
  }
};

export const buscarHabitacionPorNumero = async (numero: number): Promise<Habitacion | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/roomByNum/${numero}`);
    if (!response.ok) {
      throw new Error("Error al buscar la habitación por número");
    }
    const data: Habitacion = await response.json();
    return data;
  } catch (error) {
    console.error("Error en buscarHabitacionPorNumero:", error);
    return null;
  }
};
