import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
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
        <Box
          sx={{
            marginBottom: "10px",
            textTransform: "uppercase"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textTransform: "none",
              fontWeight: "500"
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {product.description}
          </Typography>
          <Typography variant="caption">
            &nbsp; - &nbsp;
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {product.manufacturer}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          {/* Add more details as needed */}
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "0",

              "p": {
                marginTop: "5px",
                marginBottom: "5px",
              }
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 500}}>
              Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 500}}>
              Prescription Required: {product.prescriptionRequired ? "Yes" : "No"}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "0",
              textAlign: "right",
              backgroundColor: "#f7f7f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              borderLeft: "2px solid green"
            }}
          >
            <Typography
              variant="h6"
            >
              ${product.price}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "20px"
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#ececec",
              borderRadius: "99px",
              position: "relative",
              height: "3px",
            }}
          >
            <Box
              color="textPrimary"
              sx={{
                position: "absolute",
                left: "0",
                top: "0",
                height: "100%",
                borderRadius: "inherit",
                width: product.stock / 10 + '%',
                backgroundColor: "green",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
              marginTop: "5px"
            }}
          >
            <Typography
              variant="caption"
              color="textSecondary"
            >
              AVAILABLE: <Typography variant="caption" color="textPrimary">{product.stock}</Typography>
            </Typography>
          </Box>
        </Box>
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
