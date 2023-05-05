import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

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
  const { state, isDarkMode } = useSelector((store: RootState) => ({
    isDarkMode: store.darkMode.isDarkMode,
    state: store.appState
  }));
  const color = isDarkMode ? 'white' : 'black';

  const handleClick = () => {
    if (contextInput === '' || contextInput === null) {
      window.alert('must enter context name');
      return;
    }
    handleClickSelectContext();
  };

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
    <li style={{ color: 'black' }} {...props}>
      {option.name}
    </li>
  );

  return (
    <Fragment>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
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
          sx={{ width: 425, border: '1px solid black' }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: color }
              }}
              variant="filled"
              label="Create/Select Context"
            />
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
      </Box>
    </Fragment>
  );
};

export default AddContextForm;
