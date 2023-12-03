import React from "react";
import {
  Typography,
  IconButton,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useCart } from "../CartContext";

export const CartContent = ({ cartItems }) => {
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
    <CardContent className="center">
      <TableContainer style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Product</TableCell>
              <TableCell style={{ textAlign: "center" }}>Quantity</TableCell>
              <TableCell style={{ textAlign: "center" }}>Price</TableCell>
              <TableCell style={{ textAlign: "center" }}>Total</TableCell>
              <TableCell style={{ textAlign: "center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems?.map((item) => (
              <TableRow key={item._id}>
                <TableCell style={{ textAlign: "center" }}>{item.name}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
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
                <TableCell style={{ textAlign: "center" }}>${item.price.toFixed(2)}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => removeFromCart(item._id)}
                    color="error"
                    variant="contained"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" color="textSecondary" marginTop={2}>
        Total Price: ${calculateTotalPrice()}
      </Typography>
    </CardContent>
  );
};
