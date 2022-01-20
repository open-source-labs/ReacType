import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import createModal from '../right/createModal';

const useStyles = makeStyles({
  HTMLPanelItem: {
    color: '#186BB4',
    height: '35px',
    width: '90px',
    fontSize: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '7px auto',
    marginLeft: '30px',
    borderRadius: '25px',
    cursor: 'grab',
    '& > h3': {
      display: 'inline-block',
    }
  },
  lightThemeFontColor: {
    color: '#292929'
  },
  darkThemeFontColor: {
    color: '#fff'
  }

});

const HTMLItem : React.FC<{
  name: string;
  id: number;
  Icon: any;
  handleDelete: (id: number) => void;
  isThemeLight: boolean;
}> = ({ name, id, Icon, handleDelete, isThemeLight }) => {

  const classes = useStyles();
  const [modal, setModal] = useState(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'HTML Element',
      name,
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
          key={`clear${deleteID}`}
          button
          onClick={() => handleDelete(deleteID)}
          style={{
            border: '1px solid #3f51b5',
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
          key={`close${deleteID}`}
          button
          onClick={closeModal}
          style={{
            border: '1px solid #3f51b5',
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
        message: 'Deleting this element will delete all instances of this element within the application.\nDo you still wish to proceed?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };
  // updated the id's to reflect the new element types input and label
  return ( // HTML Elements
    <Grid item xs={5} key={`html-g${name}`}>
      { id <= 18 &&
      <div ref={drag} className={isThemeLight ? `${classes.HTMLPanelItem} ${classes.lightThemeFontColor}` : `${classes.HTMLPanelItem} ${classes.darkThemeFontColor}`} id="HTMLItem">
        <h3>{name}</h3>
        </div>}
      {id > 18 &&
      <span id="customHTMLElement">
      <div ref={drag} className={isThemeLight ? `${classes.HTMLPanelItem} ${classes.lightThemeFontColor}` : `${classes.HTMLPanelItem} ${classes.darkThemeFontColor}`} id="HTMLItem">
        <h3>{name}</h3>
      </div>
        <button id="newElement" style={{color: isThemeLight ? '#186BB4' : 'white' }} onClick={() => deleteAllInstances(id)} >X</button>
     </span>
      }
      {modal}
    </Grid>
  );
}

export default HTMLItem;
