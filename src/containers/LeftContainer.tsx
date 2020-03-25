import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import LeftColExpansionPanel from '../components/left/LeftColExpansionPanel';
import HTMLComponentPanel from '../components/left/HTMLComponentPanel';
import * as actions from '../actions/actionCreators';
import {
  ComponentInt,
  ComponentsInt,
  PropsInt
} from '../interfaces/Interfaces';
import createModal from '../components/left/createModal';
import cloneDeep from '../helperFunctions/cloneDeep';
import NativeComponentPanel from '../components/left/NativeComponentPanel';

const IPC = require('electron').ipcRenderer;

interface LeftContPropsInt extends PropsInt {
  selectableChildren: number[];
  classes: any;
  addComponent(arg: { title: string }): void;
  addProp(arg: { key: string; type: string }): void;
  addChild(arg: { title: string; childType: string; HTMLInfo: object }): void;
  changeFocusComponent(arg: { title: string }): void;
  changeComponentFocusChild(arg: {
    componentId: number;
    childId: number;
  }): void;
  deleteComponent(arg: {
    componentId: number;
    stateComponents: ComponentsInt;
  }): void;
  createApp(arg: {
    path: string;
    components: ComponentsInt;
    genOption: number;
  }): void;
  deleteAllData(): void;
  toggleComponentState(arg: { id: number }): void;
  toggleComponentClass(arg: { id: number }): void;
  deleteImage(): void;
  updateCode(arg: { componentId: number; code: string }): void;
  toggleEditMode(arg: { id: number }): void;
  editMode: number;
  editComponent(arg: { id: number; title: string }): void;
}

interface StateInt {
  componentName: string;
  componentEditName: string;
  modal: any;
  genOptions: string[];
  genOption: number;
  imageSource: string;
}

const mapStateToProps = (store: any) => ({
  imageSource: store.workspace.imageSource,
  editMode: store.workspace.editMode,
  focusChild: store.workspace.focusChild
});

const mapDispatchToProps = (dispatch: any) => ({
  addComponent: ({ title }: { title: string }) =>
    dispatch(actions.addComponent({ title })),
  addProp: ({ key, type }: { key: string; type: string }) =>
    dispatch(actions.addProp({ key, type })),
  addChild: ({
    title,
    childType,
    HTMLInfo
  }: {
    title: string;
    childType: string;
    HTMLInfo: object;
  }) => dispatch(actions.addChild({ title, childType, HTMLInfo })),
  changeComponentFocusChild: ({
    componentId,
    childId
  }: {
    componentId: number;
    childId: number;
  }) => dispatch(actions.changeComponentFocusChild({ componentId, childId })),
  changeFocusComponent: ({ title }: { title: string }) =>
    dispatch(actions.changeFocusComponent({ title })),
  changeFocusChild: ({ childId }: { childId: number }) =>
    dispatch(actions.changeFocusChild({ childId })),
  deleteComponent: ({
    componentId,
    stateComponents
  }: {
    componentId: number;
    stateComponents: ComponentsInt;
  }) => dispatch(actions.deleteComponent({ componentId, stateComponents })),
  editComponent: ({ id, title }: { id: number; title: string }) =>
    dispatch(actions.editComponent({ id, title })),
  toggleComponentState: ({ id }: { id: number }) =>
    dispatch(actions.toggleComponentState({ id })),
  toggleComponentClass: ({ id }: { id: number }) =>
    dispatch(actions.toggleComponentClass({ id })),
  toggleEditMode: ({ id }: { id: number }) =>
    dispatch(actions.toggleEditMode({ id })),
  deleteAllData: () => dispatch(actions.deleteAllData()),
  deleteImage: () => dispatch(actions.deleteImage()),
  createApp: ({
    path,
    components,
    genOption
  }: {
    path: string;
    components: ComponentsInt;
    genOption: number;
  }) =>
    dispatch(
      actions.createApplication({
        path,
        components,
        genOption,
        appName: 'reactype_app',
        exportAppBool: null
      })
    ),
  updateCode: ({ componentId, code }: { componentId: number; code: string }) =>
    dispatch(actions.updateCode({ componentId, code }))
});

class LeftContainer extends Component<LeftContPropsInt, StateInt> {
  state: StateInt;

  constructor(props: LeftContPropsInt) {
    super(props);

    this.state = {
      componentName: '',
      componentEditName: '',
      modal: null,
      genOptions: [
        'Export components',
        'Export components with application files'
      ],
      genOption: 0,
      imageSource: this.props.imageSource
    };

    IPC.on('app_dir_selected', (event: string, path: string) => {
      const { components } = this.props;
      const { genOption } = this.state;
      this.props.createApp({
        path,
        components,
        genOption
      });
    });
  }

  //this function is for handling the value of the new component name typed in
  handleChange = (event: any) => {
    const newValue: string = event.target.value;
    this.setState({
      componentName: newValue
    });
  };

  //this functions handles the values for an edited name being typed
  handleChangeName = (value: string) => {
    const newValue: string = value;
    this.setState({
      componentEditName: newValue
    });
  };

  handleAddComponent = () => {
    this.props.addComponent({ title: this.state.componentName });

    // reset the currently added componentName state field to blank after adding
    this.setState({
      componentName: ''
    });
  };

  handleEditComponent = () => {
    this.props.editComponent({
      id: this.props.editMode,
      title: this.state.componentEditName
    });

    // reset the currently added componentName state field to blank after editing
    this.setState({
      componentEditName: ''
    });
  };

  closeModal = () => this.setState({ modal: null });

