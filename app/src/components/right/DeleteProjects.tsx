import React, { useState, useCallback, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { blue } from '@material-ui/core/colors';

import {
  getProjects,
  deleteProject
} from '../../helperFunctions/projectGetSaveDel';
import localforage from 'localforage';
import StateContext from '../../context/context';
import initialState from '../../context/initialState';

export interface ProjectDialogProps {
  open: boolean;
  projects: Array<Object>;
  onClose: () => void;
}

// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects } = props;
  const [state, dispatch] = useContext(StateContext);

  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    // onClose(selectedValue);
    onClose();
  };

  // If new project selected, close and set value to new project name
  const handleDelete = (value: string) => {
    const selectedProject = projects.filter(
      (project: any) => project.name === value
    )[0];
    deleteProject(selectedProject);
    localforage.removeItem(window.localStorage.getItem('ssid'));
    dispatch({ type: 'SET INITIAL STATE', payload: initialState });
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="project-dialog-title"
      open={open}
    >
      <DialogTitle id="project-dialog-title">Delete Project</DialogTitle>
      <List>
        {projects.map((project: any, index: number) => (
          <ListItem
            button
            onClick={() => handleDelete(project.name)}
            key={index}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <DeleteRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function ProjectsFolder() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([{ hello: 'cat' }]);

  const classes = useStyles();

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

  const keybindDeleteProject = useCallback((e) => {
    //Mac
    if(e.key === 'Backspace' && e.metaKey) {
      e.preventDefault();
      handleClickOpen();
    }
    //Windows
    if(e.key === 'Backspace' && e.ctrlKey) {
      e.preventDefault();
      handleClickOpen();
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener("keydown", keybindDeleteProject);
  }, []);


  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        endIcon={<DeleteRoundedIcon />}
      >
        Delete Project
      </Button>
      <ProjectsDialog open={open} onClose={handleClose} projects={projects} />
    </div>
  );
}

const useStyles = makeStyles({
  button: {
    width: '55%',
    backgroundColor: 'rgba(1,212,109,0.1)',
    fontSize: '1em',
    minWidth: '300px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});
