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

interface ModulePanelProps {
  isThemeLight: boolean;
}

const ModulePanel: React.FC<ModulePanelProps> = ({ isThemeLight }) => {
  const [modules, setModules] = useState<any[]>(['App']);
  const [hasCustomModules, setHasCustomModules] = useState(false);

  const [editingModule, setEditingModule] = useState<any | null>(null);

  // add module

  // HandleEditingModule

  // HandleSaveModule

  return (
    <div>
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
        >
          Add Custom Module
        </Button>
      </div>
      <div
        style={{
          color: '#f88e16',
          textAlign: 'center',
          padding: '20px',
          border: '1px solid #101012'
        }}
      >
        Modules
      </div>

      <ComponentDrag isVisible={true} isThemeLight={false} />
      {/* <DragDropPanel /> */}

      {/*

      <ComponentDrag isVisible={true} isThemeLight={isThemeLight} />

      <Accordion
        sx={{
          backgroundColor: '#0b0b0b',
          color: '#ffffff'
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: '#101012',
            color: '#ffffff',
            '&.MuiAccordion-root': { backgroundColor: '#0b0b0b' }
          }}
        >
          <h3>Root Components</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ComponentDrag isVisible={true} isThemeLight={isThemeLight} />
        </AccordionDetails>
      </Accordion>

      {hasCustomModules && (
        <Accordion
          sx={{
            backgroundColor: '#0b0b0b',
            color: '#ffffff'
          }}
        >
          // TODO: Set visibility to true if there are any custom components
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: '#101012',
              color: '#ffffff',
              '&.MuiAccordion-root': { backgroundColor: '#0b0b0b' }
            }}
          >
            <h3>Custom Components</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ComponentDrag isVisible={true} isThemeLight={isThemeLight} />
          </AccordionDetails>
        </Accordion>
      )}
       */}
    </div>
  );
};

export default ModulePanel;

// Add Module button
// Accordian style list of modules

// showModuleEditor && <ModuleEditor/>

// create ModuleEditor.tsx
// this will pull features from the creation panel
