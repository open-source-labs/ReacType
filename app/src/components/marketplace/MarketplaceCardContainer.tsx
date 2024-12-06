/* eslint-disable max-len */
import { Container, Grid } from '@mui/material';

import React from 'react';
import MarketplaceCard from './MarketplaceCard';

/**
 * `MarketplaceCardContainer` is a React component that renders a container for `MarketplaceCard` components.
 * It organizes project cards into a responsive grid layout. Each project is represented by a `MarketplaceCard` which
 * displays the project's details and interactions such as cloning and opening.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array<Object>} props.displayProjects - An array of project objects to display. Each object contains details
 * necessary for the `MarketplaceCard` component to function properly.
 *
 * @returns {JSX.Element} - A container that organizes project cards into a grid layout for display in the UI.
 */
const MarketplaceCardContainer = ({ displayProjects }): JSX.Element => {
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
            <Grid item xs={4} sm={4} md={4} key={proj._id}>
              <MarketplaceCard proj={proj} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MarketplaceCardContainer;
