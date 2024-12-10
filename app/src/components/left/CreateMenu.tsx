/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import MUIItem from './MUIItem';
import HTMLItem from './HTMLItem';
import React from 'react';
import { RootState } from '../../redux/store';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
/*to be deleted*/
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
/*to be deleted ^*/

import { Icon } from '@mui/material';
import ComponentDrag from './ComponentDrag';
import { emitEvent } from '../../helperFunctions/socket';
import { deleteElement } from '../../redux/reducers/slice/appStateSlice';

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

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    setActiveCategory(category);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveCategory(null);
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

  //create a function to which you can pass in an array of strings, search
  //both state.HTMLTypes and state.MUITypes to see if any of their type.names match
  //an item in the array and return the item if so, depending on which list it originates from.

  const findTypes = function (array) {
    return state.HTMLTypes.filter((type) => array.includes(type.name))
      .map((option) => (
        <HTMLItem
          name={option.name}
          key={`html-${option.name}`}
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
              key={`html-${option.name}`}
              id={option.id}
              icon={option.icon}
              handleDelete={handleDelete}
            />
          )
        )
      );
  };

  const visualComponents = findTypes([
    'Image List',
    'Icon',
    'Avatar',
    'Badge',
    'Img'
  ]);

  const textComponents = findTypes([
    'Paragraph',
    'Header1',
    'Header2',
    'Span',
    'Label',
    'Link'
  ]);

  //*potential function to modularize this code better but it's nto working*/
  const makeMenu = function (typeArray, name) {
    return (
      <>
        <Button
          id={name + '-button'}
          aria-controls={activeCategory === name ? name : undefined}
          aria-haspopup="true"
          // aria-expanded={open ? 'true' : undefined}
          onClick={(e) => handleMenuOpen(e, name)}
        >
          {name}
        </Button>
        <Menu
          id={name + '-menu'}
          anchorEl={menuAnchor}
          open={activeCategory === name}
          onClose={handleMenuClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 40, left: 275 }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
        >
          {typeArray.map((component) => (
            <MenuItem key={component.key}>{component}</MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  //create dividers = div/divider

  //create containers - box/container/stack

  //create buttons -- button/floating button/chips

  //create inputs -- textfield, checkbox, switch, rating, sliders

  //create lists - OL, UL, LI, TransferList

  //create forms -- Form, ButtonGroup, ToggleButtonGroup, Select, AutoComplete

  //create displays --- Modal, POpover, Popper, Transition

  //create layouts -- table, accordion, appbar, tabs

  //create more -- card, paper

  //create navigation -- menu, bottomnav, breadcrumbs, drawer, stepper, tabs, speeddial

  const htmlTypesToRender = state.HTMLTypes.filter(
    (type) => type.name !== 'separator'
  );
  const muiInputToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 21 && type.id <= 33
  );

  const muiDataDisplayToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 34 && type.id <= 43
  );

  const muiFeedbackToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 44 && type.id <= 49
  );

  const muiSurfacesToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 50 && type.id <= 53
  );

  const muiNavigationToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 54 && type.id <= 62
  );

  const muiLayoutToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 63 && type.id <= 70
  );

  const muiUtilsToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 71 && type.id <= 80
  );

  return (
    <div className={'MUIItems'}>
      {makeMenu(visualComponents, 'visual')}
      {/* <Button
        id="visual-button"
        aria-controls={activeCategory === 'visual' ? 'visual-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => handleMenuOpen(e, 'visual')}
      >
        Visual
      </Button>
      <Menu
        id="visual-menu"
        anchorEl={menuAnchor}
        open={activeCategory === 'visual'}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 40, left: 275 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        MenuListProps={{
          'aria-labelledby': 'visual-button'
        }}
      >
        {visualComponents.map((component) => (
          <MenuItem key={component.key}>{component}</MenuItem>
        ))}
      </Menu> */}
      <Divider />
      {makeMenu(textComponents, 'text')}
      {/* <Button
        id="text-button"
        aria-controls={activeCategory === 'text' ? 'text-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => handleMenuOpen(e, 'text')}
      >
        Text
      </Button>
      <Menu
        id="text-menu"
        anchorEl={menuAnchor}
        open={activeCategory === 'text'}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 40, left: 275 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        MenuListProps={{
          'aria-labelledby': 'text-button'
        }}
      >
        {textComponents.map((component) => (
          <MenuItem key={component.key}>{component}</MenuItem>
        ))}
      </Menu> */}
      {/* <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={classes.accordionSummary}
          >
            <h3>Visual</h3>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'space-around'
            }}
          >
            <Grid container justifyContent="space-around" columnSpacing={2}>
              {visualComponents}
            </Grid> */}

      {/* Text Components */}
    </div>
  );
};

export default CreateMenu;
