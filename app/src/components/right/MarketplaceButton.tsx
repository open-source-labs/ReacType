import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import the Link component
import React from 'react';

const MarketplaceButton = () => {
  return (
    <Link to="/marketplace" style={{ textDecoration: 'none' }}>
      <Button>Marketplace</Button>
    </Link>
  );
};

export default MarketplaceButton;
