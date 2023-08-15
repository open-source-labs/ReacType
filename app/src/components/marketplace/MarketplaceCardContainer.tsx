import { Container, Grid } from '@mui/material';

import MarketplaceCard from './MarketplaceCard';
import React from 'react';

const MarketplaceCardContainer = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Container>
        <Grid
          container
          maxWidth={'1260px'}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {numbers.map((num) => (
            <Grid item xs={4} sm={4} md={4} key={num}>
              <MarketplaceCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MarketplaceCardContainer;
