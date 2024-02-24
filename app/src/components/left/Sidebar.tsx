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
        paddingTop: '15px',
        gap: '50px',
        width: 67,
        background: '#151515',
        height: '100vh'
      }}
    >
      <Tab sx={{ position: 'absolute', visibility: 'hidden' }} value={null} />
      <Tab
        sx={{
          color: activeTab === 0 ? '#c7c5c5' : '#4A4A4A',
          '&.Mui-selected': { color: '#c7c5c5' },
          '&:hover': { color: '#e9e9e9' }
        }}
        icon={<AddBox sx={{ fontSize: '36px' }} />}
        value={0}
      />
      <Tab
        sx={{
          color: activeTab === 1 ? '#c7c5c5' : '#4A4A4A',
          '&.Mui-selected': { color: '#c7c5c5' },
          '&:hover': { color: '#e9e9e9' }
        }}
        icon={<IoMdCube style={{ fontSize: '33px' }} />}
        value={1}
      />
      <Tab
        sx={{
          color: activeTab === 2 ? '#c7c5c5' : '#4A4A4A',
          '&.Mui-selected': { color: '#c7c5c5' },
          '&:hover': { color: '#e9e9e9' }
        }}
        icon={<Groups2 sx={{ fontSize: '36px' }} />}
        value={2}
      />
      <Tab
        sx={{
          color: activeTab === 3 ? '#c7c5c5' : '#4A4A4A',
          '&.Mui-selected': { color: '#c7c5c5' },
          '&:hover': { color: '#e9e9e9' }
        }}
        icon={<AccountBox sx={{ fontSize: '36px' }} />}
        value={3}
      />
      <Tab
        sx={{
          color: activeTab === 4 ? '#c7c5c5' : '#4A4A4A',
          '&.Mui-selected': { color: '#c7c5c5' },
          '&:hover': { color: '#e9e9e9' }
        }}
        icon={<Settings sx={{ fontSize: '36px' }} />}
        value={4}
      />
    </Tabs>
  );
};

export default Sidebar;
