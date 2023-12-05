import React from "react";
import {
  Modal,
  Fade,
  Typography,
  IconButton,
  Card,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { CartContent } from "./CartContent";

const CartModal = ({ open, onClose, cartItems }) => {
  const navigate = useNavigate();

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80%",
          }}
        >
          <Card>
            <IconButton
              onClick={onClose}
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography mt={2} ml={3} variant="h5" gutterBottom>
              Shopping Cart
            </Typography>
            <CartContent cartItems={cartItems} />
            {cartItems.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{ width: "50%", mb: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </Box>
            )}
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};

export default CartModal;
