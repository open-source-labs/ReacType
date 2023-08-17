import { useHistory, useLocation } from 'react-router-dom';

import AddBoxIcon from '@mui/icons-material/AddBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProfileIcon from '@mui/icons-material/Person';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const navigate = (path: string) => {
    if (location.pathname === path) {
      history.push(path, { hideContent: true });
    } else {
      history.push(path, { hideContent: false });
    }
  };

  return (
    <div
      style={{
        width: '65px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        position: 'relative',
        height: '100vh',
        background: '#151515',
        zIndex: 9999
      }}
    >
      <AddBoxIcon
        style={{ margin: '10px', color: 'white' }}
        onClick={() => navigate('/elements')}
      />
      <SettingsIcon
        style={{ margin: '10px', color: 'white' }}
        onClick={() => navigate('/reuseable')}
      />
      <ProfileIcon
        style={{ margin: '10px', color: 'white' }}
        onClick={() => navigate('/component-tree')}
      />
      <NotificationsIcon
        style={{ margin: '10px', color: 'white' }}
        onClick={() => navigate('/rooms')}
      />
    </div>
  );
};

export default Sidebar;
