import React, { Fragment, } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const filter = createFilterOptions();

const ComponentDropDown = ({
  contextStore,
  renderComponentTable,
  componentInput,
  setComponentInput
}) => {
  const { state, isDarkMode } = useSelector((store) => ({
    state: store.appState,
    isDarkMode: store.darkMode.isDarkMode
  }));

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

  const renderOption = (props, option) => <li {...props}>{option.name}</li>;
  const color = isDarkMode ? 'lightgray' : 'black';

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
          sx={{ width: 425 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Component"
              helperText="Select a component for your selected context to consume"
              InputLabelProps={{ style: { color } }}
              FormHelperTextProps={{ style: { color } }}
              InputProps={{ style: { color } }}
            />
          )}
        />
      </Box>
    </Fragment>
  );
};

export default ComponentDropDown;
