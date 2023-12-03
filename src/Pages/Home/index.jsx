import React, { useEffect, useState } from "react";
import { getMedicinesUser } from "../../api/user";
import ProductGrid from "../../component/ProductGrid";
import { Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "../../component/Cart";
import { useCart } from "../../component/CartContext";

export const Home = () => {
  const { cartItems, updateCartItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [medicines, setMedicines] = useState();

  useEffect(() => {
    getMedicinesUser()
      .then((res) => setMedicines(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ProductGrid products={medicines} />

      <Fab
        color="primary"
        aria-label="open-cart"
        onClick={() => setIsCartOpen(true)}
        style={{ position: "fixed", bottom: 16, left: 16 }}
      >
        <ShoppingCartIcon />
      </Fab>

      {/* Cart modal */}
      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateCartItem={updateCartItem}
      />
    </>
  );
};
