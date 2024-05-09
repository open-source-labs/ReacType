import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const filter = createFilterOptions();

/**
 * A React component that provides an autocomplete dropdown for selecting or adding new contexts.
 * It integrates with the contextStore to list available contexts and allows the user to create a new context by entering a unique name.
 * When a context is selected or a new one is entered, the specified `renderTable` function is triggered to reflect changes elsewhere in the UI.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.contextStore - The store holding all context data.
 * @param {Function} props.renderTable - Function to call when a context is selected or created to update associated data display.
 * @param {Object|null} props.contextInput - The currently selected or entered context.
 * @param {Function} props.setContextInput - Function to update the contextInput state.
 *
 * @returns {JSX.Element} A React fragment containing an Autocomplete component wrapped in a Box for layout adjustments.
 */
const ContextDropDown = ({
  contextStore,
  renderTable,
  contextInput,
  setContextInput
}): JSX.Element => {
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
