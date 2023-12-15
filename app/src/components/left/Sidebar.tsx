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

let oldValue = 0;

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  toggleVisibility
}) => {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
    toggleVisibility(true);// Show the left-container when a different tab is clicked 
    oldValue = newValue;//setting the oldvalue to match the new tab
  };

  const handleTabClick = (event: React.MouseEvent, oldValue: number) => {
    if (activeTab === oldValue) { //if the person is clicking the same tab, oldValue should match activeTab since it did not trigger an onChange
      setActiveTab(null);
      toggleVisibility(false); // Hide the left-container when the same tab is clicked again
    }
  }

  return (
    <Tabs
      key={activeTab}
      orientation="vertical"
      variant="scrollable"
      value={activeTab}
      onChange = {handleTabChange}
      onClick = {(e: React.MouseEvent) => handleTabClick(e, oldValue)}
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
        height: '100vh',
      }}
    >
      <Tab sx={{position: 'absolute', visibility: "hidden"}} value={null}/>
      <Tab
        sx={{
          color: activeTab === 0 ? '#a5ead6' : '#4A4A4A',
          '&.Mui-selected': { color: '#a5ead6' },
          '&:hover': { color: '#d2f5eb' }
        }}
        icon={<AddBoxIcon sx={{ fontSize: '36px' }} />}
        value={0}
      />
      <Tab
        sx={{
          color: activeTab === 1 ? '#a5ead6' : '#4A4A4A',
          '&.Mui-selected': { color: '#a5ead6' },
          '&:hover': { color: '#d2f5eb' }
        }}
        icon={<IoMdCube style={{ fontSize: '33px' }} />}
        value={1}
      />
      <Tab
        sx={{
          color: activeTab === 2 ? '#a5ead6' : '#4A4A4A',
          '&.Mui-selected': { color: '#a5ead6' },
          '&:hover': { color: '#d2f5eb' }
        }}
        icon={<PeopleIcon sx={{ fontSize: '36px' }} />}
        value={2}
      />
    </Tabs>
  );
};

export default Sidebar;
