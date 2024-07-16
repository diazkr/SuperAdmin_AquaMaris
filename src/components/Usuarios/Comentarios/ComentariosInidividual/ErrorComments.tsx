import { Typography } from '@mui/material';
import React from 'react';
import { MdErrorOutline } from "react-icons/md";

interface ErrorCommentProps {
  text: string;
}

const ErrorComment: React.FC<ErrorCommentProps> = ({ text }) => {
  return (
    <div className='h-full bg-white flex rounded-xl shadow-lg my-2 py-6 w-[100%]'>
      <div className='text-gray-400 flex flex-col items-center gap-2 px-6'>
        <Typography className='text-gray-500 text-center'>
          Por el momento no hay {text}
        </Typography>
      </div>
    </div>
  );
};

export default ErrorComment;
