import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavBarButtons from './NavBarButtons';
import NewExportButton from './NewExportButton';
import { RootState } from '../../redux/store';
import logo from '../../public/icons/win/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { publishProject, unpublishProject } from '../../helperFunctions/projectGetSaveDel';
import PublishModal from './PublishModal';
import { updateProjectId, updateProjectName, updateProjectPublished } from '../../redux/reducers/slice/appStateSlice';
import { State } from '../../interfaces/Interfaces';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const NavBar = () => {
  const [dropMenu, setDropMenu] = useState(false);
  const state = useSelector((store: RootState) => store.appState);
  const [publishModalOpen, setPublishModalOpen] = useState(false); 
  const [projectName, setProjectName] = useState(state.name || '');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] = useState('');
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  const dispatch = useDispatch();
  const menuButtonRef = useRef(null);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [alertOpen2, setAlertOpen2] = React.useState<boolean>(false)
  const [deleteAlert, setDeleteAlert] = React.useState<boolean>(false)
  const [openAlert, setOpenAlert] = React.useState<boolean>(false)

  useEffect(()=>{
    setProjectName(state.name)
  }, [state.name])//update the ProjectName after state.name changes due to loading projects

  const deleteAlertOpen = () => {
    console.log("I am hit")
    setDeleteAlert(true);
  }

  const openProjectAlert = () => {
    setOpenAlert(true)
  }

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const buttonStyle = {
    backgroundColor: '#333',
    border: 'none',
    color: isDarkMode ? 'lightgray' : 'white',
    fontSize: '12px',
    padding: '8px 12px',
    cursor: 'pointer',
    marginRight: '10px',
    marginLeft: '5px',
    borderRadius: '4px'
  };

  const moreVertButtonStyle = {
    backgroundColor: '#333',
    border: '1px solid #333',
    padding: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '4px',
    width: '30px',
    minWidth: '20px',
    marginLeft: '0px',
    marginRight: '10px'
  };

  const handlePublish = () => {
    if (state.isLoggedIn === true && projectName === '') {
      setInvalidProjectName(true);
      setPublishModalOpen(true);
      return;
    }
    

    publishProject(projectName, state)
      .then((newProject: State) => {
        console.log('Project published successfully', newProject);
        setPublishModalOpen(false);
        dispatch(updateProjectId(newProject._id))
        dispatch(updateProjectName(newProject.name))
        dispatch(updateProjectPublished(newProject.published))
        setAlertOpen(true)
      })
      .catch((error) => {
        console.error('Error publishing project:', error.message);
      });
      
    };

    const handleUnpublish = () => {
      unpublishProject(state)
        .then((unpublishedProject: State) => {
          console.log('Project unpublished successfully', unpublishedProject);
          dispatch(updateProjectPublished(false)); 
          setAlertOpen2(true);
        })
        .catch((error) => {
          console.error('Error unpublishing project:', error.message);
        });
    };

    const handleAlertClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
      ) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false);  
        setAlertOpen2(false);
        setDeleteAlert(false);
        setOpenAlert(false);
      }
  
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
      props,
      ref
    ) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

  
  return (
    <div>
    <nav
      className="main-navbar"
      style={
        isDarkMode
          ? { backgroundColor: '#013365' }
          : { backgroundColor: '#151515' }
      }
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="main-logo">
          <Avatar src={logo}></Avatar>
          <h1 style={isDarkMode ? { color: 'white' } : { color: 'white' }}>
            ReacType
          </h1>
        </div>
      </Link>
      <div style={buttonContainerStyle}>
        {state.published ? (
          <button style={buttonStyle} onClick={handleUnpublish}>
            Unpublish
          </button>
        ) : (
          <button style={buttonStyle} onClick={handlePublish}>
            Publish
          </button>
        )}
        <NewExportButton />
        <Button
          style={moreVertButtonStyle}
          variant="contained"
          color="primary"
          onClick={() => setDropMenu(!dropMenu)}
          ref={menuButtonRef}
        >
          <MoreVertIcon style={{ color: 'white' }} />
        </Button>
        <NavBarButtons
          dropMenu={dropMenu}
          setDropMenu={setDropMenu}
          menuButtonRef={menuButtonRef}
          style={{ color: 'white' }}
          deleteAlert={deleteAlertOpen}
          openAlert={openProjectAlert}
        />
      </div>
      <PublishModal
        open={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onSave={handlePublish}
        projectName={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        invalidProjectName={invalidProjectName}
        invalidProjectNameMessage={invalidProjectNameMessage}
      />
    </nav>
    <div>
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: '100%', color: 'white' }}
          >
            Published Project!
          </Alert>
        </Snackbar>
        <Snackbar
          open={alertOpen2}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: '100%', color: 'white' }}
          >
            Unpublished Project!
          </Alert>
        </Snackbar>
        <Snackbar
          open={deleteAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: '100%', color: 'white' }}
          >
             Project Deleted!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: '100%', color: 'white' }}
          >
            Opened Project!
          </Alert>
        </Snackbar>
    </div>
    </div>
  );
};

export default NavBar;
