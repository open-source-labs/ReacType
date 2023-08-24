import { Tab, Tabs } from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { IoMdCube } from 'react-icons/io';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';

interface SidebarProps {
  activeTab: number | null;
  setActiveTab: (value: number | null) => void;
  toggleVisibility: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  toggleVisibility
}) => {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (activeTab === newValue) {
      setActiveTab(null);
      toggleVisibility(false); // Hide the left-container when the same tab is clicked again
    } else {
      setActiveTab(newValue);
      toggleVisibility(true); // Show the left-container when another tab is activated
    }
  };

  return (
    <Tabs
      key={activeTab}
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
        sx={{
          color: activeTab === 0 ? '#C6C6C6' : '#4A4A4A',
          '&.Mui-selected': { color: '#C6C6C6' }
        }}
        icon={<AddBoxIcon sx={{ fontSize: '36px' }} />}
        value={0}
      />
      <Tab
        sx={{
          color: activeTab === 1 ? '#C6C6C6' : '#4A4A4A',
          '&.Mui-selected': { color: '#C6C6C6' }
        }}
        icon={<IoMdCube style={{ fontSize: '33px' }} />}
        value={1}
      />
      <Tab
        sx={{
          color: activeTab === 2 ? '#C6C6C6' : '#4A4A4A',
          '&.Mui-selected': { color: '#C6C6C6' }
        }}
        icon={<PeopleIcon sx={{ fontSize: '36px' }} />}
        value={2}
      />
    </Tabs>
  );
};

export default Sidebar;
