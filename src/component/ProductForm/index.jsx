import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ProductForm = ({ initialValue, onSubmit }) => {
  const [file, setFile] = useState(initialValue?.imageUrl);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialValue,
    mode: "onChange",
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width="300px" marginBottom="16px">
          <TextField
            label="Name"
            fullWidth
            {...register("name", { required: "This field is required" })}
          />
        </Box>
        <Box width="300px" marginBottom="16px">
          <TextField
            label="Manufacturer"
            fullWidth
            {...register("manufacturer", {
              required: "This field is required",
            })}
          />
        </Box>
        <Box width="300px" marginBottom="16px">
          <TextField
            label="Description"
            fullWidth
            {...register("description")}
          />
        </Box>
        <Box width="300px" marginBottom="16px">
          <TextField
            label="Price"
            type="number"
            fullWidth
            {...register("price", {
              required: "This field is required",
              min: 0,
            })}
          />
        </Box>
        <Box width="300px" marginBottom="16px">
          <TextField
            label="Stock"
            type="number"
            fullWidth
            {...register("stock", {
              required: "This field is required",
              min: 0,
            })}
          />
        </Box>
        <Box width="300px" marginBottom="16px">
          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            {...register("expiryDate", { required: "This field is required" })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box width="300px" marginBottom="16px">
          {file && (
            <img
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              height={100}
              width={100}
              alt=""
            />
          )}
          <TextField
            fullWidth
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              setValue("imageUrl", file);
            }}
          />
        </Box>
        <Box marginBottom="16px">
          <FormControlLabel
            control={<Checkbox {...register("prescriptionRequired")} />}
            label="Prescription Required"
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
