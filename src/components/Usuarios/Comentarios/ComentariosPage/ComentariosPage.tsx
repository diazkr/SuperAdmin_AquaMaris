"use client";
import React, { useState } from "react";
import ListaComentario from "../ComentariosInidividual/ListComentarioAprobado";
import { obtenerComentariosAprobados, obtenerComentariosDenegados, obtenerComentariosRevision } from "@/callBack/usuarios/Comentarios/ComentariosFetch";

function ComentariosPageInfo() {
  return (
    <div className=" flex flex-col">
      <div className="h-[40vh]">
        <ListaComentario funcionComentario={obtenerComentariosRevision} titulo="Comentarios en revisión" />
      </div>

      <div className="flex gap-1 h-[40vh]">
        <div>
          <ListaComentario funcionComentario={obtenerComentariosAprobados} titulo="Comentarios aprobados" />
        </div>

        <div>
          <ListaComentario funcionComentario={obtenerComentariosDenegados} titulo="Comentarios rechazados" />
        </div>
      </div>
    </div>
  );
}

export default ComentariosPageInfo;
