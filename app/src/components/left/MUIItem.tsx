import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../../constants/ItemTypes';
import { RootState } from '../../redux/store';
import * as Icons from '@mui/icons-material'; // Assuming a collection of MUI icons
import CodeIcon from '@mui/icons-material/Code'; // Default icon if specific icon not provided
import { useDispatch, useSelector } from 'react-redux';
import { addChild } from '../../redux/reducers/slice/appStateSlice';
import createModal from '../right/createModal'; // Modal creation utility
import { emitEvent } from '../../helperFunctions/socket'; // Event emission utility

// Define component styles using MUI styling solutions
const useStyles = makeStyles({
  MUIPanelItem: {
    height: 'auto',
    width: 'auto',
    fontSize: 'small',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'grab',
  },
  lightThemeFontColor: {
    color: '#8F8F8F',
  },
  darkThemeFontColor: {
    color: '#8F8F8F',
  },
});

const MUIItem: React.FC<{
  name: string;
  id: number;
  icon: any;
  handleDelete: (id: number) => void;
}> = ({ name, id, icon, handleDelete }) => {
  const IconComponent = Icons[icon];

  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode); // current roomCode

  // Use drag and drop functionality
  const classes = useStyles();
  const [modal, setModal] = useState(null);

  const item = {
    type: ItemTypes.INSTANCE,
    newInstance: true,
    instanceType: 'MUI Component',
    name,
    icon,
    instanceTypeId: id,
  };

  const [{ isDragging }, drag] = useDrag({
    item,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const closeModal = () => setModal(null);
  const deleteAllInstances = (deleteID: number) => {
    const children = (
      <List className="export-preference">
        <ListItem
          id="export-modal"
          key={`clear${deleteID}`}
          onClick={() => handleDelete(deleteID)}
          style={{
            border: '1px solid #C6C6C6',
            marginBottom: '2%',
            marginTop: '5%',
          }}
        >
          <ListItemText
            primary={'Yes, delete all instances'}
            style={{ textAlign: 'center' }}
            onClick={closeModal}
          />
        </ListItem>
        <ListItem
          id="export-modal"
          key={`close${deleteID}`}
          onClick={closeModal}
          style={{
            border: '1px solid #C6C6C6',
            marginBottom: '2%',
            marginTop: '5%',
          }}
        >
          <ListItemText
            primary={'No, do not delete element'}
            style={{ textAlign: 'center' }}
            onClick={closeModal}
          />
        </ListItem>
      </List>
    );
    setModal(
      createModal({
        closeModal,
        children,
        message:
          'Deleting this element will delete all instances of this element within the application.\nDo you still wish to proceed?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true,
      }),
    );
  };

  const dispatch = useDispatch();

  const handleClick = () => {
    const childData = {
      type: 'MUI Component',
      typeId: id,
      childId: null,
      contextParam: {
        allContext: [],
      },
    };

    dispatch(addChild(childData));
    if (roomCode) {
      // Emit 'addChildAction' event to the server
      emitEvent('addChildAction', roomCode, childData);
    }
  };

  // id over/under 20 logic
  // html-g{name} - html grid name = item
  return (
    <Grid item xs={5} key={`mui-g${name}`} id="HTMLgrid">
      {id >= 20 && (
        <div
          ref={drag}
          style={{
            backgroundColor: '#2D313A',
            backgroundImage: 'linear-gradient(160deg, #2D313A 0%, #1E2024 100%)',
          }}
          className={`${classes.MUIPanelItem} ${classes.darkThemeFontColor}`}
          id="MUIItem"
          onClick={() => {
            handleClick();
          }}
        >
          {typeof IconComponent !== 'undefined' && (
            <IconComponent fontSize="small" align-items="center" />
          )}
          {name}
        </div>
      )}

      {id < 20 && (
        <div
          ref={drag}
          style={{ borderColor: '#C6C6C6' }}
          className={`${classes.MUIPanelItem} ${classes.darkThemeFontColor}`}
          id="MUIItem"
          onClick={() => {
            handleClick();
          }}
        >
          {typeof CodeIcon !== 'undefined' && (
            <CodeIcon fontSize="small" align-items="center" />
          )}
          {name}
          <button
            id="newElement"
            style={{ color: '#C6C6C6' }}
            onClick={() => deleteAllInstances(id)}
          >
            X
          </button>
        </div>
      )}
      {modal}
    </Grid>
  );
};

export default MUIItem;
