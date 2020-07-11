import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import { getProjects } from '../../helperFunctions/projectGetSave';
import { stateContext } from '../../context/context';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

export interface ProjectDialogProps {
  open: boolean;
  projects: Array<Object>;
  onClose: () => void;
}

// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects } = props;
  console.log('Inside projectsdialogbox projects is', projects);
  const [_, dispatch] = useContext(stateContext);

  useEffect(() => {
    console.log('state is', _);
  }, [_]);

  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    // onClose(selectedValue);
    console.log('tab closed');
    onClose();
  };

  // If new project selected, close and set value to new project name
  const handleListItemClick = (value: string) => {
    const selectedProject = projects.filter(
      project => project.name === value
    )[0];
    dispatch({ type: 'OPEN PROJECT', payload: selectedProject });
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="project-dialog-title"
      open={open}
    >
      <DialogTitle id="project-dialog-title">Open Project</DialogTitle>
      <List>
        {projects.map((project, index) => (
          <ListItem
            button
            onClick={() => handleListItemClick(project.name)}
            key={index}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <FolderOpenIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
        {/* Change state to empty for new project */}
        <ListItem autoFocus button onClick={() => handleClose()}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="New Project" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function ProjectsFolder() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([{ hello: 'cat' }]);

  const handleClickOpen = () => {
    getProjects().then(data => {
      if (data) {
        setProjects(data);
        setOpen(true);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<FolderOpenIcon />}
      >
        Open Project
      </Button>
      <ProjectsDialog open={open} onClose={handleClose} projects={projects} />
    </div>
  );
}
