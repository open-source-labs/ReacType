import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { updateHtmlAttr } from '../actions/components';
import { HTMLelements, getSize } from '../utils/htmlElements.util.ts';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cssLabel: {
    color: 'white',
    '&$cssFocused': {
      color: 'green',
    },
  },
  input: {
    color: '#fff',
    opacity: '0.7',
    marginBottom: '10px',
  },
});

const mapDispatchToProps = dispatch => ({
  updateHtmlAttr: ({ attr, value }) => dispatch(updateHtmlAttr({ attr, value })),
});

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
});

class HtmlAttr extends Component {
  state = HTMLelements[this.props.focusChild.htmlElement].attributes.reduce((acc, attr) => {
    acc[attr] = '';
    return acc;
  }, {});

  handleSave = (attr) => {
    console.log(attr, this.state[attr]);
    this.props.updateHtmlAttr({ attr, value: this.state[attr] });
    this.setState({
      [attr]: '',
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  };

  render() {
    const {
      focusComponent, classes, deleteProp, addProp, focusChild, updateHtmlAttr,
    } = this.props;

    const focusChildType = focusChild.htmlElement;

    const HtmlForm = HTMLelements[focusChildType].attributes.map((attr, i) => (
      <Grid container spacing={0} key={i} style={{ marginTop: '10px', marginRight: '20px' }}>
        <Grid item xs={1.5}>
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
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
            style={{ background: '#424242' }}
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
            size="large"
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
          <Paper className={classes.root} elevation={1}>
            <p style={{ color: 'black' }}>
              {attr}
              {':  '}
            </p>
            <p style={{ color: 'grey' }}>
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
