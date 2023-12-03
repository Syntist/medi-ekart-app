import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MEDOXER, PROVIDER, USER } from "../../constant";
import { approveMedicine, unapproveMedicine } from "../../api/medoxer";
import { toast } from "react-toastify";
import { useCart } from "../CartContext";

const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPYpOCdPHpeQtW_uuBplKdKyIc1KpQde_63XyxpI3mucQkfh-9VuP4jys5xk9yxrzcRXE&usqp=CAU";

const ProductCard = ({ product, refetch }) => {
  const { addToCart, cartItems } = useCart();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="200"
        image={product.imageUrl || url}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {product.manufacturer}
        </Typography>
        {/* Add more details as needed */}
        <Typography variant="body2" component="p">
          {product.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Stock: {product.stock}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Prescription Required: {product.prescriptionRequired ? "Yes" : "No"}
        </Typography>
        {user.type === USER &&
          !cartItems.find((item) => item._id === product._id) && (
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button onClick={() => addToCart(product)} variant="contained">
                Add to Cart
              </Button>
            </Box>
          )}
        {user.type === PROVIDER && pathname.includes(PROVIDER) && (
          <>
            <Typography variant="body2" color="textSecondary">
              Approved: {product.approved ? "Yes" : "No"}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(`/provider/edit/${product._id}`)}
            >
              Edit
            </Button>
          </>
        )}

        {user.type === MEDOXER && pathname.includes(MEDOXER) && (
          <Box mt={1}>
            {product.approved ? (
              <Button
                onClick={() => {
                  unapproveMedicine(product._id).then((res) => {
                    toast.success(`${res.data.name} has been Unapproved`);
                    refetch((prev) => !prev);
                  });
                }}
                color="error"
                variant="contained"
              >
                Unapprove
              </Button>
            ) : (
              <Button
                onClick={() => {
                  approveMedicine(product._id).then((res) => {
                    toast.success(`${res.data.name} has been Approved`);
                    refetch((prev) => !prev);
                  });
                }}
                variant="contained"
              >
                Approve
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
