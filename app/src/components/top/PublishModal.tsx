import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/**
 * `PublishModal` is a React component that renders a dialog for entering a project name
 * and publishing the project. This modal includes a text field for the project name and
 * buttons to either cancel the action or save and publish the project.
 *
 * The modal is designed to provide feedback on the validity of the project name through
 * text field validation, displaying an error message if the project name is considered invalid.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.open - Boolean to control the visibility of the modal.
 * @param {Function} props.onClose - Function to be called when the modal is requested to be closed.
 * @param {Function} props.onSave - Function to be called when the publish button is clicked.
 * @param {string} props.projectName - Current value of the project name input field.
 * @param {Function} props.onChange - Function to handle changes to the project name input field.
 * @param {boolean} props.invalidProjectName - Boolean indicating whether the current project name is invalid.
 * @param {string} props.invalidProjectNameMessage - Message to display when the project name is invalid.
 * @returns {JSX.Element} A modal dialog with a form for publishing a project that includes a text input for the project name and action buttons.
 *
 * The `PublishModal` is used in scenarios where a user needs to provide a project name before publishing it to ensure
 * that the project name meets certain criteria. It is part of the project's workflow where publishing is a key step.
 */
const PublishModal = ({
  open,
  onClose,
  onSave,
  projectName,
  onChange,
  invalidProjectName,
  invalidProjectNameMessage
}): JSX.Element => {
  return (
    <Dialog
      style={{ color: '#000' }}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle style={{ color: '#000' }} id="form-dialog-title">
        Publish Project
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
