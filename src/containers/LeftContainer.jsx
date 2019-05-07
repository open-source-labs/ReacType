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

const mapDispatchToProps = dispatch => ({
  addComponent: ({ title }) => dispatch(actions.addComponent({ title })),
  updateComponent: ({ id, index, newParentId = null, color = null, stateful = null }) =>
    dispatch(
      actions.updateComponent({
        id,
        index,
        newParentId,
        color,
        stateful,
      }),
    ),
  addChild: ({ title, childType, HTMLInfo }) => dispatch(actions.addChild({ title, childType, HTMLInfo })),
  changeFocusComponent: ({ title }) => dispatch(actions.changeFocusComponent({ title })),
  changeFocusChild: ({ childId }) => dispatch(actions.changeFocusChild({ childId })),
  deleteComponent: ({ componentId, stateComponents }) =>
    dispatch(actions.deleteComponent({ componentId, stateComponents })),
});

class LeftContainer extends Component {
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

  render() {
    const {
      components,
      deleteComponent,
      focusComponent,
      classes,
      addChild,
      changeFocusComponent,
      changeFocusChild,
      selectableChildren,
    } = this.props;
    const { componentName } = this.state;

    const componentsExpansionPanel = components
      .sort((b, a) => parseInt(b.id) - parseInt(a.id)) // sort by id value of comp
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
      <div className="column left" position="relative">
        <Grid container spacing={8} alignItems="baseline" align="stretch" direction="row">
          <Grid item xs={8}>
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
    // htmlCompWrapper: {
    //   bottom: 0,
    //   height: "200px"
    // },
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
