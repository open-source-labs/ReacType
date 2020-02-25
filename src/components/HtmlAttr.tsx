import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { updateHtmlAttr } from '../actions/components';
import { HTMLelements } from '../utils/htmlElements.util';
import { ComponentInt, ChildInt } from '../utils/interfaces';

interface PropsInt {
  updateHtmlAttr: any;
  focusComponent: ComponentInt;
  classes: any;
  deleteProp: any;
  addProp: any;
  focusChild: ChildInt;
}

interface StateInt { }

const styles = (theme: any): any => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cssLabel: {
    color: 'white',
  },
  cssFocused: {
    color: 'green',
  },
  input: {
    color: '#fff',
    opacity: '0.7',
    marginBottom: '15px',
  },
});

const mapDispatchToProps = (dispatch: any) => ({
  updateHtmlAttr: ({ attr, value }: { attr: string; value: string }) => dispatch(updateHtmlAttr({ attr, value })),
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
});

class HtmlAttr extends Component<PropsInt, StateInt> {
  state = HTMLelements[this.props.focusChild.htmlElement].attributes.reduce((acc, attr) => {
    acc[attr] = '';
    return acc;
  }, {});

  handleSave = (attr: string) => {
    this.props.updateHtmlAttr({ attr, value: this.state[attr] });
    this.setState({
      [attr]: '',
    });
  };

  handleChange = (event: any) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  };

  render() {
    const { classes, focusChild } = this.props;

    const focusChildType = focusChild.htmlElement;

    const HtmlForm = HTMLelements[focusChildType].attributes.map((attr: string, i: number) => (
      <Grid container spacing={0} key={i} style={{ marginTop: '10px', marginRight: '20px' }}>
        <Grid item xs={2}>
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
                input: classes.input,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.input,
              },
            }}
            style={{ background: '#424242', height: '70%' }}
            label={attr}
            variant="outlined"
            id={attr}
            onChange={this.handleChange}
            value={this.state[attr]}
          />
        </Grid>
        <Grid item xs={1}>
          <Fab
            variant="extended"
            size="small"
            color="default"
            aria-label="Save"
            style={{
              marginLeft: '10px',
              marginTop: '5px',
              marginBottom: '10px',
            }}
            onClick={() => this.handleSave(attr)}
          >
            <SaveIcon />
            Save
          </Fab>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.root} style={{ height: '70%' }}>
            <p style={{ color: 'black' }}>
              {focusChild.HTMLInfo[attr] ? focusChild.HTMLInfo[attr] : ' no attribute assigned'}
            </p>
          </Paper>
        </Grid>
      </Grid>
    ));

    return <div className={'htmlattr'}>{HtmlForm}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HtmlAttr));
