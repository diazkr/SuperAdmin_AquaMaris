import { Typography } from '@mui/material'
import React from 'react'
import { MdErrorOutline } from "react-icons/md";


function ErrorMessage() {
  return (
    <div className='h-full bg-white flex justify-center rounded-xl shadow-lg my-2 py-6'>
      <div className='text-gray-300 flex flex-col justify-center items-center gap-2'>
        <div className='text-8xl '><MdErrorOutline />
        </div>
        <p className='text-gray-500 text-center'>Ups... Por el momento no más hay información disponible con esas especificaciones</p>
    </div>

    </div>
    
  )
}

export default ErrorMessage