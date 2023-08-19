import { Container, Grid } from '@mui/material';

import MarketplaceCard from './MarketplaceCard';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MarketplaceCardContainer = () => {

  const [marketplaceProjects, setMarketplaceProjects] = useState([]);
  useEffect(() => {
    async function marketplaceFetch() {
      try {
        const response = await axios.get('/getMarketplaceProjects', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        setMarketplaceProjects(response.data);
    
      } catch (error) {
        console.error('Error fetching MP data:', error);
      }
    }
    marketplaceFetch();
    
  }, []);
  
  return (
    <>
      <Container>
        <Grid
          container
          maxWidth={'1260px'}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {marketplaceProjects.map((proj, i) => (

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
