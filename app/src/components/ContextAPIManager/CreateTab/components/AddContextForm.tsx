/* eslint-disable max-len */
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

/**
 * Provides a form interface for creating new contexts or selecting existing ones within an application.
 * Users can input a new context name and submit it for creation or select from a list of existing contexts.
 * This component also displays feedback through a Snackbar when a new context is successfully created,
 * and handles the error messaging related to context creation.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.contextStore - Contains the state slice from Redux store that holds context data.
 * @param {Function} props.handleClickSelectContext - Function to call when submitting a new context.
 * @param {Function} props.handleDeleteContextClick - Function to call when a context is selected for deletion.
 * @param {string} props.contextInput - The current input value for the new context name.
 * @param {Function} props.setContextInput - Function to update the contextInput state.
 * @param {string} props.currentContext - The currently selected context.
 * @param {Function} props.setCurrentContext - Function to update the currentContext state.
 * @param {string} props.errorMsg - Error message to display in the text field helper text if there's an error.
 * @param {boolean} props.errorStatus - Boolean indicating if an error exists.
 * @param {Function} props.setErrorStatus - Function to update the errorStatus state.
 *
 * @returns {JSX.Element} The component returns a set of React elements that include input fields, buttons, and a snackbar for feedback.
 *
 */
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
  setErrorStatus,
}) => {
  const { allContext } = contextStore;
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const color = 'white';

  // handler for submitting new context for creation
  const handleSubmit = () => {
    handleClickSelectContext();
    setOpen(true);
  };

  // form control for new context field
  const handleChange = (e) => {
    setErrorStatus(false);
    setOpen(false);
    setContextInput(e.target.value);
  };

  // event handle for confirmation modal
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // creating options for context dropdown
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
      <Typography style={{ color: 'color' }} variant="h6" gutterBottom={true}>
        Create Context
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          InputProps={{
            style: { color: color },
          }}
          onChange={handleChange}
          sx={{
            width: 425,
          }}
          label="context"
          value={contextInput}
          helperText={errorStatus ? errorMsg : null}
          error={errorStatus}
          variant="outlined"
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
          sx={{
            textTransform: 'capitalize',
            height: '50px',
            width: '100px',
            fontSize: '15px',
          }}
        >
          Create
        </Button>
      </Box>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Select Context
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <FormControl variant="outlined">
          <InputLabel>select context</InputLabel>
          <Select
            required
            sx={{ width: 425 }}
            style={{ color: color }}
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
          sx={{
            textTransform: 'capitalize',
            height: '50px',
            width: '100px',
            fontSize: '15px',
          }}
        >
          Delete
        </Button>
      </Box>
    </Fragment>
  );
};

export default AddContextForm;
