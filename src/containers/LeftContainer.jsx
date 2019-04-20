import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel.jsx';
// import createModal from '../utils/createModal.util';
import * as actions from '../actions/components';

const mapDispatchToProps = dispatch => ({
  addComponent: ({ title }) => dispatch(actions.addComponent({ title })),
  updateComponent: ({
    id, index, newParentId = null, color = null, stateful = null,
  }) => dispatch(
    actions.updateComponent({
      id,
      index,
      newParentId,
      color,
      stateful,
    }),
  ),
  deleteComponent: ({ index, id, parentIds }) => dispatch(actions.deleteComponent({ index, id, parentIds })),
  // moveToBottom: componentId => dispatch(actions.moveToBottom(componentId)),
  // moveToTop: componentId => dispatch(actions.moveToTop(componentId)),
  // openExpansionPanel: component => dispatch(actions.openExpansionPanel(component)),
  // deleteAllData: () => dispatch(actions.deleteAllData()),
  addChild: ({ title }) => dispatch(actions.addChild({ title })),
});

class LeftContainer extends Component {
  state = {
    componentName: '',
  };

  handleChange = (event) => {
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
      updateComponent,
      deleteComponent,
      focusComponent,
      totalComponents,
      classes,
      addChild,
    } = this.props;
    const { componentName } = this.state;

    const componentsExpansionPanel = components.map((component, i) => (
      <LeftColExpansionPanel
        key={component.id}
        index={i}
        id={component.id}
        updateComponent={updateComponent}
        component={component}
        focusComponent={focusComponent}
        addChild={addChild}
      />
    ));

    return (
      <div className="column left">
        <Grid container alignItems="baseline" align="stretch">
          <Grid item xs={10}>
            <TextField
              id="title-input"
              label="Add a new component"
              placeholder="AppComponent"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              onKeyPress={(ev) => {
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
          <Grid item xs={2}>
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
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(LeftContainer);

// LeftContainer.propTypes = {
//   components: PropTypes.array.isRequired,
//   addComponent: PropTypes.func.isRequired,
//   deleteComponent: PropTypes.func.isRequired,
//   updateComponent: PropTypes.func.isRequired,
//   deleteAllData: PropTypes.func.isRequired,
//   moveToBottom: PropTypes.func.isRequired,
//   moveToTop: PropTypes.func.isRequired,
//   focusComponent: PropTypes.object.isRequired,
//   openExpansionPanel: PropTypes.func.isRequired,
//   totalComponents: PropTypes.number.isRequired,
//   classes: PropTypes.object,
// };

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
