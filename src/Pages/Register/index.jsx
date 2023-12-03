import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MEDOXER, PROVIDER, USER } from "../../constant";
import { signUp } from "../../api/auth";

export const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      type: USER,
    },
  });

  const onSubmit = (data) => {
    signUp(data)
      .then((res) => {
        toast.success("Register Successfully");
        navigate("/login");
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      mt={5}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            sx={{ mr: 5 }}
            label="First Name"
            {...register("firstName")}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ mr: 5 }}
            label="Last Name"
            {...register("lastName")}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ mr: 5 }}
            label="Username"
            {...register("username")}
            fullWidth
          />
        </Box>
        <Box Box mb={2}>
          <TextField
            label="Password"
            {...register("password")}
            type="password"
            fullWidth
          />
        </Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={getValues("type")}
            label="Type"
            onChange={(e) => setValue("type", e.target.value)}
          >
            <MenuItem value={USER}>User</MenuItem>
            <MenuItem value={MEDOXER}>Medoxer</MenuItem>
            <MenuItem value={PROVIDER}>Provider</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Button
            sx={{ mr: 3 }}
            onClick={() => navigate("/register")}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};
