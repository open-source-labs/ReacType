import React, { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ComponentDrag from './ComponentDrag';
import { AddCircle } from '@mui/icons-material';
import DragDropPanel from './DragDropPanel';
import ComponentPanel from '../right/ComponentPanel';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import ComponentsContainer from './ComponentsContainer';

interface ModulePanelProps {
  isThemeLight: boolean;
}

const ModulePanel: React.FC<ModulePanelProps> = ({ isThemeLight }) => {
  // Instead of using useState, use the Redux store
  const [modules, setModules] = useState<any[]>(['App']);
  const state = useSelector((store: RootState) => store.appState);

  const [isCreatingModule, setIsCreatingModule] = useState(false);

  const handleClickAddModule = (event) => {
    setIsCreatingModule(true);
  };

  // Add an edit icon on the modules 
        // When edit icon is clicked open up create tab for that module

  // Module editor when clicking on a component ❌
  // should display the selected module

  return (
    <div>
      {isCreatingModule ? (
        <ComponentPanel
          setIsCreatingModule={setIsCreatingModule}
          isThemeLight={false}
        />
      ) : (
        <div style={{ display: 'grid', placeItems: 'center', margin: '30px' }}>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            style={{
              backgroundColor: '#f88e16',
              border: 'none',
              color: 'white',
              fontSize: '12px',
              padding: '2px 15px',
              cursor: 'pointer',
              marginRight: '10px',
              marginLeft: '5px',
              borderRadius: '10px'
            }}
            onClick={handleClickAddModule}
          >
            Add Module
          </Button>
        </div>
      )}
      <div
        style={{
          color: '#f88e16',
          textAlign: 'center',
          padding: '20px',
          border: '1px solid #101012'
        }}
      >
        Root Modules
      </div>
      <ComponentDrag isVisible={true} isThemeLight={false} />
      <div
        style={{
          color: '#f88e16',
          textAlign: 'center',
          padding: '20px',
          border: '1px solid #101012'
        }}
      >
        Custom Modules
      </div>
      <ComponentsContainer />
    </div>
  );
};

export default ModulePanel;
