// CheckoutPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useCart } from "../../component/CartContext";
import { CartContent } from "../../component/Cart/CartContent";
import { uploadImage } from "../../utils/cloudinary";
import { createOrder } from "../../api/user";
import { toast } from "react-toastify";

const insuranceCompanies = [
  "None",
  "Health insurance companies",
  "Cigna",
  "Humana",
  "Aetna",
];

export const Checkout = () => {
  const { register, handleSubmit, setValue, watch } = useForm({
    mode: "onChange",
  });
  const [file, setFile] = useState();

  const { cartItems } = useCart();

  const insuranceExist =
    watch().insuranceCompany &&
    watch().insuranceCompany !== insuranceCompanies[0];

  const onSubmit = async (data) => {
    let prescriptionUrl = data.prescriptionUrl;
    if (typeof data.prescriptionUrl === "object") {
      prescriptionUrl = await uploadImage(data.prescriptionUrl);
    }

    const medicines = cartItems.map((item) => ({
      medicineId: item._id,
      quantity: item.quantity,
    }));

    createOrder({
      ...data,
      medicines,
      prescriptionUrl,
      insuranceCompany:
        data.insuranceCompany !== insuranceCompanies[0]
          ? data.insuranceCompany
          : undefined,
    })
      .then((res) => {
        window.location = res.data?.url;
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>

      <CartContent cartItems={cartItems} discount={insuranceExist} />
      {/* Checkout Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Address"
          fullWidth
          {...register("address", { required: true })}
          margin="normal"
        />
        <TextField
          label="Phone Number"
          fullWidth
          {...register("phoneNumber", { required: true })}
          margin="normal"
        />
        <TextField
          label="Zip Code"
          fullWidth
          {...register("zipCode", { required: true })}
          margin="normal"
        />
        <TextField
          label="City"
          fullWidth
          {...register("city", { required: true })}
          margin="normal"
        />
        <TextField
          label="State"
          fullWidth
          {...register("state", { required: true })}
          margin="normal"
        />

        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-label">
            Insurance Company
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            {...register("insuranceCompany")}
            id="demo-simple-select"
            defaultValue={insuranceCompanies[0]}
            label="Insurance Company"
            fullWidth
          >
            {insuranceCompanies.map((company, index) => (
              <MenuItem key={index} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {insuranceExist && (
          <TextField
            label="Policy Number"
            fullWidth
            {...register("policyNumber")}
            margin="normal"
          />
        )}

        <Box width="300px" mt={2} marginBottom="16px">
          <TextField
            fullWidth
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setValue("prescriptionUrl", selectedFile);
            }}
          />

          {file && (
            <img
              src={URL.createObjectURL(file)}
              height={100}
              width={100}
              alt="Prescription"
              style={{ marginTop: "8px" }}
            />
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          marginTop={2}
        >
          Checkout
        </Button>
      </form>
    </div>
  );
};
