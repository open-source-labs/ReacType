/* eslint-disable max-len */
import React from 'react';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import * as Icons from '@mui/icons-material';
import { ItemTypes } from '../../constants/ItemTypes';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import CustomEditIcon from '../CustomEditIcon';
/**
 * `ComponentPanelItem` represents an individual component item within the ComponentPanel. It uses
 * drag-and-drop functionality to allow the user to position components within the canvas. The component can
 * display a focus state, and restricts dragging when marked as a root component or is currently focused.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The display name of the component, which correlates with an icon in the MUI icons library.
 * @param {number} props.id - The unique identifier for the component.
 * @param {boolean} props.root - Indicates if the component is a root component, affecting its draggability.
 * @param {boolean} props.isFocus - Indicates if the component is currently focused in the UI.
 * @param {boolean} props.isThemeLight - Indicates if the light theme is active, affecting the text color.
 *
 * @returns {JSX.Element} A draggable and clickable item that represents a component in the component panel.
 */
const ComponentPanelItem: React.FC<{
  name: string;
  id: number;
  root: boolean;
  isFocus: boolean;
  isThemeLight: boolean;
}> = ({
  name,
  id,
  root,
  isFocus,
  isThemeLight,
  handleClickEditModule
}): JSX.Element => {
  const classes = useStyles({});
  const state = useSelector((store: RootState) => store.appState);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const dispatch = useDispatch();

  const IconComponent = Icons[name]; // Use the correct icon component based on the name

  // useDrag hook allows components in left panel to be drag source
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'Component',
      instanceTypeId: id
    },
    canDrag: !root && !isFocus, // dragging not permitted if component is root component or current component
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging() // !! converts an object to a boolean (i.e., if falsy, becomes false => !!0 === false)
    })
  });

  // when a component is clicked in the left panel, change canvas focus to that component
  const handleClick = () => {
    //LEGACY PD
    dispatch(changeFocus({ componentId: id, childId: null }));

    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: id,
        childId: null
      });
    }
  };

  return (
    <Grid
      item
      ref={drag}
      style={{
        fontSize: 'small',
        backgroundColor: '#2D313A', // Set background color
        border: '2px solid',
        borderRadius: '10px',
        borderColor: '#2D313A',
        margin: '5px 0px',
        width: '100vw',
        maxWidth: '240px',
        height: '3rem',
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      {isFocus && <div className={classes.focusMark}></div>}
      <div className="compPanelItem" onClick={handleClick}>
        <div className={classes.nameContainer}>
          {IconComponent && <IconComponent />}
          <h3
            className={`${name} ${
              isThemeLight ? classes.lightTheme : classes.darkTheme
            }`}
          >
            {name}
          </h3>
        </div>
        <CustomEditIcon handleClickEditModule={handleClickEditModule} />
      </div>
    </Grid>
  );
};

const useStyles = makeStyles({
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  focusMark: {
    border: '2px solid #f88e16',
    borderRadius: '5%',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%'
  },
  lightTheme: {
    color: 'rgba (0, 0, 0, 0.54)'
  },
  darkTheme: {
    color: '#ffffff'
  }
});

export default ComponentPanelItem;
