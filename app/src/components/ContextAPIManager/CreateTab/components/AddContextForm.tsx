import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { InputLabel, MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const AddContextForm = ({
  contextStore,
  handleClickSelectContext,
  handleDeleteContextClick,
  contextInput,
  setContextInput,
  currentContext,
  setCurrentContext,
  errorMsg,
  errorStatus,
  setErrorStatus
}) => {
  const { allContext } = contextStore;
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const color = 'white';

  //handler for submitting new context for creation
  const handleSubmit = () => {
    handleClickSelectContext();
    setOpen(true);
  };

  //form control for new context field
  const handleChange = (e) => {
    setErrorStatus(false);
    setOpen(false);
    setContextInput(e.target.value);
  };

  //event handle for confirmation modal
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //creating options for context dropdown
  const contexts = allContext.length ? (
    allContext.map((context, index) => {
      return (
        <MenuItem style={{ color: '#383838' }} value={context.name} key={index}>
          {context.name}
        </MenuItem>
      );
    })
  ) : (
    <MenuItem disabled>No Contexts Created</MenuItem>
  );

  return (
    <Fragment>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Create Context
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          InputProps={{
            style: { color: color }
          }}
          onChange={handleChange}
          sx={{
            width: 425,
            border: `1px solid ${color}`
          }}
          label="Create Context"
          value={contextInput}
          helperText={errorStatus ? errorMsg : null}
          error={errorStatus}
          variant="filled"
        />
        <Snackbar
          open={open && !errorStatus}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%', color: 'white' }}
          >
            Context Created
          </Alert>
        </Snackbar>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={btnDisabled}
        >
          Create
        </Button>
      </Box>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Select Context
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl variant="filled">
          <InputLabel style={{ color: color }}>Select Context</InputLabel>
          <Select
            required
            sx={{ width: 425 }}
            style={{ border: '1px solid #29a38a', color: color }}
            value={currentContext}
            label="Select Context"
            MenuProps={{ disablePortal: true }}
            onChange={(e) => {
              setCurrentContext(e.target.value);
            }}
          >
            {contexts}
          </Select>
        </FormControl>
        <Button
          color="primary"
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
