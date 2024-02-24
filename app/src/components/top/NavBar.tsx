import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavBarButtons from './NavBarButtons';
import NewExportButton from './NewExportButton';
import { RootState } from '../../redux/store';
import logo from '../../public/icons/win/blue-R-white-bg.png';
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
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {
  Send,
  CancelScheduleSend,
  MoreVert,
  ManageSearch,
  Menu
} from '@mui/icons-material/';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@mui/material';

const NavBar: React.FC = () => {
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

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

  const Search = styled('div')(({ theme }) => ({
    color: 'white',
    backgroundColor: '#4a4a4a',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    display: 'flex', // Make the container a flex container
    alignItems: 'center' // Align items vertically
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 5, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(6)})`,
      transition: theme.transitions.create('width'),
      width: '10ch', // Adjust width as needed
      [theme.breakpoints.up('sm')]: {
        width: '50ch',
        '&:focus': {
          width: '60ch' // Adjust width as needed
        }
      }
    }
  }));

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
    margin: '0',
    justifyContent: 'flex-start',
    padding: '0'
  };

  const buttonStyle = {
    backgroundColor: '#333',
    border: 'none',
    color: 'lightgray',
    fontSize: '12px',
    padding: '8px 12px',
    cursor: 'pointer',
    marginRight: '10px',
    marginLeft: '5px',
    borderRadius: '4px'
  };

  const moreVertButtonStyle = {
    backgroundColor: 'black',
    padding: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '4px',
    width: '30px',
    minWidth: '20px',
    marginLeft: '0px',
    marginRight: '5rem'
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
      <nav className="main-navbar" style={{ backgroundColor: '#151515' }}>
        <Link to="/" style={{ textDecoration: 'none', cursor: 'default' }}>
          <div className="main-logo">
            <Avatar
              src={logo}
              sx={{
                width: '3rem',
                height: '3rem'
              }}
            />
          </div>
        </Link>

        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            ></Typography>
            <Search>
              <SearchIconWrapper>
                <ManageSearch sx={{ marginRight: '2rem' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </Box>

        <div style={buttonContainerStyle}>
          {isMarketplace ? null : state.published ? (
            <Button style={buttonStyle} onClick={handleUnpublish}>
              <CancelScheduleSend
                style={{ color: 'white', marginRight: '-1rem' }}
              />
            </Button>
          ) : (
            <Button onClick={handlePublish}>
              <Send style={{ color: '#86868b', marginRight: '-1rem' }} />
            </Button>
          )}
          <NewExportButton />
          <Button onClick={() => setDropMenu(!dropMenu)} ref={menuButtonRef}>
            <MoreVert
              style={{ color: '#86868b' }}
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
