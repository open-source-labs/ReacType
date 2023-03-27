import React, { useState, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { saveProject } from '../../helperFunctions/projectGetSaveDel';
import {useDispatch, useSelector} from 'react-redux'
import {updateProjectName} from '../../redux/reducers/slice/appStateSlice';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
const state = useSelector(store => store.appState);
const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] = useState(
    ''
  );

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

      dispatch(updateProjectName(projectName))
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
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const saveKeyBind = useCallback((e) => {
    //Save Project As, the || is for Mac or Windows
    (e.key === 's' && e.metaKey && !e.shiftKey || e.key === 's' && e.ctrlKey && !e.shiftKey) ? handleClickOpen() : '';
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', saveKeyBind);
    return () => {
      document.removeEventListener('keydown', saveKeyBind)
    }
  }, []);
  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        endIcon={<SaveOutlinedIcon />} sx={{fontSize: '9px'}}
      >
        SAVE PROJECT AS
      </Button>
      <Dialog
        style={{ color: "#000" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ color: "#000" }} id="form-dialog-title">Save Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputProps={{ style: { color: "black" } }}
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
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

