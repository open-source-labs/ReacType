import { Tab, Tabs } from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { IoMdCube } from 'react-icons/io';
import LanIcon from '@mui/icons-material/Lan';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';

interface SidebarProps {
  activeTab: number | null;
  setActiveTab: (value: number | null) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (activeTab === newValue) {
      setActiveTab(null);
    } else {
      setActiveTab(newValue);
    }
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={activeTab}
      onChange={handleTabChange}
      TabIndicatorProps={{
        style: {
          backgroundColor: '#4A4A4A'
        }
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        paddingTop: '15px',
        gap: '50px',
        width: 67,
        background: '#151515',
        height: '100vh'
      }}
    >
      <Tab
        sx={{ '&.Mui-selected': { color: 'red' } }}
        icon={<AddBoxIcon sx={{ color: '#C6C6C6', fontSize: '36px' }} />}
        value={0}
      />
      <Tab
        sx={{ '&.Mui-selected': { color: 'red' } }}
        icon={<IoMdCube style={{ color: '#C6C6C6', fontSize: '33px' }} />}
        value={1}
      />
      <Tab
        sx={{ '&.Mui-selected': { color: 'red' } }}
        icon={<LanIcon sx={{ color: '#C6C6C6', fontSize: '36px' }} />}
        value={2}
      />
      <Tab
        sx={{ '&.Mui-selected': { color: 'red' } }}
        icon={<PeopleIcon sx={{ color: '#C6C6C6', fontSize: '36px' }} />}
        value={3}
      />
    </Tabs>
  );
};

export default Sidebar;