  clearWorkspace = () => {
    this.setState({
      modal: createModal({
        message: 'Are you sure want to delete all data?',
        closeModal: this.closeModal,
        secBtnLabel: 'Clear Workspace',
        open: true,
        children: null,
        primBtnAction: null,
        primBtnLabel: null,
        secBtnAction: () => {
          this.props.deleteAllData();
          this.closeModal();
        }
      })
    });
  };

  chooseGenOptions = (genOption: number) => {
    // set option
    this.setState({ genOption });
    // closeModal
    this.closeModal();
    // Choose app dir
    this.chooseAppDir();
  };

  chooseAppDir = () => IPC.send('choose_app_dir');
  addImage = () => IPC.send('update-file');

  showGenerateAppModal = () => {
    const { closeModal, chooseGenOptions } = this;
    const { genOptions } = this.state;
    const children = (
      <List className='export-preference'>
        {genOptions.map((option, i) => (
          <ListItem
            key={i}
            button
            onClick={() => chooseGenOptions(i)}
            style={{
              border: '1px solid #3f51b5',
              marginBottom: '2%',
              marginTop: '5%'
            }}
          >
            <ListItemText primary={option} style={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    );
    this.setState({
      modal: createModal({
        closeModal,
        children,
        message: 'Choose export preference:',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    });
  };

  render(): JSX.Element {
    const {
      imageSource,
      components,
      deleteComponent,
      focusComponent,
      classes,
      addProp,
      addChild,
      changeFocusComponent,
      changeFocusChild,
      changeComponentFocusChild,
      selectableChildren,
      toggleComponentState,
      toggleComponentClass,
      deleteImage,
      updateCode,
      editMode,
      toggleEditMode,
      focusChild
    } = this.props;
    const { componentName, modal } = this.state;

    const componentsExpansionPanel = cloneDeep(components)
      .sort((b: ComponentInt, a: ComponentInt) => b.id - a.id) // sort by id value of comp
      .map((component: ComponentInt, i: number) => (
        <LeftColExpansionPanel
          key={component.id}
          component={component}
          focusComponent={focusComponent}
          addProp={addProp}
          addChild={addChild}
          changeFocusComponent={changeFocusComponent}
          changeFocusChild={changeFocusChild}
          selectableChildren={selectableChildren}
          deleteComponent={deleteComponent}
          components={components}
          toggleComponentState={toggleComponentState}
          toggleComponentClass={toggleComponentClass}
          updateCode={updateCode}
          editMode={editMode}
          toggleEditMode={toggleEditMode}
          handleChangeName={this.handleChangeName}
          handleEditComponent={this.handleEditComponent}
          changeFocusChild={changeFocusChild}
          changeComponentFocusChild={changeComponentFocusChild}
          focusChild={focusChild}
        />
      ));
    const { addImage } = this;

    return (
      <div className='column left' style={{ minWidth: '466px' }}>
        <Grid
          container
          spacing={8}
          align='stretch'
          direction='row'
          alignItems='center'
        >
          <Grid item xs={8}>
            <TextField
              id='title-input'
              label='Add component'
              size='medium'
              placeholder='Name of component'
              margin='normal'
              onChange={this.handleChange}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  this.handleAddComponent();
                  ev.preventDefault();
                }
              }}
              value={componentName}
              name='componentName'
              className={classes.light}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                className: classes.input
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Fab
              size='small'
              color='secondary'
              className={classes.button}
              aria-label='Add'
              onClick={this.handleAddComponent}
              disabled={!this.state.componentName}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <div className='expansionPanel'>{componentsExpansionPanel}</div>
        <HTMLComponentPanel
          className={classes.htmlCompWrapper}
          focusComponent={focusComponent}
          addProp={addProp}
          addChild={addChild}
        />
        <NativeComponentPanel addChild={addChild} />
        <div
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            {imageSource ? (
              <Button
                aria-label='Remove Image'
                variant='contained'
                fullWidth
                onClick={deleteImage}
                className={classes.clearButton}
                style={{
                  borderRadius: 0,
                  top: 0,
                  backgroundColor: '#dc004e',
                  color: '#fff'
                }}
              >
                Remove Image
              </Button>
            ) : (
              <Button
                aria-label='Upload Image'
                variant='contained'
                fullWidth
                onClick={addImage}
                className={classes.clearButton}
                style={{
                  borderRadius: 0,
                  top: 0,
                  backgroundColor: '#dc004e',
                  color: '#fff'
                }}
              >
                Upload Image
              </Button>
            )}
            <Button
              color='secondary'
              aria-label='Delete All'
              variant='contained'
              fullWidth
              onClick={this.clearWorkspace}
              disabled={this.props.components.length === 1}
              className={classes.clearButton}
              style={{ borderRadius: 0 }}
            >
              Clear Workspace
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Button
              color='primary'
              aria-label='Export Code'
              variant='contained'
              fullWidth
              onClick={this.showGenerateAppModal}
              className={classes.clearButton}
              style={{ borderRadius: 0 }}
            >
              <GetAppIcon style={{ paddingRight: '5px' }} />
              Export Project
            </Button>
          </div>
        </div>

        {modal}
      </div>
    );
  }
}

function styles(): any {
  return {
    cssLabel: {
      color: 'white',

      '&$cssFocused': {
        color: 'green'
      }
    },
    cssFocused: {},
    input: {
      color: '#fff',
      opacity: '0.7',
      marginBottom: '10px'
    },
    underline: {
      color: 'white',
      '&::before': {
        color: 'white'
      }
    },
    button: {
      color: '#fff',

      '&:disabled': {
        color: 'grey'
      }
    },
    clearButton: {
      top: '96%',
      position: 'sticky!important',
      zIndex: '1',

      '&:disabled': {
        color: 'grey',
        backgroundColor: '#424242'
      }
    }
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(LeftContainer);
