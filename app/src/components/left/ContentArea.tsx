import { Box } from '@mui/material';
import ComponentsContainer from './ComponentsContainer';
import ElementsContainer from './ElementsContainer';
import React from 'react';
import RoomsContainer from './RoomsContainer';
import TreeContainer from './TreeContainer';

interface TabPanelProps {
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return <Box hidden={value !== index}>{value === index && children}</Box>;
};

const ContentArea: React.FC<{ value: number | null }> = ({ value }) => {
  if (value === null) {
    return null;
  }

  return (
    <div className="left-container">
      <div className="column left">
        <TabPanel value={value} index={0}>
          <ElementsContainer />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ComponentsContainer />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TreeContainer />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <RoomsContainer />
        </TabPanel>
      </div>
    </div>
  );
};

export default ContentArea;
