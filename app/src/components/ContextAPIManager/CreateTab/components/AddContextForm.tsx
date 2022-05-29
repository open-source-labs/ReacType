import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const filter = createFilterOptions();

const AddContextForm = ({
  contextStore,
  handleClickSelectContext,
  renderTable,
  contextInput,
  setContextInput
}) => {
  const { allContext } = contextStore;
  
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

  return (
    <Fragment>
      <Typography style={{ color: 'black' }} variant="h6" gutterBottom={true}>
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
    </Fragment>
  );
};

export default AddContextForm;
