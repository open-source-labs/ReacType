import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

// Get a list of project names from the user
const projects = ['username@gmail.com', 'user02@gmail.com'];

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface ProjectDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    onClose(selectedValue);
  };

  // If new project selected, close and set value to new project name
  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="project-dialog-title" open={open}>
      <DialogTitle id="project-dialog-title">Open Project</DialogTitle>
      <List>
        {projects.map((project) => (
          <ListItem button onClick={() => handleListItemClick(project)} key={project}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={project} />
          </ListItem>
        ))}
        {/* Change state to empty for new project */}
        <ListItem autoFocus button onClick={() => handleListItemClick('addProject')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="New Project"/>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function ProjectsFolder() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close dialog and set project name to what was last clicked in dialog
  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br /> */}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Project
      </Button>
      <ProjectsDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
    </div>
  );
}