import React, { ComponentType, ReactElement, useState } from 'react';

import Grid from '@mui/material/Grid';
import { ItemTypes } from '../../constants/ItemTypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { RootState } from '../../redux/store';
import createModal from '../right/createModal';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';
// import { useSelector } from 'react-redux';
import { IconProps } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const useStyles = makeStyles({
  HTMLPanelItem: {
    height: 'auto',
    width: 'auto',
    fontSize: 'medium',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    cursor: 'grab'
    // '& > h3': {
    //   display: 'inline-block'
    // }
  },
  lightThemeFontColor: {
    color: '#8F8F8F'
  },
  darkThemeFontColor: {
    color: '#8F8F8F'
  }
});

const HTMLItem: React.FC<{
  name: string;
  id: number;
  Icon: any;
  handleDelete: (id: number) => void;
}> = ({ name, id, Icon, handleDelete }) => {
  // console.log('Icon: ', Icon);
  const classes = useStyles();
  const [modal, setModal] = useState(null);

  const [{ isDragging }, drag] = useDrag({
    // is dragging is never read, but if deleted adjustment in the ref are needed line 122/128 ref={drag} to {...drag}
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'HTML Element',
      name,
      Icon,
      instanceTypeId: id
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const closeModal = () => setModal(null);

  // creates modal that asks if user wants to clear workspace
  // if user clears their workspace, then their components are removed from state and the modal is closed
  const deleteAllInstances = (deleteID: number) => {
    // set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          id="export-modal"
          key={`clear${deleteID}`}
          onClick={() => handleDelete(deleteID)}
          style={{
            border: '1px solid #C6C6C6',
            marginBottom: '2%',
            marginTop: '5%'
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
            marginTop: '5%'
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

    // create modal
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
        open: true
      })
    );
  };
  // updated the id's to reflect the new element types input and label
  return (
    // HTML Elements
    <Grid item xs={5} key={`html-g${name}`} id="HTMLgrid">
      {id <= 20 && (
        <div
          ref={drag}
          style={{ borderColor: '#C6C6C6' }}
          className={`${classes.HTMLPanelItem} ${classes.darkThemeFontColor}`}
          id="HTMLItem"
        >
          <Icon fontSize="small" align-items="center" />
          {name}
        </div>
      )}

      {/* Custom Elements */}
      {id > 20 && (
        <span id="customHTMLElement">
          <div
            ref={drag}
            style={{ borderColor: '#C6C6C6' }}
            className={`${classes.HTMLPanelItem} ${classes.darkThemeFontColor}`}
            id="HTMLItem"
          >
            <h3>{name}</h3>
          </div>
          <button
            id="newElement"
            style={{ color: '#C6C6C6' }}
            onClick={() => deleteAllInstances(id)}
          >
            X
          </button>
        </span>
      )}
      {modal}
    </Grid>
  );
};

export default HTMLItem;
