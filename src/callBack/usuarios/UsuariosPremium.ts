

export interface MembershipData {
  withMembership: {
    percentage: number;
    value: number;
  };
  withoutMembership: {
    percentage: number;
    value: number;
  };
}

 const generarDatosUsuariosMembresia = async (rangoMeses:number): Promise<MembershipData | null> => {
  try {
    const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/membership/percentage?months=${rangoMeses}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 

      }
    });
    if (!response.ok) {
      throw new Error("Error al obtener los datos de usuarios de membresía");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerDatosUsuariosMembresia:", error);
    return null;
  }
};


export default generarDatosUsuariosMembresia;
