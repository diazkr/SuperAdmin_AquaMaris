"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { UserInterface } from "../Interfaces/UserInterface";
import { buscarUsuarioPorNombre, obtenerUsuarios } from "@/callBack/usuarios/UsuariosInfo/UsuariosFetch";
import { BsSearch } from "react-icons/bs";
import CardUsuario from "./CardUsuario";
import ErrorMessage from "../Habitaciones/EditHabitacion/ErrorMessage";

const ListaUsuario: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const usersData = await obtenerUsuarios();
    setUsers(usersData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    if (search) {
      const userData = await buscarUsuarioPorNombre(search);
      if (userData) {
        setUsers(userData);
      } else {
        return (
          <div>No hay usuarios con ese nombre</div>
        )
      }
    } else {
      await fetchUsers();
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-around h-full w-full">
      <div className="bg-light-white flex shadow-eco rounded-md p-6 w-[100%] gap-4">
        <TextField
          label="Buscar usuario por nombre"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-full"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          endIcon={<BsSearch/>}
          className="px-12"
        >
          Buscar
        </Button>
      </div>

      {loading ? (
        <Typography>Cargando usuarios...</Typography>
      ) : users.length === 0 ? (
        <ErrorMessage />
      ) : (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-3 h-[70vh] overflow-y-auto">
          {users.map((user) => (
            <ListItem key={user.id}>
              <CardUsuario user={user} reloadUsers={fetchUsers} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListaUsuario;
