import React, { Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const AddDataForm = ({ handleClickInputData, contextInput }) => {
  const defaultInputData = { inputKey: '', inputValue: '' };
  const [dataContext, setDataContext] = React.useState(defaultInputData);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const saveData = () => {
    setDataContext(defaultInputData);
    handleClickInputData(contextInput, dataContext);
  };

  const handleChange = (e) => {
    setDataContext((prevDataContext) => {
      return {
        ...prevDataContext,
        [e.target.name]: e.target.value
      };
    });
  };

  const color = isDarkMode ? 'lightgray' : 'black';

  return (
    <Fragment>
      <Typography style={{ color }} variant="h6" gutterBottom={true}>
        Add context data
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Key"
          variant="outlined"
          value={dataContext.inputKey}
          name="inputKey"
          onChange={(e) => handleChange(e)}
          InputLabelProps={{ style: { color } }}
          InputProps={{ style: { color, borderColor: color } }}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          value={dataContext.inputValue}
          name="inputValue"
          onChange={(e) => handleChange(e)}
          InputLabelProps={{ style: { color } }}
          InputProps={{ style: { color, borderColor: color } }}
        />
        <Button variant="contained" onClick={saveData}>
          Save
        </Button>
      </Box>
    </Fragment>
  );
};

export default AddDataForm;
