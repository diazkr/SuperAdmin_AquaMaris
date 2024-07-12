"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { MultiValue } from "react-select";
import { Button, TextField, MenuItem, Grid, Box } from "@mui/material";
import { Habitacion, HabitacionError } from "../../Interfaces/HabitacionInterface";
import { validateRegister } from "../../helpers/validate";
import ConfirmationDialog from "./ConfirmationDialog";

const CreateRoom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoomId, setNewRoomId] = useState('');

  const [habitacion, setHabitacion] = useState<Habitacion>({
    id: "",
    type: "",
    price: 0,
    description: "",
    state: "",
    images: [],
    roomNumber: 0,
    services: [],
  });

  const [errorsForm, setErrorsForm] = useState<HabitacionError>({
    id: "",
    type: "",
    price: "",
    description: "",
    state: "",
    images: "",
    roomNumber: "",
    services: "",
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [urls, setUrls] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{ value: string; label: string }>>([]);

  const options = [
    { value: "wifi", label: "WiFi" },
    { value: "television", label: "Televisión" },
    { value: "seaView", label: "Vista al Mar" },
    { value: "airConditioning", label: "Aire Acondicionado" },
    { value: "heater", label: "Calefacción" },
    { value: "safeBox", label: "Caja Fuerte" },
    { value: "parking", label: "Estacionamiento" },
    { value: "fridge", label: "Refrigerador" },
    { value: "breakfast", label: "Desayuno" },
    { value: "jacuzzi", label: "Jacuzzi" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, ...roomDataWithoutId } = habitacion;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomDataWithoutId),
      });
      if (response.ok) {
        const responseData = await response.json();
        setNewRoomId(responseData.id);
        setOpenDialog(true);
      } else {
        console.error("Error al enviar la habitación al servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleChangeServicies = (selected: MultiValue<{ value: string; label: string }>) => {
    setTouched((prevState) => ({ ...prevState, services: true }));
    setHabitacion((prevState) => ({
      ...prevState,
      services: selected.map((option) => option.value),
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHabitacion((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "roomNumber" ? Number(value) : value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prevState) => ({ ...prevState, [name]: true }));
  };

  useEffect(() => {
    const errors = validateRegister(habitacion);
    setErrorsForm(errors);
  }, [habitacion]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    setOpenDialog(false);
    window.location.href = `https://front-pfg-6.vercel.app/rooms/${newRoomId}`;
};

  return (
    <>
      <form onSubmit={handleSubmit} className="w-[90%] mx-auto mt-10 p-6">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Tipo de habitación"
              name="type"
              value={habitacion.type}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={Boolean(touched.type && errorsForm.type)}
              helperText={touched.type && errorsForm.type}
              variant="outlined"
              margin="normal"
              style={{ color: "rgb(81,161,168)" }}
            >
              <MenuItem value="standard">Estandar</MenuItem>
              <MenuItem value="double">Doble</MenuItem>
              <MenuItem value="deluxe">Delux</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
              <MenuItem value="family">Familiar</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Precio"
              name="price"
              value={habitacion.price}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={Boolean(touched.price && errorsForm.price)}
              helperText={touched.price && errorsForm.price}
              variant="outlined"
              margin="normal"
              style={{ color: "rgb(81,161,168)" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción"
              name="description"
              value={habitacion.description}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              multiline
              error={Boolean(touched.description && errorsForm.description)}
              helperText={touched.description && errorsForm.description}
              variant="outlined"
              margin="normal"
              style={{ color: "rgb(81,161,168)" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Estado"
              name="state"
              value={habitacion.state}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={Boolean(touched.state && errorsForm.state)}
              helperText={touched.state && errorsForm.state}
              variant="outlined"
              margin="normal"
              style={{ color: "rgb(81,161,168)" }}
            >
              <MenuItem value="">Selecciona</MenuItem>
              <MenuItem value="available">Disponible</MenuItem>
              <MenuItem value="inmaintenance">No disponible</MenuItem>
              <MenuItem value="occupied">Ocupado</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Número de habitación"
              name="roomNumber"
              value={habitacion.roomNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={Boolean(touched.roomNumber && errorsForm.roomNumber)}
              helperText={touched.roomNumber && errorsForm.roomNumber}
              variant="outlined"
              margin="normal"
              style={{ color: "rgb(81,161,168)" }}
            >
              <MenuItem value="">Selecciona un número</MenuItem>
              <MenuItem value={101}>101</MenuItem>
              <MenuItem value={102}>102</MenuItem>
              <MenuItem value={103}>103</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <label
              htmlFor="services"
              className="block text-gray-700 font-bold mb-2"
              style={{ color: "rgb(81,161,168)", marginBottom: "1rem" }}
            >
              Servicios:
            </label>
            <Select
              isMulti
              value={options.filter((option) =>
                habitacion.services.includes(option.value)
              )}
              onChange={handleChangeServicies}
              options={options}
              className="basic-multi-select p-2 border border-gray-300 rounded-md"
              classNamePrefix="select"
              placeholder="Selecciona servicios..."
              onBlur={() => setTouched((prevState) => ({ ...prevState, services: true }))}
            />
            {touched.services && errorsForm.services && (
              <p className="text-red-900 text-sm px-3">{errorsForm.services}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            <h1
              className="block text-gray-700 font-bold mb-2"
              style={{ color: "rgb(81,161,168)", marginBottom: "1rem" }}
            >
              Subir imágenes
            </h1>
            <section>
              <CldUploadWidget
                uploadPreset="upload_default"
                onSuccess={(cldResponse: any) => {
                  setTouched((prevState) => ({ ...prevState, images: true }));
                  setHabitacion((prevState) => ({
                    ...prevState,
                    images: [...prevState.images, cldResponse.info?.secure_url],
                  }));
                  setUrls((prevUrls) => [
                    ...prevUrls,
                    cldResponse.info?.secure_url,
                  ]);
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 flex flex-col items-center justify-center mb-6"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        open();
                      }}
                    >
                      <p className="text-lg font-bold mb-2">Subir una imagen</p>
                      <p className="text-sm mb-1">Upload a File</p>
                      <p className="text-xs text-gray-600">
                        Drag and drop files here
                      </p>
                    </div>
                  );
                }}
              </CldUploadWidget>
              <div className="mt-6 flex flex-wrap gap-4">
                {urls.map((url) => (
                  <img
                    src={url}
                    width={150}
                    height={150}
                    alt="imagen desde cloudinary"
                    key={url}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
              {touched.images && errorsForm.images && (
                <p className="text-red-900 text-sm px-3">{errorsForm.images}</p>
              )}
            </section>
          </Grid>

          <Grid item xs={12}>
            <div className="flex justify-center items-center w-[100%]">
              <Button type="submit" variant="contained" disabled={loading}>
                Crear Habitación
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <ConfirmationDialog open={openDialog} onClose={handleDialogClose} onConfirm={handleConfirm} />
    </>
  );
};

export default CreateRoom;
