import { Box } from '@mui/material';
import ComponentsContainer from './ComponentsContainer';
import ElementsContainer from './ElementsContainer';
import React from 'react';
import RoomsContainer from './RoomsContainer';
import TreeContainer from './TreeContainer';

interface TabPanelProps {
  activeTab: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, activeTab, index }) => {
  return (
    <Box hidden={activeTab !== index}>{activeTab === index && children}</Box>
  );
};

const panels = [
  <ElementsContainer />,
  <ComponentsContainer />,
  <TreeContainer />,
  <RoomsContainer />
];

const ContentArea: React.FC<{ activeTab: number | null }> = ({ activeTab }) => {
  return (
    <div className="left-container">
      <div className="column left">
        {panels.map((panel, idx) => (
          <TabPanel key={idx} activeTab={activeTab} index={idx}>
            {panel}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;
