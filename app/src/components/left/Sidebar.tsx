/* eslint-disable max-len */
import { Tab, Tabs, Tooltip } from '@mui/material';

import { AddBox, Groups2, Folder } from '@mui/icons-material';
import React from 'react';
import TabWithTooltip from './TabWithTooltip';

interface SidebarProps {
  activeTab: number | null;
  setActiveTab: (value: number | null) => void;
  toggleVisibility: (state: boolean) => void;
}

let oldValue = 0;

/**
 * Renders a vertical sidebar with navigational tabs. Each tab can activate a different view in the application.
 * The `Sidebar` component manages which tab is currently active and can toggle the visibility of associated views.
 *
 * Props:
 * @param {number | null} activeTab - The index of the currently active tab or null if no tab is selected.
 * @param {(value: number | null) => void} setActiveTab - Function to set the active tab.
 * @param {(state: boolean) => void} toggleVisibility - Function to toggle the visibility of the sidebar.
 *
 * The component uses MUI `Tabs` and `Tab` components to create a vertical sidebar where each tab corresponds
 * to a section of the application. It handles tab changes and can conditionally render components based on
 * the active tab. The `handleTabChange` function updates the active tab and ensures the sidebar is visible
 * when a tab is clicked.
 *
 * @component
 * @example
 * return (
 *   <Sidebar
 *     activeTab={1}
 *     setActiveTab={setActiveTabFunction}
 *     toggleVisibility={toggleSidebarVisibility}
 *   />
 * )
 */
const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  toggleVisibility,
}): JSX.Element => {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(activeTab === newValue ? null : newValue);
    toggleVisibility(true);
    oldValue = newValue;
  };

  // the following allows users to click on the left panel to expand and collapse.
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
          backgroundColor: '#4A4A4A',
        },
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '50px',
        width: '70px',
        background: '#1e2024',
        marginRight: '2px',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Tab sx={{ position: 'absolute', visibility: 'hidden' }} value={null} />
      <div>
        <TabWithTooltip
          label="Modules"
          value={0}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <TabWithTooltip
          label="Create"
          value={1}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <TabWithTooltip
          label="Collab"
          value={2}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </div>
    </Tabs>
  );
};

export default Sidebar;
