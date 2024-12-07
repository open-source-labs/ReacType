import React, { useState } from 'react';
import { Tab } from '@mui/material';
import { AddBox, Folder, Groups2 } from '@mui/icons-material';

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
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

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
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: isCollabTab ? '120px' : 'none',
            marginTop: !isCollabTab ? '45px' : 'none',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '5px 10px',
            backgroundColor: '#333',
            color: '#f0f0f0',
            borderRadius: '4px',
            fontSize: '11px',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {label}
          <div
            style={{
              position: 'absolute',
              top: isCollabTab ? '100%' : '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: !isCollabTab ? '5px solid #333' : 'none',
              borderTop: isCollabTab ? '5px solid #333' : 'none',

            }}
          />
        </div>
      )}

      {/* Tab */}
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
          opacity: 1,
        }}
        icon={iconType}
        value={value}
        onClick={(event) => handleTabChange(event, value)}
      />
    </div>
  );
};

export default TabWithTooltip;
