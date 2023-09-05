import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const PublishModal = ({
  open,
  onClose,
  onSave,
  projectName,
  onChange,
  invalidProjectName,
  invalidProjectNameMessage,
}) => {
  return (
    <Dialog 
    style={{ color: "#000" }}
    open={open}
    onClose={onClose} 
    aria-labelledby="form-dialog-title"
    >
      <DialogTitle style={{ color: "#000" }} id="form-dialog-title">Publish Project</DialogTitle>
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
          onChange={onChange}
          helperText={invalidProjectNameMessage}
          error={invalidProjectName}
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishModal;
