"use client";

import React, { useEffect, useState } from "react";
import { List, ListItem, CircularProgress } from "@mui/material";
import { Comentario } from "@/components/Interfaces/UserInterface";
import CardComentario from "./CardComentario";
import ErrorComment from "./ErrorComments";

interface ListaComentarioProps {
  funcionComentario: () => Promise<Comentario[]>;
  titulo: string;
  onComentarioActualizado: () => void;
  actualizar: boolean;
}

const ListaComentario: React.FC<ListaComentarioProps> = ({
  funcionComentario,
  titulo,
  onComentarioActualizado,
  actualizar,
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComentarios = async () => {
    setLoading(true);
    const comentariosData = await funcionComentario();
    setComentarios(comentariosData);
    setLoading(false);
  };

  useEffect(() => {
    fetchComentarios();
  }, [funcionComentario, actualizar]);

  return (
    <div className="flex flex-col justify-around h-full w-full">
      {loading ? (
        <div className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-1 overflow-y-auto h-full justify-center items-center">
          <CircularProgress />
        </div>
      ) : comentarios.length === 0 ? (
        <ErrorComment text={titulo} />
      ) : (
        <List className="bg-light-white flex flex-col shadow-eco rounded-md p-6 w-[100%] my-1 overflow-y-auto h-full">
          <p className="text-md font-medium text-gray-700">{titulo}</p>

          {comentarios.map((comentario) => (
            <ListItem key={comentario.id}>
              <CardComentario comentario={comentario} onComentarioActualizado={onComentarioActualizado} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListaComentario;
