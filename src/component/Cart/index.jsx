import React from "react";
import {
  Modal,
  Fade,
  Typography,
  IconButton,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../CartContext";

const CartModal = ({ open, onClose, cartItems }) => {
  const { updateCartItem, removeFromCart } = useCart();
	
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handleQuantityChange = (_id, newQuantity) => {
    updateCartItem(_id, newQuantity);
  };

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

            <CardContent>
              <Typography variant="h5" gutterBottom>
                Shopping Cart
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            -
                          </IconButton>
                          {item.quantity}
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </IconButton>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          ${item.price.toFixed(2) * item.quantity}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeFromCart(item._id)}>
                            Remove
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" color="textSecondary" marginTop={2}>
                Total Price: ${calculateTotalPrice()}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => console.log("Checkout")}
                fullWidth
                marginTop={2}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};

export default CartModal;
