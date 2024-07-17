import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import CardHabitacion from "./CardHabitacion";
import ErrorMessage from "./ErrorMessage";
import {
  buscarHabitacionPorNumero,
  obtenerHabitaciones,
} from "@/callBack/habitaciones/HabitacionesFetch";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";
import { BsSearch } from "react-icons/bs";

const ListaHabitaciones: React.FC = () => {
  const [rooms, setRooms] = useState<Habitacion[]>([]);
  const [search, setSearch] = useState("");
  const [roomByNumber, setRoomByNumber] = useState<Habitacion | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    const roomsData = await obtenerHabitaciones();
    setRooms(roomsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    if (search) {
      const roomData = await buscarHabitacionPorNumero(parseInt(search));
      if (roomData) {
        setRoomByNumber(roomData);
      } else {
        setRoomByNumber(null);
      }
    } else {
      fetchRooms();
      setRoomByNumber(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-around h-full w-full">
      <div className="bg-light-white flex shadow-eco rounded-md p-6 w-[100%] gap-4">
        <TextField
          label="Buscar habitación por número"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-full"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          endIcon={<BsSearch />}
          className="px-12"
        >
          Buscar
        </Button>
      </div>

      {loading ? (
        <Typography>Cargando habitaciones...</Typography>
      ) : roomByNumber ? (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-3">
          <ListItem>
            <CardHabitacion habitacion={roomByNumber} onStateChange={fetchRooms} />
          </ListItem>
        </List>
      ) : rooms.length === 0 ? (
        <ErrorMessage />
      ) : (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-3 h-[70vh] overflow-y-auto">
          {rooms.map((room) => (
            <ListItem key={room.id}>
              <CardHabitacion habitacion={room} onStateChange={fetchRooms} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListaHabitaciones;
