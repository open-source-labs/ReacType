import { Tab, Tabs } from '@mui/material';

import { AddBox, Groups2, AccountBox, Settings } from '@mui/icons-material';
import { IoMdCube } from 'react-icons/io';
import React from 'react';

interface SidebarProps {
  activeTab: number | null;
  setActiveTab: (value: number | null) => void;
  toggleVisibility: (state: boolean) => void;
}

let oldValue = 0;

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  toggleVisibility
}) => {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
    toggleVisibility(true);
    oldValue = newValue;
  };

    //the following allows users to click on the left panel to expand and collapse.
  // We decided to freeze so we've commented this and line 41 out

  // const handleTabClick = (event: React.MouseEvent, oldValue: number) => {
  //   if (activeTab === oldValue) {
  //     setActiveTab(null);
  //     // toggleVisibility(false);
  //   }
  // };

  return (
    <Tabs
      key={activeTab}
      orientation="vertical"
      variant="scrollable"
      value={activeTab}
      onChange={handleTabChange}
      // onClick={(e: React.MouseEvent) => handleTabClick(e, oldValue)}
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
        gap: '50px',
        width: '70px',
        background: '#1e2024',
        marginRight: '2px',
        height: '100vh'
      }}
    >
      <Tab sx={{ position: 'absolute', visibility: 'hidden' }} value={null} />
      <Tab
        sx={{
          color: activeTab === 0 ? '#E4E4E5' : '#9C9D9F',
          backgroundColor: activeTab === 0 && '#2D313A',
          '&.Mui-selected': { color: '#E4E4E5' },
          '&:hover': { color: '#e9e9e9' },
          fontSize: '11px',
          textTransform: 'none'
        }}
        icon={<AddBox sx={{ fontSize: '26px' }} />}
        value={0}
        label="Canvas"
      />
      <Tab
        sx={{
          color: activeTab === 1 ? '#E4E4E5' : '#9C9D9F',
          backgroundColor: activeTab === 1 && '#2D313A',
          '&.Mui-selected': { color: '#E4E4E5' },
          '&:hover': { color: '#e9e9e9' },
          fontSize: '11px',
          textTransform: 'none'
        }}
        icon={<IoMdCube style={{ fontSize: '25px' }} />}
        value={1}
        label="Create"
      />
      <Tab
        sx={{
          color: activeTab === 2 ? '#E4E4E5' : '#9C9D9F',
          backgroundColor: activeTab === 2 && '#2D313A',
          '&.Mui-selected': { color: '#E4E4E5' },
          '&:hover': { color: '#e9e9e9' },
          fontSize: '11px',
          textTransform: 'none'
        }}
        icon={<Groups2 sx={{ fontSize: '28px' }} />}
        value={2}
        label="Collab"
      />
      <Tab
        sx={{
          color: activeTab === 3 ? '#E4E4E5' : '#9C9D9F',
          backgroundColor: activeTab === 3 && '#2D313A',
          '&.Mui-selected': { color: '#E4E4E5' },
          '&:hover': { color: '#e9e9e9' },
          fontSize: '11px',
          textTransform: 'none'
        }}
        icon={<AccountBox sx={{ fontSize: '26px' }} />}
        value={3}
        label="Profile"
      />
      <Tab
        sx={{
          color: activeTab === 4 ? '#E4E4E5' : '#9C9D9F',
          backgroundColor: activeTab === 4 && '#2D313A',
          '&.Mui-selected': { color: '#E4E4E5' },
          '&:hover': { color: '#e9e9e9' },
          fontSize: '11px',
          textTransform: 'none'
        }}
        icon={<Settings sx={{ fontSize: '26px' }} />}
        value={4}
        label="Settings"
      />
    </Tabs>
  );
};

export default Sidebar;
