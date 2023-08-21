import { Container, Grid } from '@mui/material';

import MarketplaceCard from './MarketplaceCard';
import React from 'react';


const MarketplaceCardContainer = ({displayProjects}) => {


  return (
    <>
      <Container>
        <Grid
          container
          maxWidth={'1260px'}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {displayProjects.map((proj, i) => (

            <Grid item xs={4} sm={4} md={4} key={i}>
              <MarketplaceCard proj={proj}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MarketplaceCardContainer;
