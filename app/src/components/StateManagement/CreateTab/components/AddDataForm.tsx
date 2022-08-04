import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const AddDataForm = ({ handleClickInputData, contextInput }) => {
  //const [contextInput, setContextInput] = React.useState(null);
  const defaultInputData = {inputKey: '', inputValue: ''};
  const [dataContext, setDataContext] = React.useState(defaultInputData);

  const saveData = () => {
    setDataContext(defaultInputData);
    handleClickInputData(contextInput, dataContext)
  }

  const handleChange = e => {
    setDataContext(prevDataContext => {
      return {
        ...prevDataContext,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <Fragment>
      <Typography style={{ color: 'black' }} variant="h6" gutterBottom={true}>
        Add state data 
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Key"
          variant="outlined"
          value={dataContext.inputKey}
          name="inputKey"
          onChange={e => handleChange(e)}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          value={dataContext.inputValue}
          name="inputValue"
          onChange={e => handleChange(e)}
        />
        <Button
          variant="contained"
          onClick={saveData}
        >
          Save
        </Button>
      </Box>
    </Fragment>
  );
};

export default AddDataForm;
