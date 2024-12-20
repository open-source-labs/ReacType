/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import { deleteElement } from '../../redux/reducers/slice/appStateSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertPhoto from '@mui/icons-material/InsertPhoto';
import MUIItem from './MUIItem';
import HTMLItem from './HTMLItem';
import HTMLPanel from './HTMLPanel';
import ComponentDrag from './ComponentDrag';

/**
 * Provides a user interface for managing MUI components in the application. It features accordions for different categories
 * of MUI components like Inputs, Data Display, Feedback, etc. Each category can be expanded to show respective MUI components
 * that can be dragged onto a canvas or deleted. It uses the `MUIItem` component to render each item and supports deleting items through a centralized method.
 *
 * @component
 * @param {Object} props - Component props, currently unused in the component's body and may be intended for future features or extensions.
 *
 * @returns {JSX.Element} The MUIDragDropPanel component, which renders an interactive list of MUI components categorized by function.
 */

const CreateMenu = (props): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );
  const [menuLocked, setMenuLocked] = useState(false);

  const [isCreatingModule, setCreateModule] = useState(false);
  const [MUIMode, setMUIMode] = useState(false);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    setActiveCategory(category);
    setMenuAnchor(event.currentTarget);
    setMenuLocked(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMUIMode(event.target.checked);
  };

  const handleMenuClose = (event: React.onMouseLeave) => {
    if (!menuLocked) {
      setMenuAnchor(null);
      setActiveCategory(null);
    } else {
      setMenuAnchor(null);
    }
  };

  const handleMenuClick = (category: string) => {
    if (menuLocked && activeCategory === category) {
      setMenuLocked(false);
      handleMenuClose();
    } else setMenuLocked(true);
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

  const handleClickAdd = () => {
    setCreateModule(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickAdd();
    }
  };
  // create a function to which you can pass in an array of strings, search
  // both state.HTMLTypes and state.MUITypes to see if any of their type.names match
  // an item in the array and return the item if so, depending on which list it originates from.
  const findTypes = function (array) {
    if (MUIMode === true)
      return state.HTMLTypes.filter((type) => array.includes(type.name))
        .map((option) => (
          <HTMLItem
            name={option.name}
            key={`html-${option.name}${option.id}`}
            id={option.id}
            icon={option.icon}
            handleDelete={handleDelete}
          />
        ))
        .concat(
          state.MUITypes.filter((type) => array.includes(type.name)).map(
            (option) => (
              <MUIItem
                name={option.name}
                key={`mui-${option.name}${option.id}`}
                id={option.id}
                icon={option.icon}
                handleDelete={handleDelete}
              />
            )
          )
        );
    else
      return state.HTMLTypes.filter((type) => array.includes(type.name)).map(
        (option) => (
          <HTMLItem
            name={option.name}
            key={`html-${option.name}${option.id}`}
            id={option.id}
            icon={option.icon}
            handleDelete={handleDelete}
          />
        )
      );
  };
  const HTMLElements = findTypes([
    'Img',
    'Paragraph',
    'Header 1',
    'Header 2',
    'Span',
    'Label',
    'Link'
  ]);

  const InputElements = findTypes(['Input', 'Form', 'Button']);
  const visualComponents = findTypes([
    'Image List',
    'Icon',
    'Avatar',
    'Badge',
    'Img'
  ]);

  const textComponents = findTypes([
    'Paragraph',
    'Header 1',
    'Header 2',
    'Span',
    'Label',
    'Link'
  ]);

  // create containers - box/container/stack

  const containers = findTypes([
    'Div',
    'Box',
    'Container',
    'Stack',
    'Dividers'
  ]);

  // create buttons -- button/floating button/chips

  const buttons = findTypes(['Button', 'Fab', 'Chip']);

  // create inputs -- textfield, checkbox, switch, rating, sliders

  const inputs = findTypes([
    'Input',
    'Form',
    'TextField',
    'Checkbox',
    'Switch',
    'Rating',
    'Slider'
  ]);

  // create lists - OL, UL, LI, TransferList

  const lists = findTypes(['Ordered List', 'List', 'Unordered List']);
  //create forms -- Form, ButtonGroup, ToggleButtonGroup, Select, AutoComplete
  const HTMLlists = findTypes([
    'Ordered List',
    'List',
    'Unordered List',
    'Menu'
  ]);
  const forms = findTypes([
    'Form',
    'ButtonGroup',
    'ToggleButtonGroup',
    'Select',
    'AutoComplete'
  ]);
  // create displays --- Modal, POpover, Popper, Transition
  const displays = findTypes(['Modal', 'Popover', 'Popper', 'Transition']);
  // create layouts -- table, accordion, appbar, tabs
  const layouts = findTypes([
    'Table',
    'Grid',
    'Accordion',
    'AppBar',
    'Tabs',
    'Card',
    'Paper'
  ]);
  // create navigation -- menu, bottomnav, breadcrumbs, drawer, stepper, tabs, speeddial
  const navComponents = findTypes([
    'Menu',
    'Bottom Navigation',
    'Breadcrumbs',
    'Drawer',
    'Stepper',
    'Speed Dial'
  ]);

  const makeMenuCategory = function (typeArray, name, idx) {
    return (
      <>
        <Box
          sx={{
            fontSize: '2rem',
            textAlign: 'center'
          }}
        >
          <Button component="label" id={name + '-button'} key={name + idx}>
            {name}
          </Button>
        </Box>
        <Grid container spacing={2}>
          {typeArray}
        </Grid>
      </>
    );
  };

  return (
    <div className={'MUIItems'}>
      <HTMLPanel isThemeLight={props.isThemeLight} />

      {makeMenuCategory([
        state.HTMLTypes.filter((type) => type.id > 10000).map((option) => (
          <HTMLItem
            name={option.name}
            key={`html-${option.name}${option.id}`}
            id={option.id}
            icon={option.icon}
            handleDelete={handleDelete}
          />
        ))
      ])}
      <FormGroup>
        <Box display="flex" alignItems="center" justifyContent="center">
          <p className="smallerText" id="HTML-switch">
            HTML
          </p>
          <Switch
            checked={MUIMode}
            onChange={() => setMUIMode(!MUIMode)}
            inputProps={{ 'aria-label': 'HTML + MUI switch' }}
            sx={{ margin: '0 10px' }} // Adjust spacing between text and switch
          />
          <p className="smallerText">
            <span className="orangeText">HTML {'+'} MUI</span>
          </p>
        </Box>
      </FormGroup>
      {MUIMode
        ? [
            [visualComponents, 'visual'],
            [containers, 'containers'],
            [buttons, 'buttons'],
            [textComponents, 'text'],
            [lists, 'lists'],
            [displays, 'displays'],
            [layouts, 'layouts'],
            [forms, 'forms'],
            [navComponents, 'navigation']
          ].map((item, idx) => makeMenuCategory(item[0], item[1], idx))
        : [
            [HTMLElements, 'Text and Visual'],
            [InputElements, 'Forms and Inputs'],
            [HTMLlists, 'lists']
          ].map((item, idx) => makeMenuCategory(item[0], item[1], idx))}
    </div>
  );
};

export default CreateMenu;
