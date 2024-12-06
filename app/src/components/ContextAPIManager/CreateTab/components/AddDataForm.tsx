/* eslint-disable max-len */
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../redux/store';

/**
 * Renders a form to add key-value pairs to a specified context. The form includes two text fields for the key and value,
 * and a button to submit the data. Upon submission, if any field is empty, an alert is shown; otherwise, the data is passed
 * to the `handleClickInputData` callback function provided by the parent component.
 *
 * @param {{ handleClickInputData: Function, currentContext: string }} props
 * - `handleClickInputData`: A function to handle the submission of key-value pairs. It takes the current context and an object with key and value.
 * - `currentContext`: The name of the context to which the key-value pairs are being added. This is used when submitting the form.
 *
 * @returns {JSX.Element} A form with two text fields for entering a key and a value, and a button to submit the form.
 *
 * @example
 * ```jsx
 * <AddDataForm
 *   handleClickInputData={(context, data) => console.log(context, data)}
 *   currentContext="Example Context"
 * />
 * ```
 */
const AddDataForm = ({ handleClickInputData, currentContext }): JSX.Element => {
  // const [contextInput, setContextInput] = React.useState(null);
  const defaultInputData = { inputKey: '', inputValue: '' };
  const [dataContext, setDataContext] = React.useState(defaultInputData);

  const saveData = () => {
    setDataContext(defaultInputData);
    if (dataContext.inputKey === '' || dataContext.inputValue === '') {
      window.alert('empty key or value');
      return;
    }
    handleClickInputData(currentContext, dataContext);
  };
  const color = 'white';

  const handleChange = (e) => {
    setDataContext((prevDataContext) => ({
      ...prevDataContext,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Add Context Data
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, color: 'black' }}>
        <TextField
          id="outlined-basic"
          label="key"
          variant="outlined"
          value={dataContext.inputKey}
          name="inputKey"
          onChange={(e) => handleChange(e)}
          InputProps={{ style: { color: color } }}
          style={{ border: '1px solid black', width: '205px' }}
        />
        <TextField
          id="outlined-basic"
          label="value"
          variant="outlined"
          value={dataContext.inputValue}
          name="inputValue"
          onChange={(e) => handleChange(e)}
          style={{ border: '1px solid black', width: '205px' }}
          InputProps={{ style: { color: color } }}
        />
        <Button
          variant="contained"
          onClick={saveData}
          sx={{
            textTransform: 'capitalize',
            height: '50px',
            width: '100px',
            fontSize: '15px',
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default AddDataForm;
