import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const AddDataForm = ({ handleClickInputData, currentContext }) => {
  //const [contextInput, setContextInput] = React.useState(null);
  const defaultInputData = { inputKey: '', inputValue: '' };
  const [dataContext, setDataContext] = React.useState(defaultInputData);
  const { isDarkMode } = useSelector((store: RootState) => store.darkMode);
  const saveData = () => {
    setDataContext(defaultInputData);
    if (dataContext.inputKey === '' || dataContext.inputValue === '') {
      window.alert('empty key or value');
      return;
    }
    handleClickInputData(currentContext, dataContext);
  };
  const color = isDarkMode ? 'white' : 'black';

  const handleChange = (e) => {
    setDataContext((prevDataContext) => {
      return {
        ...prevDataContext,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Add context data
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, color: 'black' }}>
        <TextField
          id="outlined-basic"
          label="Key"
          variant="filled"
          value={dataContext.inputKey}
          name="inputKey"
          onChange={(e) => handleChange(e)}
          InputProps={{ style: { color: color } }}
          style={{ border: '1px solid black' }}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="filled"
          value={dataContext.inputValue}
          name="inputValue"
          onChange={(e) => handleChange(e)}
          style={{ border: '1px solid black' }}
          InputProps={{ style: { color: color } }}
        />
        <Button variant="contained" onClick={saveData}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default AddDataForm;
