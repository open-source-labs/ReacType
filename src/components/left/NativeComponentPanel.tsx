import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WebAssetIcon from '@material-ui/icons/WebAsset'; // icon for View button
import StayCurrentPortraitIcon from '@material-ui/icons/StayCurrentPortrait'; // icon for SafeAreaView button
import Crop169Icon from '@material-ui/icons/Crop169'; // icon for Button button
import ListAltIcon from '@material-ui/icons/ListAlt'; // icon for List button
import ImageIcon from '@material-ui/icons/Image'; // icon for Image button
import LaunchIcon from '@material-ui/icons/Launch'; // icon for Modal button
import ToggleOnIcon from '@material-ui/icons/ToggleOn'; // icon for Switch button
import TextFieldsIcon from '@material-ui/icons/TextFields'; // icon for Text button
import FontDownloadIcon from '@material-ui/icons/FontDownload'; // icon for Text Input
import TouchAppIcon from '@material-ui/icons/TouchApp'; // icon for TouchableOpacity
import IconButton from '@material-ui/core/IconButton';

/* componentButtons is a list of the most fundamental React native components and a description to 
be shown on hover. The button property refers to a selected MaterialUI Icon to represent that 
component as a button. Adding a new Native component is as simple as adding a new object with 
the same three properties and the relevant values.
*/

const componentButtons = [
  {
    name: 'RNView',
    description: 'Fundamental component for building a UI',
    button: <WebAssetIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNSafeAreaView',
    description: 'A View that stays within screen boundaries',
    button: <StayCurrentPortraitIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNButton',
    description: 'Touchable button',
    button: <Crop169Icon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNFlatList',
    description: 'List element for displaying multiple values',
    button: <ListAltIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNImage',
    description: 'Image display',
    button: <ImageIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNModal',
    description: 'Present content on top of your current view',
    button: <LaunchIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNSwitch',
    description: 'Boolean input for invoking callbacks',
    button: <ToggleOnIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNText',
    description: 'Basic component for displaying any text',
    button: <TextFieldsIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNTextInput',
    description: 'Provides user input for text fields',
    button: <FontDownloadIcon style={{ color: 'e0e0e0' }} />
  },
  {
    name: 'RNTouchOpacity',
    description: 'Touchable component that changes opacity when touched',
    button: <TouchAppIcon style={{ color: 'e0e0e0' }} />
  }
];

const NativeComponentPanel = (props: any) => {
  const { classes, addChild } = props;

  // onClick function to invoke dispatch/reducers for adding Native Element to component
  const handleCreateNativeChild = (type: string) => {
    // if (native) type = 'RNTouchOpacity';
    addChild({ title: type, childType: type, HTMLInfo: {} });
  };

  // iterates over the array of native components above, and creates a grid item and button with the relevant info
  const buttonGrids = componentButtons.map(component => (
    // xs=6 gives each component half of the available 12 spaces in the MaterialUI container
    <Grid item xs={6} key={`grid-${component.name}`}>
      <IconButton
        key={`button-${component.name}`}
        className={classes.label}
        aria-label={component.name}
        size="medium"
        onClick={() => {
          handleCreateNativeChild(`${component.name}`);
        }}
      >
        <span className={classes.compName}>{component.name.slice(2)}</span>
        {component.button}
      </IconButton>
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.header}>Add React Native Components</div>
      <Grid container spacing={3}>
        {buttonGrids}
      </Grid>
    </div>
  );
};

// MATERIAL UI THEME STYLING
function styles(theme: Theme): any {
  return {
    container: {
      textAlign: 'center',
      paddingRight: '10%'
    },
    header: {
      color: '#fff',
      cursor: 'default',
      fontSize: '1.8em',
      textShadow: '2px 2px 2px black',
      paddingBottom: '20px',
      paddingLeft: '15px'
    },
    compName: {
      paddingRight: '10px'
    },
    label: {
      color: '#e0e0e0',
      textShadow: '2px 2px 2px black',
      transition: 'font-size 350ms ease-in-out',
      '&:hover': {
        fontSize: '1.85em'
      }
    }
  };
}

export default withStyles(styles)(NativeComponentPanel);
