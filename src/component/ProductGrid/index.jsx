import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard'; // Adjust the path based on your project structure
import { Container } from '@mui/material';

const ProductGrid = ({ products, addToCart, refetch }) => {
  return (
    <Container maxWidth="xl">
      <Grid pt={5} pb={5} container spacing={3}>
        {products?.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} xl={3}>
            <ProductCard product={product} refetch={refetch} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;