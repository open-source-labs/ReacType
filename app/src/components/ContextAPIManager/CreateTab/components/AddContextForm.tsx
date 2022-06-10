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
  handleDeleteContextClick,
  renderTable,
  contextInput,
  setContextInput
}) => {
  const { allContext } = contextStore;
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleClick = () => {
    if (contextInput === '' || contextInput === null) return;
    handleClickSelectContext();
  };

  const onChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setContextInput({
        name: newValue
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new contextInput from the user input
      //console.log(newValue,newValue.inputValue)
      setContextInput({
        name: newValue.inputValue,
        values: []
      });
      renderTable(newValue);
    } else {
      setContextInput(newValue);
      renderTable(newValue);
    }
  };

  const filterOptions = (options, params) => {
    // setBtnDisabled(true);
    const filtered = filter(options, params);
    const { inputValue } = params;
    // Suggest the creation of a new contextInput
    const isExisting = options.some(option => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`
      });

      // setBtnDisabled(false);
    }

    return filtered;
  };

  const getOptionLabel = option => {
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

  const renderOption = (props, option) => <li {...props}>{option.name}</li>;

  return (
    <Fragment>
      <Typography style={{ color: 'black' }} variant="h6" gutterBottom={true}>
        Context Input
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Autocomplete
          id="autoCompleteContextField"
          value={contextInput}
          onChange={onChange}
          filterOptions={filterOptions}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={allContext || []}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          sx={{ width: 425 }}
          freeSolo
          renderInput={params => (
            <TextField {...params} label="Create/Select Context" />
          )}
        />
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={btnDisabled}
        >
          Create
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDeleteContextClick}
        >
          Delete
        </Button>
        {/* <Button variant="contained">Delete</Button> */}
      </Box>
    </Fragment>
  );
};

export default AddContextForm;
