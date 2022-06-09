import React, { Fragment, useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import StateContext from '../../../../context/context';

const filter = createFilterOptions();

const ComponentDropDown = ({
  contextStore,
  renderComponentTable,
  componentInput,
  setComponentInput
}) => {
  const { allContext } = contextStore;
  const [componentList] = useContext(StateContext);

  const onChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setComponentInput({
        name: newValue
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new contextInput from the user input
      //console.log(newValue,newValue.inputValue)
      setComponentInput({
        name: newValue.inputValue,
        values: []
      });
      renderComponentTable(newValue);
    } else {
      setComponentInput(newValue);
      renderComponentTable(newValue);
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
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Autocomplete
          id="autoCompleteContextField"
          value={componentInput}
          onChange={onChange}
          filterOptions={filterOptions}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={componentList.components || []}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          sx={{ width: 425 }}
          freeSolo
          renderInput={params => (
            <TextField {...params} label="Select Component" helperText='Select a component for your selected context to consume' />
          )}
        />
      </Box>
    </Fragment>
  );
};

export default ComponentDropDown;
