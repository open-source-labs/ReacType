import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { addProp, deleteProp } from '../../actions/actionCreators';
import DataTable from './DataTable';
import { PropInt, PropsInt } from '../../interfaces/Interfaces';

interface PropsPropsInt extends PropsInt {
  classes: any;
  addProp(arg: PropInt): void;
  deleteProp(propId: number): void;
}

interface StateInt {
  propVariable: string;
  propValue: string;
  propRequired: boolean;
  propType: string;
}

const styles = () => ({
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
  propHeader: {
    fontSize: '35px',
    fontWeight: '900',
    marginLeft: '2%',
    paddingTop: '10px'
  },
  dataTableHeader: {
    fontSize: '35px',
    fontWeight: '900',
    marginLeft: '20%',
    marginTop: '15px',
    paddingTop: '10px'
  },
  cssFocused: {},
  input: {
    color: '#fff',
    marginBottom: '10px',
    width: '160px',
    backgroundColor: 'none',
    borderRadius: '5px',
    height: '40%',
    paddingLeft: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '10px',
    fontSize: '1.2rem',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    border: '1px solid #33eb91'
  },
  inputLabel: {
    fontSize: '16px',
    zIndex: '20',
    color: '#fff',
    marginLeft: '10px'
  },
  select: {
    color: '#fff',
    marginBottom: '10px',
    width: '120px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    height: '40%',
    overflowWrap: 'break-word',
    paddingLeft: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '1.2rem',
    border: '1px solid #33eb91'
  },
  selectLabel: {
    fontSize: '16px',
    zIndex: '20',
    color: '#fff',
    marginLeft: '10px'
  },
  addProp: {
    width: '15rem',
    marginLeft: '45%',
    height: '4rem',
    transition: 'all 0.1s ease-out',
    border: '2px solid #33eb91',
    background: 'transparent',
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.1)',
      fontSize: '1.2rem',
      backgroundColor: '#33eb91',
      color: '#006400'
    }
  },
  dataTable: {
    border: '1px solid red',
    backgroundColor: 'red',
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

  // using useState to locally check a clickedValue
  // React.ChangeEvent<HTML...Element> is the correct typing for events
  handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.id === 'propVariable') {
      this.setState({
        [event.target.id]: event.target.value.trim()
      });
    } else {
      this.setState({
        ...this.state, // JZ: added state here to correct typing error of missing properties
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
  handleAddProp = (event: React.ChangeEvent<HTMLFormElement>) => {
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

    // this will display the two fields of data at the focused component level
    const rowHeader = ['Prop', 'Type'];

    // prepare the saved Props in a nice way, so you can sent them to TableData
    const propsRows = focusComponent.props.map(prop => ({
      Prop: prop.key,
      // Value: prop.value,
      Type: prop.type,
      id: prop.id
    }));

    return (
      <div
        className={'htmlattr'}
        style={{ overflowY: 'auto', height: '85%', marginTop: '1rem' }}
      >
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
                <span className={classes.propHeader}>
                  {`Add Prop`}{' '}
                  <span
                    style={{
                      color: '#01d46d'
                    }}
                  >
                    And
                  </span>
                  <span>{` Types`}</span>
                </span>
              </span>
              <span>
                <span
                  className={classes.dataTableHeader}
                >{`All Props History`}</span>
              </span>
            </div>
            <div
              className='props-container'
              style={{ marginTop: '20px', width: '90%', height: '80%' }}
            >
              <Grid container spacing={8} style={{ overflowY: 'auto' }}>
                <Grid item xs={3}>
                  <form
                    className='props-input'
                    // JZ: assigned typing to onSubmit event, matches handleAddProp func
                    onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
                      this.handleAddProp(event)
                    }
                  >
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <FormControl>
                          <TextField
                            type='text'
                            // native commented out due to overload error with material
                            id='propVariable'
                            label='Prop'
                            margin='none'
                            autoFocus
                            size='medium'
                            onChange={(
                              //JZ: assigned typing to incoming event
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => this.handleChange(event)}
                            value={this.state.propVariable}
                            color={'primary'}
                            required
                            InputProps={{
                              className: classes.input
                            }}
                            InputLabelProps={{
                              className: classes.inputLabel
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
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            className: classes.input,
                          }}
                          value={this.state.propValue}
                        />
                      </Grid> */}
                      <Grid item xs={6}>
                        <FormControl required>
                          <InputLabel
                            className={classes.selectLabel}
                            htmlFor='propType'
                          >
                            Type
                          </InputLabel>
                          <Select
                            native
                            className={classes.select}
                            id='propType'
                            placeholder='title'
                            onChange={this.handleChange}
                            value={this.state.propType}
                            required
                            children={typeOptions}
                          />
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
                          className={classes.addProp}
                        >
                          ADD PROP
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{
                    height: '75%',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    marginTop: '1rem',
                    // paddingBottom: '1rem',
                    marginLeft: '6rem',
                    paddingTop: '0'
                  }}
                >
                  <DataTable
                    InputProps={{
                      className: classes.dataTable
                    }}
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
