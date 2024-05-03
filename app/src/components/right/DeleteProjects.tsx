import React, { useState, useCallback, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { blue } from '@mui/material/colors';
import {
  getProjects,
  deleteProject
} from '../../helperFunctions/projectGetSaveDel';
import localforage from 'localforage';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInitialState,
  initialState
} from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
export interface ProjectDialogProps {
  deleteAlert: () => void;
  open: boolean;
  projects: Array<Object>;
  onClose: () => void;
}
// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects, deleteAlert } = props;
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();

  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    // onClose(selectedValue);
    onClose();
  };

  // If new project selected, close and set value to new project name
  const handleDelete = (value: string) => {
    const selectedProject = projects.filter(
      (project: any) => project._id === value
    )[0];
    deleteProject(selectedProject);
    // localforage.removeItem(window.localStorage.getItem('ssid'));
    dispatch(setInitialState(initialState));
    deleteAlert();
    onClose();
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="project-dialog-title"
        open={open}
      >
        <DialogTitle style={{ color: '#297ac2' }} id="project-dialog-title">
          DELETE PROJECTS
        </DialogTitle>
        <DialogTitle style={{ color: '#000' }} id="project-dialog-title">
          User Projects
        </DialogTitle>
        <List style={{ color: '#000' }}>
          {projects
            .filter(
              (project: any) =>
                project.forked === undefined || project.forked === false
            )
            .map((project: any, index: number) => (
              <ListItem
                button
                onClick={() => handleDelete(project._id)}
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
        <DialogTitle style={{ color: '#000' }} id="project-dialog-title">
          {' '}
          Marketplace Projects
        </DialogTitle>
        <List style={{ color: '#000' }}>
          {projects
            .filter((project: any) => project.forked === true)
            .map((project: any, index: number) => (
              <ListItem
                button
                onClick={() => handleDelete(project._id)}
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
    </>
  );
}

export default function ProjectsFolder(props) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([{ hello: 'cat' }]);

  const handleClickOpen = () => {
    getProjects().then((data) => {
      if (data) {
        setProjects(data);
        setOpen(true);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const keyBindDeleteProject = useCallback((e) => {
    if (
      (e.key === 'Backspace' && e.metaKey) ||
      (e.key === 'Backspace' && e.ctrlKey)
    ) {
      e.preventDefault();
      handleClickOpen();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyBindDeleteProject);
    return () => {
      document.removeEventListener('keydown', keyBindDeleteProject);
    };
  }, []);

  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        endIcon={<DeleteRoundedIcon />}
        sx={{ fontSize: '9px' }}
      >
        Delete Project
      </Button>
      <ProjectsDialog
        open={open}
        onClose={handleClose}
        projects={projects}
        deleteAlert={props.deleteAlert}
      />
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
