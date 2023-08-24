import { Box } from '@mui/material';
import ComponentsContainer from './ComponentsContainer';
import ElementsContainer from './ElementsContainer';
import React from 'react';
import RoomsContainer from './RoomsContainer';
import TreeContainer from './TreeContainer';

interface ContentAreaProps {
  activeTab: number | null;
  isVisible: boolean;
}

const TabPanel: React.FC<{
  children: React.ReactNode;
  activeTab: number | null;
  index: number;
}> = ({ children, activeTab, index }) => {
  return (
    <Box hidden={activeTab !== index}>{activeTab === index && children}</Box>
  );
};

const panels = [
  <ElementsContainer />,
  <ComponentsContainer />,
  <RoomsContainer />
];
const ContentArea: React.FC<ContentAreaProps> = ({ activeTab, isVisible }) => {
  return (
    <div
      className="left-container"
      style={{ display: isVisible ? 'block' : 'none' }} // Visibility based on activeTab
    >
      <div className="column left">
        {panels.map((panel, idx) => (
          <TabPanel activeTab={activeTab} index={idx}>
            {panel}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;
