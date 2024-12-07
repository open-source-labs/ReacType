import React, { useState } from 'react';

interface TooltipProps {
  label: string;
  isCollabTab: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ label, isCollabTab, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
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
            transition: 'opacity 0.3s ease'
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
              borderTop: isCollabTab ? '5px solid #333' : 'none'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
