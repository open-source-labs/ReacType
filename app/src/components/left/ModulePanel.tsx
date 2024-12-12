import React, { useState } from 'react';

import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ComponentDrag from './ComponentDrag';
import ComponentPanel from '../right/ComponentPanel';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import ComponentsContainer from './ComponentsContainer';
import CreateMenu from './CreateMenu';

interface ModulePanelProps {
  isThemeLight: boolean;
}

const ModulePanel: React.FC<ModulePanelProps> = ({ isThemeLight }) => {
  const state = useSelector((store: RootState) => store.appState);
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);

  const handleClickAddModule = () => {
    setIsCreatingModule(true);
  };

  const handleClickEditModule = () => {
    setIsEditingModule(!isEditingModule);
  };

  // Make visibility of custom components conditional ⭕️

  return (
    <div>
      {isEditingModule ? (
        <CreateMenu />
      ) : (
        <div>
          {/* {isCreatingModule ? ( */}
            <ComponentPanel setIsCreatingModule={setIsCreatingModule} isThemeLight={false}/>
          {/* ) : (
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
            */}
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
          <ComponentDrag
            isVisible={true} 
            isThemeLight={false}
            handleClickEditModule={handleClickEditModule}
          />
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
          <ComponentsContainer handleClickEditModule={handleClickEditModule} />
        </div>
      )}
    </div>
  );
};

export default ModulePanel;
