import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard'; // Adjust the path based on your project structure

const ProductGrid = ({ products, addToCart, refetch }) => {
  return (
    <Grid p={3} container spacing={3}>
      {products?.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} refetch={refetch} addToCart={addToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;