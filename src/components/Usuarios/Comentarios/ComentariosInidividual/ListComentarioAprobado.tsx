"use client";

import React, { useEffect, useState } from "react";
import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import {
  buscarHabitacionPorNumero,
  obtenerHabitaciones,
} from "@/callBack/habitaciones/HabitacionesFetch";
import { Habitacion } from "@/components/Interfaces/HabitacionInterface";
import { BsSearch } from "react-icons/bs";
import CardHabitacionEstado from "./CardComentario";
import { Comentario } from "@/components/Interfaces/UserInterface";
import ErrorMessage from "@/components/Habitaciones/EditHabitacion/ErrorMessage";
import CardComentario from "./CardComentario";
import ErrorComment from "./ErrorComments";

interface ListaComentarioProps {
  funcionComentario: () => Promise<Comentario[]>;
  titulo: string;
}

const ListaComentario: React.FC<ListaComentarioProps> = ({
  funcionComentario,
  titulo,
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentarios = async () => {
      const comentariosData = await funcionComentario();
      setComentarios(comentariosData);
      setLoading(false);
    };

    fetchComentarios();
  }, [funcionComentario]);

  return (
    <div className="flex flex-col justify-around h-full w-full">
      {loading ? (
        <div>Cargando comentarios</div>
      ) : comentarios.length === 0 ? (
        <ErrorComment text={titulo}/>
      ) : (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-1 overflow-y-auto">
          <p className="text-md font-medium text-gray-700">{titulo}</p>

          {comentarios.map((comentario) => (
            <ListItem key={comentario.comment}>
              <CardComentario comentario={comentario} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListaComentario;
