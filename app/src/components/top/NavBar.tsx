import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import NavbarDropDown from './NavBarButtons';
import { RootState } from '../../redux/store';
import logo from '../../public/icons/win/logo.png';
import NewExportButton from './NewExportButton';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavBarButtons from './NavBarButtons';

const NavBar = () => {
  const [dropMenu, setDropMenu] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    borderRadius: '4px',
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
    marginRight: '10px',
  };

  return (
    <nav className="main-navbar" style={isDarkMode ? { backgroundColor: '#013365' } : { backgroundColor: 'white' }}>
      <Link to="/" style={{textDecoration: 'none'}}> 
      <div className="main-logo">
        <Avatar src={logo}></Avatar>
        <h1 style={isDarkMode ? { color: 'white' } : { color: '#013365' }}>ReacType</h1>
      </div>
      </Link>  
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Share</button>
        <NewExportButton />
        <Button
          style={moreVertButtonStyle}
          variant="contained"
          color="primary"
          onClick={() => setDropMenu((prevDropMenu) => !prevDropMenu)}
        >
          <MoreVertIcon style={{ color: 'white' }} />
        </Button>
        <NavBarButtons dropMenu={dropMenu} setDropMenu={setDropMenu} style={{ color: 'white' }} />
      </div>
    </nav>
  );
};

export default NavBar;
