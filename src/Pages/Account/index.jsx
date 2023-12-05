import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MEDOXER, PROVIDER, USER } from "../../constant";
import { getUser, updateUser } from "../../api/user";
import { getValue } from "@testing-library/user-event/dist/utils";
import { useAuth } from "../../component/AuthContext";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState();
  const { register, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      type: USER,
    },
  });

  const onSubmit = (data) => {
    updateUser(data)
      .then((res) => {
        if (!res.data.authorized) {
          logout();
          navigate("/");
          toast.success("Information Updated, Authorization Required to Login");
        }
        reset(res.data);
        setUser(res.data);
        toast.success("Information Updated");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser().then((res) => {
      reset(res.data);
      setUser(res.data);
    });
  }, []);

  if (user)
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              defaultValue={getValues("type")}
              onChange={(e) => setValue("type", e.target.value)}
              {...register("type")}
            >
              <MenuItem value={USER}>User</MenuItem>
              <MenuItem value={MEDOXER}>Medoxer</MenuItem>
              <MenuItem value={PROVIDER}>Provider</MenuItem>
            </Select>
          </FormControl>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <Button sx={{ mr: 3 }} variant="contained" type="submit">
              Update Account
            </Button>
          </Box>
        </form>
      </Box>
    );
};
