import React from 'react';
import { Tab } from '@mui/material';
import { AddBox, Folder, Groups2 } from '@mui/icons-material';
import Tooltip from '../Tooltip';

interface TabWithTooltipProps {
  label: string;
  value: number;
  activeTab: number;
  handleTabChange: (event: React.ChangeEvent<{}>, value: number) => void;
}

const TabWithTooltip: React.FC<TabWithTooltipProps> = ({
  label,
  value,
  activeTab,
  handleTabChange
}) => {
  let iconType;
  if (value === 0) {
    iconType = <Folder sx={{ fontSize: '25px' }} />;
  } else if (value === 1) {
    iconType = <AddBox sx={{ fontSize: '26px' }} />;
  } else if (value === 2) {
    iconType = <Groups2 sx={{ fontSize: '28px' }} />;
  }

  const isCollabTab = label === 'Collab';

  return (
    <Tooltip label={label} isCollabTab={isCollabTab}>
      <Tab
        sx={{
          color: activeTab === value ? '#f88e16' : '#9C9D9F',
          backgroundColor: activeTab === value && '#2D313A',
          '&.Mui-selected': { color: '#f88e16' },
          '&:hover': { color: '#f88e16' },
          fontSize: '11px',
          textTransform: 'none',
          position: isCollabTab ? 'absolute' : 'relative',
          bottom: isCollabTab ? '80px' : 'auto',
          opacity: 1
        }}
        icon={iconType}
        value={value}
        onClick={(event) => handleTabChange(event, value)}
      />
    </Tooltip>
  );
};

export default TabWithTooltip;
