/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import NavBarButtons from './NavBarButtons';
import NewExportButton from './NewExportButton';
import { RootState } from '../../redux/store';
import logo from '../../public/icons/win/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  publishProject,
  unpublishProject
} from '../../helperFunctions/projectGetSaveDel';
import PublishModal from './PublishModal';
import {
  updateProjectId,
  updateProjectName,
  updateProjectPublished,
  toggleScreenshotTrigger
} from '../../redux/reducers/slice/appStateSlice';
import { State } from '../../interfaces/Interfaces';

/**
 * The `NavBar` component serves as the main navigation bar for the application, providing links,
 * buttons for various actions like publishing/unpublishing projects, and access to additional options
 * through a dropdown menu. It manages several UI states for visibility of modal dialogs and alerts,
 * reacting to user inputs and application state changes.
 *
 * The component uses Redux for state management to track application states such as whether the user is
 * logged in, the current project's publication status, and its name. It also handles triggering alerts
 * for different application events like successful publication or deletion, and errors such as when a
 * publish action is attempted without being logged in.
 *
 * @returns {JSX.Element} A `div` element containing the navigation bar setup with links, buttons, and
 *                        conditional rendering logic for showing modals and alerts based on the application state.
 *
 * This component integrates closely with the application's Redux store to fetch and manipulate the global
 * state concerning the current project. It also utilizes local state to manage UI-specific concerns like
 * dropdown menu visibility and modal dialogs for publishing projects. Additionally, it includes error handling
 * and feedback mechanisms via MUI `Snackbar` components to enhance user interaction and experience.
 */
const NavBar: React.FC = (): JSX.Element => {
  const [dropMenu, setDropMenu] = useState(false);
  const state = useSelector((store: RootState) => store.appState);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(state.name || '');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] =
    useState('');
  const urlAdd = useHistory();
  const isMarketplace = urlAdd.location.pathname === '/marketplace';

  const dispatch = useDispatch();
  const menuButtonRef = useRef(null);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertOpen2, setAlertOpen2] = React.useState<boolean>(false);
  const [deleteAlert, setDeleteAlert] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [loginAlert, setLoginAlert] = React.useState<boolean>(false);

  useEffect(() => {
    setProjectName(state.name);
  }, [state.name]);

  const deleteAlertOpen = () => {
    setDeleteAlert(true);
  };

  const openProjectAlert = () => {
    setOpenAlert(true);
  };

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const buttonStyle = {
    backgroundColor: '#2D313A',
    border: 'none',
    color: 'white',
    fontSize: '12px',
    padding: '8px 15px',
    cursor: 'pointer',
    marginRight: '10px',
    marginLeft: '5px',
    borderRadius: '10px'
  };

  const moreVertButtonStyle = {
    backgroundColor: '#1E2024',
    padding: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '4px',
    width: '30px',
    minWidth: '20px',
    marginLeft: '0px',
    marginRight: '10px',
    boxShadow: 'none'
  };

  const handlePublish = () => {
    if (state.isLoggedIn === true && projectName === '') {
      setInvalidProjectName(true);
      setPublishModalOpen(true);
      return;
    } else if (state.isLoggedIn === false) {
      setLoginAlert(true);
    } else {
      publishProject(projectName, state)
        .then((newProject: State) => {
          setPublishModalOpen(false);
          dispatch(updateProjectId(newProject._id));
          dispatch(updateProjectName(newProject.name));
          dispatch(updateProjectPublished(newProject.published));
          dispatch(toggleScreenshotTrigger());
          setAlertOpen(true);
        })
        .catch((error) => {
          console.error('Error publishing project:', error.message);
        });
    }
  };

  const handleUnpublish = () => {
    unpublishProject(state)
      .then((unpublishedProject: State) => {
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
    setLoginAlert(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <nav className="main-navbar" style={{ backgroundColor: '#1e2024' }}>
        <Link to="/" style={{ textDecoration: 'none', cursor: 'default' }}>
          <div className="main-logo">
            <Avatar src={logo}></Avatar>
            <h1 style={{ color: '#1e2024' }}>reactype</h1>
          </div>
        </Link>

        <div style={buttonContainerStyle}>
          {isMarketplace ? null : state.published ? (
            <button style={buttonStyle} onClick={handleUnpublish}>
              Unpublish
            </button>
          ) : (
            <button style={buttonStyle} onClick={handlePublish}>
              Import
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
            <MoreVertIcon
              style={{ color: 'white' }}
              data-testid="more-vert-button"
            />
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
        <Snackbar
          open={loginAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="error"
            sx={{ width: '100%', color: 'white' }}
          >
            Login to Publish!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default NavBar;
