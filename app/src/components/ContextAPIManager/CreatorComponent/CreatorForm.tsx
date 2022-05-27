//context stored in an object
//it will have another object within to hold the key contextInput pairs

import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';

import ContextTable from './ContextTable';


const filter = createFilterOptions();

const contextArr = [
  {
    name : 'theme',
    contextInputs: [
      {key: 'dark', contextInput: 'black'},
      {key: 'light', contextInput: 'white'}    
    ]
    
  },

  {
    name : 'mood',
    contextInputs : [
      {key: 'happy', contextInput: 'rainbow'},
      {key: 'sad', contextInput: 'blue'},
    ]
  }
]

//START - Table styling 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));
//END - table styling



const CreatorForm = ({contextStore}) => {
  // const [contextInput, setContextInput] = useState('');

  //array storing all contexts
  const {allContext} = contextStore
  
  const [contextInput, setContextInput] = React.useState(null);


  const dispatch = useDispatch()

  const handleClickSelectContext = () => {
    console.log(document.getElementById("autoCompleteContextField"))
    console.log('COMING FROM CLICK EVENT', contextInput);

    // dispatch({type: })
  }


  return (
    <Fragment>
      <Box
      sx={{ display: 'flex'}} >
    <Autocomplete
      id="autoCompleteContextField"
      value={contextInput}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setContextInput({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new contextInput from the user input
          setContextInput({
            name: newValue.inputValue,
          });
        } else {
          setContextInput(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new contextInput
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={allContext || []}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" />
      )}
    />
    <Button variant="contained" onClick={handleClickSelectContext}>Select/Create</Button>
    {/* <Button variant="contained">Delete</Button> */}
    </Box>
    <ContextTable target={contextArr[0].contextInputs}/>
    
    </Fragment> 
  );
}

export default CreatorForm;

