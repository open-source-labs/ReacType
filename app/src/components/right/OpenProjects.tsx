import React, { useState, useCallback, useContext, useEffect } from 'react';
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
import StateContext from '../../context/context';

export interface ProjectDialogProps {
  open: boolean;
  projects: Array<Object>;
  onClose: () => void;
}
// The options to be rendered when dialog is open
function ProjectsDialog(props: ProjectDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects } = props;
  const [_, dispatch] = useContext(StateContext);
  // If no projects selected, keep the name of the current displayed
  const handleClose = () => {
    onClose();
  };
  // If new project selected, close and set value to new project name
  const handleListItemClick = (value: string) => {
    const selectedProject = projects.filter(
      (project: any) => project.name === value
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
      <DialogTitle style={{ color: "#000" }} id="project-dialog-title">Open Project</DialogTitle>
      <List style={{ color: "#000" }}>
        {projects.map((project: any, index: number) => (
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
      </List>
    </Dialog>
  );
}
export default function ProjectsFolder(props) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([{ hello: 'cat' }])

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
  const keyBindOpenProject = useCallback((e) => {
    if(e.key === 'o' && e.metaKey || e.key === 'o' && e.ctrlKey) {
      e.preventDefault();
      handleClickOpen();
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('keydown', keyBindOpenProject);
    return () => {
      document.removeEventListener('keydown', keyBindOpenProject)
    }
  }, []);
  return (
    <div>
      <Button
        color="primary"
        id="openProject"
        onClick={handleClickOpen}
        endIcon={<FolderOpenIcon />}
      >
        Open Project
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
    marginBotton: '10px'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});
