import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { ItemTypes } from '../../constants/ItemTypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import createModal from '../right/createModal';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';
import CodeIcon from '@mui/icons-material/Code';
import * as Icons from '@mui/icons-material';

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
  icon: any;
  handleDelete: (id: number) => void;
}> = ({ name, id, icon, handleDelete }) => {
  const IconComponent = Icons[icon];
  const classes = useStyles();
  const [modal, setModal] = useState(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'HTML Element',
      name,
      icon,
      instanceTypeId: id
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
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
  return (
    <Grid item xs={5} key={`html-g${name}`} id="HTMLgrid">
      {id <= 20 && (
        <div
          ref={drag}
          style={{ borderColor: '#C6C6C6' }}
          className={`${classes.HTMLPanelItem} ${classes.darkThemeFontColor}`}
          id="HTMLItem"
        >
          {typeof IconComponent !== 'undefined' && (
            <IconComponent fontSize="small" align-items="center" />
          )}
          {name}
        </div>
      )}

      {id > 20 && (
        <div
          ref={drag}
          style={{ borderColor: '#C6C6C6' }}
          className={`${classes.HTMLPanelItem} ${classes.darkThemeFontColor}`}
          id="HTMLItem"
        >
          {typeof CodeIcon !== 'undefined' && (
          <CodeIcon fontSize="small" align-items="center" />)}
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

export default HTMLItem;

