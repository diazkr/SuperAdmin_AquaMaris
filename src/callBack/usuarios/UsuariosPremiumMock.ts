// interface UserMembership {
//     value: number;
//     percentage: number;
//   }
  
//   interface UserDataMembership {
//     totalUsers: number;
//     withMembership: UserMembership;
//     withoutMembership: UserMembership;
//   }
  
//   const generarDatosUsuariosMembresia = (rango: number): UserDataMembership => {
//     const totalUsers = Math.floor(Math.random() * 100) + 1;
//     const withMembershipValue = Math.floor(Math.random() * totalUsers);
//     const withoutMembershipValue = totalUsers - withMembershipValue;
  
//     const withMembershipPercentage = (withMembershipValue / totalUsers) * 100;
//     const withoutMembershipPercentage = (withoutMembershipValue / totalUsers) * 100;
  
//     return {
//       totalUsers: totalUsers,
//       withMembership: {
//         value: withMembershipValue,
//         percentage: withMembershipPercentage,
//       },
//       withoutMembership: {
//         value: withoutMembershipValue,
//         percentage: withoutMembershipPercentage,
//       },
//     };
//   };
  
//   
  
// utils/api.js

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/membership/percentage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ months: rangoMeses }),
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
