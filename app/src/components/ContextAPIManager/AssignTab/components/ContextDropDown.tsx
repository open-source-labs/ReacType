import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';


const filter = createFilterOptions();

const ContextDropDown = ({
  contextStore,
  renderTable,
  contextInput,
  setContextInput
}) => {
  const { allContext } = contextStore;

  const onChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setContextInput({
        name: newValue
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new contextInput from the user input
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
    const filtered = filter(options, params);
    const { inputValue } = params;
    // Suggest the creation of a new contextInput
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`
      });
    }

    return filtered;
  };

  const getOptionLabel = (option) => {
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

  const renderOption = (props, option) => (
    <li style={{ color: 'white' }} {...props}>
      {option.name}
    </li>
  );

  return (
    <Fragment>
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
          sx={{ width: 510 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: 'white' }
              }}
              label="Select Context"
              variant="outlined"
            />
          )}
        />
      </Box>
    </Fragment>
  );
};

export default ContextDropDown;
