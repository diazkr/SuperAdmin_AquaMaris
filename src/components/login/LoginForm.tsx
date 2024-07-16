"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginButton from "./LogginButton";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      borderRadius={2}
      className="w-[80%]"
    >
      <div>
        <Image src="/logos/iconoA.svg" alt="" width={70} height={70} />
      </div>
      <Typography variant="h5" component="div" gutterBottom className="text-[#175358]">
        Panel de administrador
      </Typography>
      <TextField
        label="correo@example.com"
        variant="outlined"
        margin="normal"
        fullWidth
        className="shadow-md bg-white"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        className="shadow-md bg-white"
        label="Contraseña"
        variant="outlined"
        margin="normal"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoginButton email={email} password={password} />
    </Box>
  );
};

export default LoginForm;
