import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";

const ProductForm = ({ initialValue, onSubmit }) => {
  const [file, setFile] = useState(initialValue?.imageUrl);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      ...initialValue,
      expiryDate:
        initialValue?.expiryDate &&
        new Date(initialValue?.expiryDate).toISOString().split("T")[0],
    },
    mode: "onChange",
  });

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Container
      sx={{
        paddingTop: "44px",
        paddingBottom: "44px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "0",

              "img": {
                width: "100%",
                height: "auto"
              }
            }}
          >
            {file ? (
              <img
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                height={100}
                width={100}
                alt=""
              /> 
            ) :
              <Box
                sx={{
                  lineHeight: "0",
                  textAlign: "center",

                  ".MuiSvgIcon-root": {
                    width: "200px",
                    height: "200px"
                  }
                }}
              >
                <ImageIcon />
              </Box>
            }
          </Box>
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "0"
            }}
          >
            <Box marginBottom="16px">
              <TextField
                label="Name"
                fullWidth
                {...register("name", { required: "This field is required" })}
              />
            </Box>
            <Box marginBottom="16px">
              <TextField
                label="Manufacturer"
                fullWidth
                {...register("manufacturer", {
                  required: "This field is required",
                })}
              />
            </Box>
            <Box marginBottom="16px">
              <TextField
                label="Description"
                fullWidth
                {...register("description")}
              />
            </Box>
            <Box marginBottom="16px">
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
            <Box marginBottom="16px">
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
            <Box marginBottom="16px">
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
            <Box marginBottom="16px">
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                  setValue("imageUrl", file);
                }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
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
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default ProductForm;
