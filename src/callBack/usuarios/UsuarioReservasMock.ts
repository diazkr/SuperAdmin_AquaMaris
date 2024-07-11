interface UserBookings {
  value: number;
  percentage: number;
}

interface UserData {
  withBookings: UserBookings;
  withoutBookings: UserBookings;
}

 const generarDatosUsuariosReservas = (rango: number): UserData => {
  // Generar valores aleatorios para los datos de ejemplo
  const withBookingsValue = Math.floor(Math.random() * 1000);
  const withoutBookingsValue = Math.floor(Math.random() * 1000);
  const totalUsers = withBookingsValue + withoutBookingsValue;

  const withBookingsPercentage =
    totalUsers > 0 ? (withBookingsValue / totalUsers) * 100 : 0;
  const withoutBookingsPercentage =
    totalUsers > 0 ? (withoutBookingsValue / totalUsers) * 100 : 0;

  return {
    withBookings: {
      value: withBookingsValue,
      percentage: withBookingsPercentage,
    },
    withoutBookings: {
      value: withoutBookingsValue,
      percentage: withoutBookingsPercentage,
    },
  };
};
export default generarDatosUsuariosReservas;