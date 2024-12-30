import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ComponentDrag from './ComponentDrag';
import ComponentPanel from '../right/ComponentPanel';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import ComponentsContainer from './ComponentsContainer';
import CreatePanel from './CreatePanel';
import HeaderButton from './HeaderButton';
import HTMLItem from './HtmlItem';
import Grid from '@mui/material/Grid';
import HTMLTypes from './redux/HTMLTypes';

interface ModulePanelProps {
  isThemeLight: boolean;
}
const ModulePanel: React.FC<ModulePanelProps> = ({ isThemeLight }) => {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const dispatch = useDispatch();

  const customComponents = state.components.filter(
    (comp) => !state.rootComponents.includes(comp.id)
  );

  const handleClickAddModule = () => {
    setIsCreatingModule(true);
  };

  const handleClickEditModule = () => {
    setIsEditingModule(!isEditingModule);
  };

  const handleDelete = (id: number): void => {
    dispatch(deleteElement({ id: id, contextParam: contextParam }));
    if (roomCode) {
      emitEvent('deleteElementAction', roomCode, {
        id,
        contextParam
      });
    }
  };

  const htmlTypesToRender = state.HTMLTypes.filter(
    (type) => type.name !== 'separator'
  );

  return (
    <div className="modulePanelContainer">
      {isEditingModule ? (
        <CreatePanel />
      ) : (
        <div className="createComponent">
          <HeaderButton
            isThemeLight={true}
            infoText={
              'Add modules to create a canvas for grouping your components.'
            }
            headerName={'headerName'}
          />
          <ComponentPanel
            setIsCreatingModule={setIsCreatingModule}
            isThemeLight={false}
          />
          <Grid container justifyContent="space-around" columnSpacing={2}>
            {htmlTypesToRender.map((option) => {
              if (
                (option.name === 'Switch' ||
                  option.name === 'LinkTo' ||
                  option.name === 'Route') &&
                state.projectType === 'Classic React'
              ) {
                return (
                  <HTMLItem
                    name={option.name}
                    key={`html-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              }
            })}
          </Grid>
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
    </div>
  );
};

export default ModulePanel;
