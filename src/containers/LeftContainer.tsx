import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel';
import HTMLComponentPanel from '../components/HTMLComponentPanel';
import * as actions from '../actions/components';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces';
import createModal from '../utils/createModal.util';
import cloneDeep from '../utils/cloneDeep.ts';

const IPC = require('electron').ipcRenderer;

type Props = {
  components: ComponentsInt;
  focusComponent: ComponentInt;
  selectableChildren: Array<number>;
  classes: any;

  addComponent: any;
  addChild: any;
  changeFocusComponent: any;
  changeFocusChild: any;
  deleteComponent: any;
};

const mapDispatchToProps = (dispatch: any) => ({
  addComponent: ({ title }: { title: string }) => dispatch(actions.addComponent({ title })),
  addChild: ({ title, childType, HTMLInfo }: { title: string; childType: string; HTMLInfo: object }) =>
    dispatch(actions.addChild({ title, childType, HTMLInfo })),
  changeFocusComponent: ({ title }: { title: string }) => dispatch(actions.changeFocusComponent({ title })),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(actions.changeFocusChild({ childId })),
  deleteComponent: ({ componentId, stateComponents }: { componentId: number; stateComponents: ComponentsInt }) =>
    dispatch(actions.deleteComponent({ componentId, stateComponents })),
  deleteAllData: () => dispatch(actions.deleteAllData()),
  createApp: ({ path, components, genOption }) =>
    dispatch(
      actions.createApplication({
        path,
        components,
        genOption,
      }),
    ),
});

class LeftContainer extends Component<Props> {
  state = {
    componentName: '',
    modal: null,
    genOptions: ['Export components', 'Export components with application files'],
    genOption: 0,
  };

  constructor(props) {
    super(props);

    IPC.on('app_dir_selected', (event, path) => {
      const { components } = this.props;
      const { genOption } = this.state;
      this.props.createApp({
        path,
        components,
        genOption,
      });
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddComponent = () => {
    this.props.addComponent({ title: this.state.componentName });
    this.setState({
      componentName: '',
    });
  };

  render(): JSX.Element {
    const {
      components,
      updateComponent,
      deleteComponent,
      focusComponent,
      totalComponents,
      classes,
      addChild,
      changeFocusComponent,
      changeFocusChild,
      selectableChildren,
      deleteAllData,
      totalComponents,
    } = this.props;
    const { componentName, modal } = this.state;

    const componentsExpansionPanel = cloneDeep(components)
      .sort((b: ComponentInt, a: ComponentInt) => b.id - a.id) // sort by id value of comp
      .map((component, i) => (
        <LeftColExpansionPanel
          key={component.id}
          index={i}
          id={component.id}
          component={component}
          focusComponent={focusComponent}
          addChild={addChild}
          changeFocusComponent={changeFocusComponent}
          changeFocusChild={changeFocusChild}
          selectableChildren={selectableChildren}
        />
      ));

    return (
      <div className="column left">
        <Grid container spacing={16} alignItems="baseline" align="stretch">
          <Grid item xs={12}>
            <TextField
              id="title-input"
              label="Add class component"
              placeholder="Name of component"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  this.handleAddComponent();
                  ev.preventDefault();
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
            <Button
              variant="fab"
              mini
              color="primary"
              className={classes.button}
              aria-label="Add"
              onClick={this.handleAddComponent}
              disabled={!this.state.componentName}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <div className="expansionPanel">{componentsExpansionPanel}</div>
        <HTMLComponentPanel className={classes.htmlCompWrapper} focusComponent={focusComponent} addChild={addChild} />

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
              fullwidth={true}
              onClick={this.clearWorkspace}
              disabled={totalComponents === 1}
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
              variant="contained"
              fullWidth
              onClick={this.showGenerateAppModal}
              className={classes.clearButton}
              disabled={totalComponents < 1}
              onClick={this.showGenerateAppModal}
              style={{ borderRadius: 0 }}
            >
              <GetAppIcon className={classes.light} style={{ paddingLeft: '0px', paddingRight: '0px' }} />
              Export Project
            </Button>
          </div>
        </div>

        {modal}
      </div>
    );
  }
}

function styles() {
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
