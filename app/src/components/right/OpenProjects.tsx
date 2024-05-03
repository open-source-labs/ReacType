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
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { blue } from '@mui/material/colors';
import { getProjects } from '../../helperFunctions/projectGetSaveDel';
import { useDispatch, useSelector } from 'react-redux';
import { openProject } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';

export interface ProjectDialogProps {
  openAlert: () => void;
  open: boolean;
  projects: Array<Object>;
  onClose: () => void;
}
// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects, openAlert } = props;
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();
  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    onClose();
  };
  // If new project selected, close and set value to new project name
  const handleListItemClick = (value: string) => {
    const selectedProject = projects.filter(
      (project: any) => project._id === value
    )[0];
    // dispatch({ type: 'OPEN PROJECT', payload: selectedProject });
    dispatch(openProject(selectedProject));
    openAlert();
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="project-dialog-title"
      open={open}
    >
      <DialogTitle style={{ color: '#297ac2' }} id="project-dialog-title">
        SAVED PROJECTS
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
              onClick={() => handleListItemClick(project._id)}
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
      </List>
      {/* this section handles the projects cloned from the marketplace */}
      <DialogTitle style={{ color: '#000' }} id="project-dialog-title">
        Marketplace Projects
      </DialogTitle>
      <List style={{ color: '#000' }}>
        {projects
          .filter((project: any) => project.forked === true)
          .map((project: any, index: number) => (
            <ListItem
              button
              onClick={() => handleListItemClick(project._id)}
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
      </List>
    </Dialog>
  );
}
export default function ProjectsFolder(props: any) {
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
  const keyBindOpenProject = useCallback((e) => {
    if ((e.key === 'o' && e.metaKey) || (e.key === 'o' && e.ctrlKey)) {
      e.preventDefault();
      handleClickOpen();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyBindOpenProject);
    return () => {
      document.removeEventListener('keydown', keyBindOpenProject);
    };
  }, []);
  return (
    <div>
      <Button
        color="primary"
        id="openProject"
        onClick={handleClickOpen}
        endIcon={<FolderOpenIcon />}
        sx={{ fontSize: '9px' }}
      >
        Open Project
      </Button>
      <ProjectsDialog
        open={open}
        onClose={handleClose}
        projects={projects}
        openAlert={props.openAlert}
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
    marginBotton: '10px'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});
