"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import ListaComentario from "../ComentariosInidividual/ListComentarioAprobado";
import { obtenerComentariosAprobados, obtenerComentariosDenegados, obtenerComentariosRevision } from "@/callBack/usuarios/Comentarios/ComentariosFetch";

function ComentariosPageInfo() {
  const [actualizar, setActualizar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [actualizar]);

  const handleActualizarComentarios = () => {
    setLoading(true);
    setActualizar(!actualizar);
  };

  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="h-[40vh]">
            <ListaComentario
              funcionComentario={obtenerComentariosRevision}
              titulo="Comentarios en revisión"
              onComentarioActualizado={handleActualizarComentarios}
              actualizar={actualizar}
            />
          </div>

          <div className="flex gap-1 h-[40vh]">
            <div className="w-1/2">
              <ListaComentario
                funcionComentario={obtenerComentariosAprobados}
                titulo="Comentarios aprobados"
                onComentarioActualizado={handleActualizarComentarios}
                actualizar={actualizar}
              />
            </div>

            <div className="w-1/2">
              <ListaComentario
                funcionComentario={obtenerComentariosDenegados}
                titulo="Comentarios rechazados"
                onComentarioActualizado={handleActualizarComentarios}
                actualizar={actualizar}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ComentariosPageInfo;
