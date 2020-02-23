import React, { Component, createRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button, AddIcon, Grid, withStyles, GetAppIcon, List, ListItem, ListItemText, Fab } from '../utils/material.util';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel';
import HTMLComponentPanel from '../components/HTMLComponentPanel';
import createModal from '../utils/createModal.util';
import { ComponentState } from '../types/types';
import { cloneDeep } from '../utils/index.util';
import * as actions from '../actions/actions';

const IPC = require('electron').ipcRenderer;

// ** Left Container props definitions
type Props = {
  components: ComponentState[];
  focusComponent: ComponentState;
  selectableChildren: number[];
  classes: any;
  addComponent: any;
  addChild: any;
  updateComponent: any;
  toggleExpansionPanel: any;
  changeFocusComponent: any;
  changeFocusChild: any;
  deleteComponent: any;
  createApplication: any;
  deleteAllData: any;
}

// ** Left Container state definitions
type State = {
  componentName: string;
  modal: any;
  genOptions: string[];
  genOption: number;
}

// ** Redux state mapping to props
const mapDispatchToProps = (dispatch: any) => ({
  toggleExpansionPanel: (id: number) => dispatch(actions.toggleExpansionPanel(id)),
  addComponent: (title: string) => dispatch(actions.addComponent(title)),
  updateComponent: (id: number, update: {}) => dispatch(actions.updateComponent(id, update)),
  deleteComponent: (id: number) => dispatch(actions.deleteComponent(id)),
  addChild: ({ title, childType, HTMLInfo }: 
    { title: string; childType: string; HTMLInfo: object;
  }) => dispatch(actions.addChild({ title, childType, HTMLInfo })),
  changeFocusComponent: ({ title }: { title: string }) => dispatch(actions.changeFocusComponent({ title })),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(actions.changeFocusChild({ childId })),
  deleteAllData: () => dispatch(actions.deleteAllData()),
  createApplication: ({ path, components, genOption }: { path: string; components: ComponentState; genOption: number; }) => dispatch(actions.createApplication({
      path,
      components,
      genOption,
      appName: 'reactype_app',
      exportAppBool: null,
    }),
  ),
});

class LeftContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      componentName: '',
      modal: null,
      genOptions: ['Export components', 'Export components with application files'],
      genOption: 0,
    };

    // ** create a ref for the material ui input component to have access to it's attributes
    this.componentNameRef = createRef<HTMLInputElement>();

    // ** IPC on is an Electron event listener method that takes a trigger and a callback function to fire
    IPC.on('app_dir_selected', (event: any, path: string) => {
      const { components } = this.props;
      const { genOption } = this.state;
      this.props.createApplication({
        path,
        components,
        genOption,
      });
    });
}
  // ** the function that runs while the onChange event is fired on the component name input
  handleChange = (event: any) => {
    const newValue: string = event.target.value;
    this.setState({
      componentName: newValue,
    });
  };

  // ** this method adds a new ComponentPanel to the left container
  addComponentPanel = () => {
    const { value } = this.componentNameRef.current.props;
    this.props.addComponent(value);
    this.setState({
      componentName: '',
    });
  }

  // ** this method is used to close the modal from either the clearworkspace prompt or the chooseGenOptions prompt
  closeModal = () => this.setState({ modal: null });

  // ** this method is used to clear the workspace in our application
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
        },
      }),
    });
  };

  // ** this method is used to choose which export option you want when you export project
  chooseGenOptions = (genOption: number) => {
    // ** set option
    this.setState({ genOption });
    // ** closeModal
    this.closeModal();
    // ** Choose app dir
    this.chooseAppDir();
  };

  // ** this method calls the IPC (Electron) method 'send' to choose the app directory to save to
  chooseAppDir = () => IPC.send('choose_app_dir');

  // ** this method displays the modal when the export project button is clicked
  generateAppModal = () => {
    const { closeModal, chooseGenOptions } = this;
    const { genOptions } = this.state;
    const children = (
      <List className="export-preference">
        {genOptions.map((option, i) => (
          <ListItem
            key={i}
            button
            onClick={() => chooseGenOptions(i)}
            style={{
              border: '1px solid #3f51b5',
              marginBottom: '2%',
              marginTop: '5%',
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
        open: true,
      }),
    });
  };

  render() {
    const {
      components,
      deleteComponent,
      updateComponent,
      focusComponent,
      classes,
      addChild,
      toggleExpansionPanel,
      changeFocusComponent,
      changeFocusChild,
      selectableChildren,
    } = this.props;
    const { componentName, modal } = this.state;

    // ** Cloning our current components, sorting components by id and mapping a new LeftColExpansionPanel component instance
    const componentsExpansionPanel = cloneDeep(components)
      .sort((b: ComponentState, a: ComponentState) => b.id - a.id) // sort by id value of comp
      .map((component: ComponentState, i: number) => (
        <LeftColExpansionPanel
          key={`component-${component.id}`}
          index={i}
          id={component.id}
          component={component}
          components={components}
          updateComponent={updateComponent}
          toggleExpansionPanel={toggleExpansionPanel}
          focusComponent={focusComponent}
          addChild={addChild}
          changeFocusComponent={changeFocusComponent}
          changeFocusChild={changeFocusChild}
          selectableChildren={selectableChildren}
          deleteComponent={deleteComponent}
        />
      ));

    return (
      <div className="column left" style={{ backgroundColor: '#303030' }}>
        <Grid container spacing={8} align="stretch" direction="row" alignItems="center">
          <Grid item xs={8}>
            <TextField ref={this.componentNameRef}
              id="title-input"
              label="Add Component"
              placeholder="Component Name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.addComponentPanel();
                }
              }}
              value={componentName}
              name="componentName"
              className={classes.light}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Fab
              size="small"
              color="secondary"
              className={classes.button}
              aria-label="Add"
              onClick={() => {
                this.addComponentPanel();
              }}
              disabled={!this.state.componentName}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <div className="expansionPanel">
          {componentsExpansionPanel}
        </div>
        <HTMLComponentPanel
          className={classes.htmlCompWrapper}
          focusComponent={focusComponent}
          addChild={addChild}
        />
        <div
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              color="secondary"
              aria-label="Delete All"
              variant="contained"
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
              flexDirection: 'column',
            }}
          >
            <Button
              color="primary"
              aria-label="Export Code"
              variant="contained"
              fullWidth
              onClick={this.generateAppModal}
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
        color: 'green',
      },
    },
    cssFocused: {},
    input: {
      color: '#fff',
      opacity: '0.7',
      marginBottom: '10px',
    },
    underline: {
      color: 'white',
      '&::before': {
        color: 'white',
      },
    },
    button: {
      color: '#fff',

      '&:disabled': {
        color: 'grey',
      },
    },
    clearButton: {
      top: '96%',
      position: 'sticky!important',
      zIndex: '1',

      '&:disabled': {
        color: 'grey',
        backgroundColor: '#424242',
      },
    },
  };
}

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(LeftContainer);
