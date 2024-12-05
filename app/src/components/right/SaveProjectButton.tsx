/* eslint-disable max-len */
import React, { useState, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { saveProject } from '../../helperFunctions/projectGetSaveDel';
import {
  updateProjectName,
  updateProjectId,
} from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { State } from '../../interfaces/Interfaces';

/**
 * A form dialog component that allows users to save projects under a specific name.
 * It handles project name validation, interacts with the Redux store to update state,
 * and communicates with the server to save the project.
 *
 * @returns {JSX.Element} A React component that provides a form inside a dialog for entering a project name,
 * with validation feedback and options to either save or cancel the operation.
 */
export default function FormDialog(): JSX.Element {
  const [open, setOpen] = useState(false);
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] = useState('');

  const handleClickOpen = () => {
    setInvalidProjectName(false);
    setOpen(true);
  };

  const handleSave = () => {
    if (state.isLoggedIn === true && projectName !== '') {
      // Update the project name to global state
      // Needed to disable delete button
      // Switch to Thunk
      // If errors occur on the backend, the project name still gets updated

      dispatch(updateProjectName(projectName));
      saveProject(projectName, state).then((project: State) => dispatch(updateProjectId(project._id))); // updates the slice with new _id from mongo
      setOpen(false);
    } else {
      setInvalidProjectName(true);
      setInvalidProjectNameMessage('Please Enter');
    }
  };
  const handleClose = () => {
    setInvalidProjectName(false);
    setInvalidProjectNameMessage('');
    setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const saveKeyBind = useCallback((e) => {
    // Save Project As, the || is for Mac or Windows
    (e.key === 's' && e.metaKey && !e.shiftKey) ||
    (e.key === 's' && e.ctrlKey && !e.shiftKey)
      ? handleClickOpen()
      : '';
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', saveKeyBind);
    return () => {
      document.removeEventListener('keydown', saveKeyBind);
    };
  }, []);
  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        endIcon={<SaveOutlinedIcon />}
        sx={{ fontSize: '9px' }}
      >
        SAVE PROJECT AS
      </Button>
      <Dialog
        style={{ color: '#000' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ color: '#000' }} id="form-dialog-title">
          Save Project
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputProps={{ style: { color: 'black' } }}
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={handleChange}
            helperText={invalidProjectNameMessage}
            error={invalidProjectName}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
