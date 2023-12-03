import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../component/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signIn(data)
      .then((res) => login(res.data))
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
        <TextField sx={{ mr: 5 }} label="Username" {...register("username")} />
        <TextField label="Password" {...register("password")} type="password" />
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Button sx={{ mr: 3 }} variant="contained" type="submit">
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};
