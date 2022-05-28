import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContextTable from './ContextTable';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';


const filter = createFilterOptions();

const CreatorForm = ({
  contextStore,
  handleClickSelectContext,
  handleClickInputData
}) => {
  //array storing all contexts
  const { allContext } = contextStore;

  //a state to keep track of data in table
  const [tableState, setTableState] = React.useState([
    {
      key: 'Enter Key',
      value: 'Enter value'
    }
  ]);


  const [contextInput, setContextInput] = React.useState(null);
  const [dataContext, setDataContext] = React.useState({
    inputKey: '',
    inputValue: ''
  });

  const renderTable = targetContext => {
    if (!targetContext.values) {
      setTableState([
        {
          key: 'Enter Key',
          value: 'Enter value'
        }
      ])
    } else {
      setTableState(targetContext.values);
    }
  };

  // START - autocomplete functionality ----------------
  const handleChange = e => {
    setDataContext(prevDataContext => {
      return {
        ...prevDataContext,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleClick = () => {
    if (contextInput === '' || contextInput === null) return;
    const temp = contextInput;
    setContextInput('');
    handleClickSelectContext(temp);
  };

  const autoOnChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setContextInput({
        name: newValue
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new contextInput from the user input
      setContextInput({
        name: newValue.inputValue
      });
    } else {
      setContextInput(newValue);
      renderTable(newValue);
    }
  };

  const autoFitler = (options, params) => {
    const filtered = filter(options, params);

    const { inputValue } = params;
    // Suggest the creation of a new contextInput
    const isExisting = options.some(
      option => inputValue === option.name
      // console.log(inputValue)
    );
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`
      });
    }

    return filtered;
  };

  const autoGetOptions = option => {
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
  };

  const autoRenderOptions = (props, option) => (
    <li {...props}>{option.name}</li>
  );
  // END - autocomplete --------------------------

  return (
    <Fragment>
      <Grid container spacing={2} >
      <Grid item xs={6} display='flex' direction='column' justifyContent="center" alignItems="center">
      {/* Input box for context */}
      <Typography style={{ color: 'black' }} variant="h6" gutterBottom={true} >
        Context Input
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Autocomplete
          id="autoCompleteContextField"
          value={contextInput}
          onChange={autoOnChange}
          filterOptions={autoFitler}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={allContext || []}
          getOptionLabel={autoGetOptions}
          renderOption={autoRenderOptions}
          sx={{ width: 425 }}
          freeSolo
          renderInput={params => (
            <TextField {...params} label="Create/Select Context" />
          )}
        />
        <Button variant="contained" onClick={handleClick}>
          Create
        </Button>
        {/* <Button variant="contained">Delete</Button> */}
      </Box>

      <Divider variant="middle" sx={{mb: 3}}/>

      {/* Input box for context data */}
      <Typography style={{ color: 'black' }} variant="h6" gutterBottom={true}>
        Add context data
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Key"
          variant="outlined"
          value={dataContext.inputKey}
          name="inputKey"
          onChange={e => handleChange(e)}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          value={dataContext.inputValue}
          name="inputValue"
          onChange={e => handleChange(e)}
        />
        <Button
          variant="contained"
          onClick={() => handleClickInputData(contextInput, dataContext)}
        >
          Save
        </Button>
      </Box>
      </Grid>

      <Grid item xs={6} >
      <ContextTable  target={tableState} />
      </Grid>
      </Grid>
    </Fragment>
  );
};

export default CreatorForm;
