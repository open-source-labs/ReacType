import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { error } from 'console';

const filter = createFilterOptions();

const AddContextForm = ({
  contextStore,
  handleClickSelectContext,
  handleDeleteContextClick,
  renderTable,
  contextInput,
  setContextInput,
  currentContext,
  setCurrentContext
}) => {
  const { allContext } = contextStore;
  console.log('all contexts', allContext);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { state, isDarkMode } = useSelector((store: RootState) => ({
    isDarkMode: store.darkMode.isDarkMode,
    state: store.appState
  }));
  const color = isDarkMode ? 'white' : 'black';
  const [selection, setSelection] = React.useState('');

  const handleClick = () => {
    if (contextInput === '' || contextInput === null) {
      window.alert('must enter context name');
      return;
    }
    handleClickSelectContext();
  };

  // const onChange = (event, newValue) => {
  //   if (typeof newValue === 'string') {
  //     setContextInput({
  //       name: newValue
  //     });
  //   } else if (newValue && newValue.inputValue) {
  //     // Create a new contextInput from the user input
  //     setContextInput({
  //       name: newValue.inputValue,
  //       values: []
  //     });
  //     renderTable(newValue);
  //   } else {)
  //     setContextInput(newValue);
  //     renderTable(newValue);
  //   }
  // };

  const handleChange = (e) => {
    setContextInput({ name: e.target.value });
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

  const contexts = allContext.map((context) => {
    return (
      <MenuItem style={{ color: 'black' }} value={context.name}>
        {context.name}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Create Context
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {/* <Autocomplete
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
        /> */}
        <TextField
          InputProps={{
            style: { color: 'black' }
          }}
          // {...params}
          // InputProps={{
          //   ...params.InputProps,
          //   style: { color: color }
          // }}
          onChange={handleChange}
          sx={{
            width: 425,
            border: '1px solid black',
            color: 'black !important'
          }}
          variant="filled"
          label="Create Context"
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
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Select Context
      </Typography>

      <Select
        style={{ border: '1px solid #0099e6', color: 'black' }}
        value={currentContext}
        label="Select Context"
        MenuProps={{ disablePortal: true }}
        onChange={(e) => {
          console.log(e);
          setCurrentContext(e.target.value);
        }}

        // value={props.selectValue}
        // onChange={props.handleChange}
      >
        {contexts}
      </Select>
    </Fragment>
  );
};

export default AddContextForm;
