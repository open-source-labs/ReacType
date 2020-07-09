import React, { useState, useContext } from 'react';
import { stateContext } from '../../context/context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { saveProject } from '../../helperFunctions/projectGetSave';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(stateContext);

  const [projectName, setProjectName] = useState('');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] = useState('');

  const handleClickOpen = () => {
    setInvalidProjectName(false);
    setOpen(true);
  };

  const handleSave = () => {
    if (state.isLoggedIn === true && projectName !== '') {
      // Update Project Name in Global State
      // dispatch({ type: 'CHANGE POSITION', payload: projectName });
      // Store Project to MongoDB
      saveProject(projectName, state);
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
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save Project
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={handleChange}
            helperText={invalidProjectNameMessage}
            error={invalidProjectName}
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