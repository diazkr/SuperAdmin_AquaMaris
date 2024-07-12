import { PromoCodeInterface } from "./GetAllPromos";

const getPromoByCode = async (code: string): Promise<PromoCodeInterface | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/promotion/${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener el código de descuento");
    }

    const data: PromoCodeInterface = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el código de descuento", error);
    return null;
  }
};

export default getPromoByCode;
