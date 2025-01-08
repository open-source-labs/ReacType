import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
        <div
          className="createComponent"
          style={{
            color: '#f7f4dc',
            textAlign: 'center'
          }}
        >
          <CreatePanel key="createPanel2" />
        </div>
      ) : (
        <div
          className="createComponent"
          style={{
            color: '#f88e16',
            textAlign: 'center'
          }}
        >
          <HeaderButton
            infoText={`Add modules to create a canvas for grouping your components.
            Once created, you can drag modules into other modules to link them.
              Each module will be exported as its own file.`}
            headerName={'Add Modules'}
          />
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
                  textAlign: 'center'

                  //   border: '1px solid #101012'
                }}
              >
                <HeaderButton
                  headerName="Other Modules"
                  infoText="Try to organize each of your modules by its specific function. For example, create a module for a container, a helper function, or a component."
                  id="otherModulesBtn"
                />
              </div>
              <ComponentsContainer
                handleClickEditModule={handleClickEditModule}
              />
            </div>
          )}
        </div>
      )}
      <div
        className="createComponent"
        style={{
          color: '#f88e16',
          textAlign: 'center'
        }}
      >
        <HeaderButton
          headerName="Add Router"
          infoText={`The React Router allows you to switch between parts of your application depending on the path chosen by the user. 
          Add the Switch first, then add a route for each path you'd like to specify for your user.`}
          id={'addRouterBtn'}
        />
      </div>
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
    </div>
  );
};

export default ModulePanel;
