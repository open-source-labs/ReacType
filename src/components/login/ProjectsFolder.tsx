import React, { useState, useEffect } from 'react';
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

import { getProjects } from '../../helperFunctions/projectGetSave';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface ProjectDialogProps {
  open: boolean;
  projects: Array<Object>;
  onClose: () => void;
}

//const projects = ['test'];

// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects } = props;

  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    // onClose(selectedValue);
    console.log('tab closed');
    onClose();
  };

  // If new project selected, close and set value to new project name
  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="project-dialog-title" open={open}>
      <DialogTitle id="project-dialog-title">Open Project</DialogTitle>
      <List>
        {projects.map((project) => (
          <ListItem button onClick={() => handleListItemClick(project.name)} key={project.name}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={project.name} />
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
  const [projects, setProjects] = useState([{hello: 'cat'}]);

  const handleClickOpen = () => {
    getProjects().then(data => {
      setProjects(data);
      setOpen(true);
    })
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Project
      </Button>
      <ProjectsDialog open={open} onClose={handleClose} projects={projects}/>
    </div>
  );
}