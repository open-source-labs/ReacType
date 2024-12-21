import React, { useState } from 'react';

import { Button, Box } from '@mui/material';
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

  const customComponents = state.components.filter(
    (comp) => !state.rootComponents.includes(comp.id)
  );

  const handleClickAddModule = () => {
    setIsCreatingModule(true);
  };

  const handleClickEditModule = () => {
    setIsEditingModule(!isEditingModule);
  };

  // Make visibility of custom components conditional ⭕️

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        color: '#f7f4dc',
        textAlign: 'center',
        marginLeft: '15px'
      }}
    >
      {isEditingModule ? (
        <CreateMenu isThemeLight={true} />
      ) : (
        <div>
          <Button component="label">{'Create Modules'}</Button>
          {/* {isCreatingModule ? ( */}
          <ComponentPanel
            setIsCreatingModule={setIsCreatingModule}
            isThemeLight={false}
          />
          <ComponentDrag
            isVisible={true}
            isThemeLight={false}
            handleClickEditModule={handleClickEditModule}
          />

          {customComponents.length > 0 && (
            <div>
              <div
                style={{
                  color: '#f88e16',
                  textAlign: 'center',
                  padding: '20px'
                  //   border: '1px solid #101012'
                }}
              >
                Other Modules
              </div>
              <ComponentsContainer
                handleClickEditModule={handleClickEditModule}
              />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default ModulePanel;
