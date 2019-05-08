import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel.jsx';
import HTMLComponentPanel from '../components/HTMLComponentPanel.jsx';
import * as actions from '../actions/components';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces';

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
});

class LeftContainer extends Component<Props> {
  state = {
    componentName: '',
  };

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
    } = this.props;
    const { componentName } = this.state;

    const componentsExpansionPanel = components
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
                  // Do code here
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
