import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import { addProp, deleteProp } from '../actions/components';
import DataTable from './DataTable';
import { ComponentInt, PropInt, PropsInt } from '../utils/Interfaces';

interface PropsPropsInt extends PropsInt {
  classes: any;
  addProp(arg: PropInt): void;
  deleteProp(propId: number): void;
}

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    color: '#eee',
    backgroundColor: '#333333'
  },
  column: {
    display: 'inline-flex',
    alignItems: 'baseline'
  },
  icon: {
    fontSize: '20px',
    color: '#eee',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red'
    }
  },
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green'
    }
  },
  cssFocused: {},
  input: {
    color: '#eee',
    marginBottom: '10px',
    width: '60%'
  },
  light: {
    color: '#eee'
  },
  avatar: {
    color: '#eee',
    fontSize: '10px'
  }
});

const mapDispatchToProps = (dispatch: any) => ({
  addProp: (prop: PropInt) => dispatch(addProp(prop)),
  deleteProp: (propId: number) => dispatch(deleteProp(propId))
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent
});

// available types for select drop-down for button types
const availablePropTypes = {
  string: 'STR',
  number: 'NUM',
  object: 'OBJ',
  array: 'ARR',
  boolean: 'BOOL',
  function: 'FUNC',
  // symbol: 'SYM',
  // node: 'NODE',
  // element: 'ELEM',
  any: 'ANY',
  tuple: 'TUP',
  enum: 'ENUM'
};

// generates the various options for the prop type selection
const typeOptions = [
  <option value='' key='' />,
  ...Object.keys(availablePropTypes).map(type => (
    <option value={type} key={type} style={{ color: '#000' }}>
      {type}
    </option>
  ))
];
interface StateInt {
  propVariable: string;
  propValue: string;
  propRequired: boolean;
  propType: string;
}
class Props extends Component<PropsPropsInt, StateInt> {
  constructor(props: PropsPropsInt) {
    super(props);
    this.state = {
      propVariable: '',
      propValue: '',
      propRequired: true,
      propType: ''
    };
  }

  handleChange = (event: MouseEvent | any) => {
    if (event.target.id === 'propVariable') {
      this.setState({
        [event.target.id]: event.target.value.trim()
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  };

  togglePropRequired = () => {
    this.setState({
      propRequired: !this.state.propRequired
    });
  };

  // function that handles the addition of props to a given componnent
  // added regex to strip usr input from non alpha numeric properties
  // presence of these characters crashes the app and should not be a valid input anyways
  handleAddProp = (event: MouseEvent) => {
    event.preventDefault();

    // destructuring from local state
    // if change here, make sure to change local state props to match
    let { propVariable, propValue, propRequired, propType } = this.state;
    propVariable = propVariable.replace(/[!@#$%^&*,./:;"]+\s/gi, '');
    propValue = propValue.replace(/[!@#$%^&*,./:;'"]+\s/gi, '');

    // check if prop exists with same key. CANNOT have duplicates
    const savedVariableKeys = this.props.focusComponent.props.map(
      prop => prop.key
    );
    if (savedVariableKeys.includes(propVariable)) {
      window.alert(`A prop with the name: "${propVariable}" already exists.`);
      return;
    }

    // check if prop starts with digits. Digits at string start breaks indexedDB
    if (/^\d/.test(propVariable)) {
      window.alert('Props are not allowed to begin with digits');
      return;
    }

    this.props.addProp({
      key: propVariable,
      value: propValue,
      required: propRequired,
      type: propType
    });

    this.setState({
      propVariable: '',
      propValue: '',
      propRequired: true,
      propType: ''
    });
  };

  render() {
    const { focusComponent, classes, deleteProp } = this.props;

    console.log('this is focus component', focusComponent);

    // this will display the two fields of data at the focused component level
    const rowHeader = ['Prop', 'Type'];

    // prepare the saved Props in a nice way, so you can sent them to TableData
    const propsRows = focusComponent.props.map(prop => ({
      Prop: prop.key,
      // Value: prop.value,
      Type: prop.type,
      // Required: prop.required,
      id: prop.id
    }));

    return (
      <div className={'htmlattr'}>
        {' '}
        {/* if no focus component in state, then render message */}
        {Object.keys(focusComponent).length < 1 ? (
          <div style={{ marginTop: '20px', width: '90%' }}>
            Click a component to view its props.
          </div>
        ) : (
          <Fragment>
            <div>
              <span>
                <span
                  style={{
                    fontSize: '30px',
                    textAlign: 'left'
                  }}
                >
                  {`Add Prop`}{' '}
                  <span
                    style={{
                      color: '#319431',
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    And
                  </span>
                  <span>{`Types`}</span>
                </span>
              </span>
              <span>
                <span
                  style={{
                    fontSize: '30px',
                    textAlign: 'left'
                  }}
                >
                  {`All Props History`}
                </span>
              </span>
            </div>
            <div
              className='props-container'
              style={{ marginTop: '20px', width: '90%', height: '80%' }}
            >
              <Grid container spacing={8}>
                <Grid item xs={3}>
                  <form className='props-input' onSubmit={this.handleAddProp}>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <FormControl>
                          {/* <InputLabel
                            className={classes.light}
                            htmlFor='propVariable'
                          >
                            Props
                          </InputLabel> */}
                          <TextField
                            native
                            id='propVariable'
                            label='Prop'
                            margin='normal'
                            autoFocus
                            onChange={this.handleChange}
                            value={this.state.propVariable}
                            required
                            InputProps={{
                              className: classes.input
                            }}
                            InputLabelProps={{
                              className: classes.input
                            }}
                          />
                        </FormControl>
                      </Grid>
                      {/* code for  */}
                      {/* <Grid item xs={6}>
                        <TextField
                          id='propValue'
                          label='Value'
                          margin='normal'
                          onChange={this.handleChange}
                          InputProps={{
                            className: classes.input
                          }}
                          InputLabelProps={{
                            className: classes.input
                          }}
                          value={this.state.propValue}
                        />
                      </Grid> */}
                      <Grid item xs={6}>
                        <FormControl required>
                          <InputLabel
                            className={classes.light}
                            htmlFor='propType'
                          >
                            Type
                          </InputLabel>
                          <Select
                            native
                            className={classes.light}
                            id='propType'
                            placeholder='title'
                            onChange={this.handleChange}
                            value={this.state.propType}
                            required
                          >
                            {typeOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* MAYBE not needed for React Components? */}
                      {/* <Grid item xs={6}>
                        <div className={classes.column}>
                          <InputLabel
                            className={classes.light}
                            htmlFor='propRequired'
                          >
                            Required?
                          </InputLabel>
                          <Switch
                            checked={this.state.propRequired}
                            onChange={this.togglePropRequired}
                            value='propRequired'
                            color='primary'
                            id='propRequired'
                          />
                        </div>
                      </Grid> */}
                      <Grid item>
                        <Button
                          color='primary'
                          aria-label='Add'
                          type='submit'
                          // disabled={!this.state.propKey || !this.state.propType}
                          variant='contained'
                          size='large'
                        >
                          ADD PROP
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs={8}>
                  <DataTable
                    rowHeader={rowHeader}
                    rowData={propsRows}
                    deletePropHandler={deleteProp}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Props));
