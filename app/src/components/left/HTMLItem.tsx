import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import createModal from '../right/createModal';

const buttonClasses =
'MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-button-12 MuiButton-textPrimary';

const useStyles = makeStyles({
  HTMLPanelItem: {
    color: 'white',
    // this is experimental for version: BLADERUNNER THEME
    backgroundColor: '#a7cced',
    // minWidth: '340px',
    height: '45px',
    fontSize: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    margin: '10px auto',
    // marginBottom: '10px',
    // marginRight: '5px',
    // marginLeft: '5px',
    width: '90px',
    // border: '2px solid rgba(255,255,255, 0.45)',
    //-------------------------------------CHANGED----------------------------------------
    border: '2ßpx solid rgba(225, 225, 225, 1.0)',
    borderRadius: '8px',
    cursor: 'grab',
    '& > h3': {
      display: 'inline-block',
      // paddingTop: '18px'
    }
  }
});

const HTMLItem: React.FC<{
  name: string;
  id: number;
  Icon: any;
  handleDelete: (id: number) => void;
}> = ({ name, id, Icon, handleDelete }) => {
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

  return (
    <Grid item xs={5} key={`html-g${name}`}>
      <div ref={drag} className={classes.HTMLPanelItem} id="HTMLItem">
        <h3>{name}</h3>
        {/* <span
          style={{
            verticalAlign: 'middle',
            display: 'inline-block',
            // marginLeft: '5px'
          }}
        >
          {Icon && <Icon />}
        </span> */}
        {id > 11 &&
        <button className={buttonClasses} onClick={() => deleteAllInstances(id)} > X </button> }
      </div>
      {modal}
    </Grid>
  );
}

export default HTMLItem;
