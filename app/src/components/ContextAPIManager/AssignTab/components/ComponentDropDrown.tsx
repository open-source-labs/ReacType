import React, { Fragment, useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const filter = createFilterOptions();

const ComponentDropDown = ({
  contextStore,
  renderComponentTable,
  componentInput,
  setComponentInput
}) => {
  const { allContext } = contextStore;
  // const [componentList] = useContext(StateContext);
  const { state, isDarkMode } = useSelector((store: RootState) => ({
    state: store.appState,
    isDarkMode: store.darkMode.isDarkMode
  }));
  const color = isDarkMode ? 'white' : 'black';
  const onChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setComponentInput({
        name: newValue
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new contextInput from the user input
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
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`
      });

      // setBtnDisabled(false);
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
    <li style={{ color: 'black', border: '1px solid black' }} {...props}>
      {option.name}
    </li>
  );

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
          options={state.components || []}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          sx={{ width: 425, border: '1px solid black' }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: color }
              }}
              label="Select Component"
              helperText="Select a component for your selected context to consume"
            />
          )}
        />
      </Box>
    </Fragment>
  );
};

export default ComponentDropDown;
