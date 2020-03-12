import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import { updateHtmlAttr } from '../actions/components.ts';
import { HTMLelements } from '../utils/htmlElements.util.ts';
import { ComponentInt, ChildInt } from '../utils/Interfaces.ts';

interface PropsInt {
  updateHtmlAttr: any;
  focusComponent: ComponentInt;
  classes: any;
  deleteProp: any;
  addProp: any;
  focusChild: ChildInt;
}

interface StateInt {}

const styles = (theme: any): any => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  cssLabel: {
    color: 'white'
  },
  cssFocused: {
    color: 'green'
  },
  input: {
    color: '#fff',
    opacity: '0.7',
    marginBottom: '15px'
  }
});

const mapDispatchToProps = (dispatch: any) => ({
  updateHtmlAttr: ({ attr, value }: { attr: string; value: string }) => {
    console.log('this is attr from mapDispatchToProps for HtmlAttr', attr);
    dispatch(updateHtmlAttr({ attr, value }));
  }
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild
});

// available types for select drop-down for button types
const availableButtonTypes = {
  button: 'BUTTON',
  submit: 'SUBMIT',
  reset: 'RESET'
};

// function for generating the button types for select dropdown
const buttonTypeOptions = [
  <option value='' key='' />,
  ...Object.keys(availableButtonTypes).map(type => (
    <option value={type} key={type} style={{ color: '#000' }}>
      {type == null ? '' : type}
    </option>
  ))
];

// this is a variable to save temp state for button types
let buttonTypeTemp;

// HtmlAttr is creating attributes grabbed from htmlElement & placing them
// as the new state
class HtmlAttr extends Component<PropsInt, StateInt> {
  state = HTMLelements[this.props.focusChild.htmlElement].attributes.reduce(
    (acc, attr) => {
      // if ((attr = 'button' || 'submit' || 'reset')) acc[attr] = '';
      // else
      acc[attr] = '';

      return acc;
    },
    {}
  );

  // looks like:
  // className: '',
  // id: '',
  // type: '',
  // propType: ''

  handleChange = (event: MouseEvent) => {
    // delete whenever you see this
    // just for testing
    // switch(event.target.id )
    // console.log(
    //   'EVENT.TARGET.VALUE DATA FROM HANDLECHANGE',
    //   event.target.value
    // );

    if (
      event.target.value == 'button' ||
      event.target.value == 'submit' ||
      event.target.value == 'reset'
    ) {
      buttonTypeTemp = event.target.value;
    }

    // console.log('this is buttonType from handleChange', buttonTypeTemp);

    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // if button type, then create conditional where the value will be returned if attr === button
  // then return the button.value
  handleSave = (attr: any) => {
    // console.log('this is attribute upon saving', attr.value);
    if (attr == 'type') {
      this.props.updateHtmlAttr({ attr, value: buttonTypeTemp });
      this.setState({
        [attr]: ''
      });
      // console.log(attr.value);
    }
    // console.log(
    //   'from handleSave\nthis is attr:',
    //   attr,
    //   ' this is value: ',
    //   value
    // );
    else {
      this.props.updateHtmlAttr({ attr, value: this.state[attr] });
      this.setState({
        [attr]: ''
      });
    }
  };

  render() {
    const { classes, focusChild } = this.props;

    const focusChildType = focusChild.htmlElement;

    const HtmlForm = HTMLelements[focusChildType].attributes.map(
      (attr: string, i: number) => (
        <Grid
          container
          spacing={0}
          key={i}
          style={{ marginTop: '10px', marginRight: '20px' }}
        >
          <Grid item xs={1}>
            {/* if the attr being rendered for the HTMLForm is a button, then give it a special 
          condition to render a "select" component rather than a text-input component */}
            {attr == 'type' ? (
              <FormControl required>
                <InputLabel className={classes.light} htmlFor='htmlType'>
                  Type
                </InputLabel>
                <Select
                  native
                  className={classes.light}
                  id='htmlType'
                  placeholder='title'
                  onChange={this.handleChange}
                  value={buttonTypeTemp}
                  defaultValue={'button'}
                  style={{
                    background: '#424242',
                    height: '43px',
                    width: '146px',
                    marginBottom: '23px',
                    marginTop: '0px',
                    color: '#fff',
                    paddingLeft: '14px'
                  }}
                  required
                >
                  {buttonTypeOptions}
                </Select>
              </FormControl>
            ) : (
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    input: classes.input
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.input
                  }
                }}
                style={{ background: '#424242', height: '70%' }}
                label={attr}
                variant='outlined'
                id={attr}
                onChange={this.handleChange}
                value={this.state[attr]}
              />
            )}
          </Grid>
          <Grid item xs={2}>
            <Fab
              variant='extended'
              size='small'
              color='default'
              aria-label='Save'
              style={{
                marginLeft: '10px',
                marginTop: '5px',
                marginBottom: '10px'
              }}
              onClick={e => {
                e.preventDefault();
                // console.log('attr from save button', attr);
                if (attr === 'type') {
                  // attr = buttonTypeTemp;
                }
                this.handleSave(attr);
              }}
            >
              <SaveIcon />
              Save
            </Fab>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.root} style={{ height: '70%' }}>
              <p style={{ color: 'black' }}>
                {focusChild.HTMLInfo[attr]
                  ? focusChild.HTMLInfo[attr]
                  : ' no attribute assigned'}
              </p>
            </Paper>
          </Grid>
        </Grid>
      )
    );

    return <div className={'htmlattr'}>{HtmlForm}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HtmlAttr));
