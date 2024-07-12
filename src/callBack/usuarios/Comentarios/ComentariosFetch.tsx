// utils/api.ts

import { Comentario } from "@/components/Interfaces/UserInterface";



export const obtenerComentariosAprobados = async (): Promise<Comentario[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`);
    if (!response.ok) {
      throw new Error("Error al obtener las habitaciones");
    }
    const data: Comentario[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerHabitaciones:", error);
    return [];
  }
};

export const obtenerComentariosRevision = async (): Promise<Comentario[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`);
      if (!response.ok) {
        throw new Error("Error al obtener las habitaciones");
      }
      const data: Comentario[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error en obtenerHabitaciones:", error);
      return [];
    }
  };

  export const obtenerComentariosDenegados = async (): Promise<Comentario[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`);
      if (!response.ok) {
        throw new Error("Error al obtener las habitaciones");
      }
      const data: Comentario[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error en obtenerHabitaciones:", error);
      return [];
    }
  };