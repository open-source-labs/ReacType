import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ContextDropDown({ contextList }) {
  // const [context]
  console.log(contextList);
  const [currentContext, setCurrentContext] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentContext(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Context</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentContext}
          label="Current Context"
          onChange={handleChange}
        >
          {
            // contextList.map(el => {
            //   <MenuItem value={el.name}>{el.name}</MenuItem>;
            // })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
