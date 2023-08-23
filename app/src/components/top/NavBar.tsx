import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavBarButtons from './NavBarButtons';
import NewExportButton from './NewExportButton';
import { RootState } from '../../redux/store';
import logo from '../../public/icons/win/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { publishProject } from '../../helperFunctions/projectGetSaveDel';
import PublishModal from './PublishModal';


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
    
    if (state.name === '') { 
      publishProject(state, projectName)
        .then(() => {
          console.log('Project published successfully');
          setPublishModalOpen(false);
        })
        .catch((error) => {
          console.error('Error publishing project:', error.message);
        });
      }
  };
  
  return (
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
        <button style={buttonStyle} onClick={handlePublish}>
          Publish
        </button>
        <NewExportButton />
        <Button
          style={moreVertButtonStyle}
          variant="contained"
          color="primary"
          onClick={() => setDropMenu((prevDropMenu) => !prevDropMenu)}
        >
          <MoreVertIcon style={{ color: 'white' }} />
        </Button>
        <NavBarButtons
          dropMenu={dropMenu}
          setDropMenu={setDropMenu}
          style={{ color: 'white' }}
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
  );
};

export default NavBar;
