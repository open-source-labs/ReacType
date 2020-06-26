import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import { updateHtmlAttr } from '../../actions/actionCreators';
import { HTMLelements } from '../../utils/htmlElements.util';
import { PropsInt, PropInt } from '../../interfaces/Interfaces';

interface HTMLAttrPropsInt extends PropsInt {
  classes?: any;
  updateHtmlAttr?: (arg: { attr: string; value: string }) => void;
}

interface StateInt {}

const mapDispatchToProps = (dispatch: any) => ({
  updateHtmlAttr: ({ attr, value }: { attr: string; value: string }) => {
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
const buttonTypeOptions = Object.keys(availableButtonTypes).map(type => (
  <option value={type} key={type} style={{ color: '#000' }}>
    {type}
  </option>
));

// this is a variable to save temp state for button types
let buttonTypeTemp: string;

// HtmlAttr is creating attributes grabbed from htmlElement & placing them
// as the new state
class HtmlAttr extends Component<HTMLAttrPropsInt, StateInt> {
  state = HTMLelements[this.props.focusChild.htmlElement].attributes.reduce(
    (acc: any, attr: any) => {
      acc[attr] = '';

      return acc;
    },
    {}
  );

  handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // reassigns global variable for use by other listener functions
    buttonTypeTemp = event.target.value;
    this.setState({
      [event.target.id]: buttonTypeTemp
    });
  };

  // if button type, then create conditional where the value will be returned if attr === button
  // then return the button.value
  handleSave = (attr: string | any) => {
    if (attr == 'type') {
      this.props.updateHtmlAttr({ attr, value: buttonTypeTemp });
      this.setState({
        [attr]: ''
      });
    } else {
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
          style={{
            marginTop: '10px',
            marginRight: '20px',
            background: '5px solid yellow'
          }}
        >
          <Grid item xs={1}>
            {/* if the attr being rendered for the HTMLForm is a button, then give it a special 
          condition to render a "select" component rather than a text-input component */}
            {attr == 'type' ? (
              <FormControl required>
                <InputLabel className={classes.selectLabel} htmlFor="htmlType">
                  Type
                </InputLabel>
                <Select
                  native
                  className={classes.select}
                  id="htmlType"
                  placeholder="title"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    this.handleChange(event)
                  }
                  value={buttonTypeTemp}
                  defaultValue={`${``}`}
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
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  className: classes.input
                }}
                label={attr}
                variant="outlined"
                id={attr}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.handleChange(event)
                }
                value={this.state[attr]}
              />
            )}
          </Grid>
          <Grid item xs={2}>
            <Fab
              variant="extended"
              size="small"
              color="default"
              aria-label="Save"
              className={classes.save}
              onClick={e => {
                e.preventDefault();
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
                  : 'no attribute assigned'}
              </p>
            </Paper>
          </Grid>
        </Grid>
      )
    );

    return <div className={'htmlattr'}>{HtmlForm}</div>;
  }
}

const styles = (theme: Theme): any => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: '30px',
    width: '15rem',
    marginTop: '1rem',
    borderRadius: '5px'
  },
  cssLabel: {
    color: 'white',
    marginTop: '10px'
  },
  cssFocused: {
    color: 'green'
  },
  input: {
    color: '#fff',
    opacity: '0.7',
    height: '45px',
    width: '146px',
    marginTop: '20px',
    borderRadius: '5px',
    border: '1px solid #33eb91'
  },
  select: {
    background: '#424242',
    height: '45px',
    width: '146px',
    marginTop: '0px',
    color: '#fff',
    paddingLeft: '14px',
    borderRadius: '5px'
  },
  selectLabel: {
    color: 'white',
    zIndex: '10',
    dropShadow: '1px 1px 3px #fff',
    marginTop: '10px'
  },

  save: {
    height: '45px',
    width: '146px',
    marginTop: '23px',
    marginLeft: '35px',
    borderRadius: '2px'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HtmlAttr));
