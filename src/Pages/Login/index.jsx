import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../component/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
} from "@mui/material";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signIn(data)
      .then((res) => {
        login(res.data);
        navigate("/");
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Medi-eKart
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Medi-eKart Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              {...register("username")}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              {...register("password")}
              type="password"
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={3}
            >
              <Button variant="contained" color="primary" type="submit" sx={{ mr: 3 }}>
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
