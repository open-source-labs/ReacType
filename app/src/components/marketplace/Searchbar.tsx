import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = () => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      style={{ maxWidth: 450, height: '10px' }}
    />
  );
};

export default SearchBar;
