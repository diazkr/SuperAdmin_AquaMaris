// Definición de la interfaz PromoCodeInterface
export interface PromoCodeInterface {
    id: string;
    code: string;
    description: string;
    percentage: number;
    available_uses: number;
    state: string;
  }
  
  const generarTodosLosPromoCode = async (): Promise<PromoCodeInterface[] | null> => {
    try {
      const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promotion`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`, 

          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener los códigos de descuento");
      }
  
      const data: PromoCodeInterface[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los códigos de descuento", error);
      return null;
    }
  };
  
  export default generarTodosLosPromoCode;
  