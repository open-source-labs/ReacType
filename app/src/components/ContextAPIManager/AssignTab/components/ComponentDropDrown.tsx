/* eslint-disable max-len */
import React, { Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const filter = createFilterOptions();

/**
 * Renders an autocomplete dropdown list that allows the user to select or enter a component.
 * When a component is selected or entered, this triggers a specified callback to render the component table.
 * The dropdown uses a custom filter for suggestions, allowing users to add components not already listed in the options.
 *
 * @param {Object} props - The props passed to the ComponentDropDown component.
 * @param {Function} props.renderComponentTable - Callback function that is triggered to render the component table based on the selected component.
 * @param {Object|null} props.componentInput - The currently selected component object or null if nothing is selected.
 * @param {Function} props.setComponentInput - Sets the state of the componentInput in the parent component.
 *
 * Redux State Dependencies:
 * - `appState`: Expects `appState.components` from the Redux store to provide the list of available components.
 *
 * @returns {JSX.Element} A React Fragment that includes a Box containing the Autocomplete component which provides a dropdown for selecting components.
 */
const ComponentDropDown = ({
  renderComponentTable,
  componentInput,
  setComponentInput,
}): JSX.Element => {
  const { state } = useSelector((store: RootState) => ({
    state: store.appState,
  }));

  const onChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setComponentInput({
        name: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new contextInput from the user input
      setComponentInput({
        name: newValue.inputValue,
        values: [],
      });
      renderComponentTable(newValue);
    } else {
      setComponentInput(newValue);
      renderComponentTable(newValue);
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
        name: `Add "${inputValue}"`,
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
    <li style={{ color: 'white', backgroundColor: 'none' }} {...props}>
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
          sx={{ width: 510 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: 'white' },
              }}
              variant="outlined"
              label="Select Component"
            />
          )}
        />
      </Box>
    </Fragment>
  );
};

export default ComponentDropDown;
