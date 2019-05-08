import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import FormIcon from '@material-ui/icons/Description';
import ButtonIcon from '@material-ui/icons/EditAttributes';
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from '@material-ui/icons/List';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import theme from './theme.ts';

class HTMLComponentPanel extends Component {
  state = {
    HtmlComponentName: '',
  };

  handleChange = (event) => {
    this.setState({
      HtmlComponentName: event.target.value,
    });
  };

  handleCreateHTMLChild = (type) => {
    this.props.addChild({ title: type, childType: type, HTMLInfo: {} });
  };

  render() {
    const { addChild } = this.props;
    return (
      <div className={classes.htmlPanel}>
        <Tab
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          label="Add HTML elements"
        />
        <Grid container spacing={8} alignItems="baseline" align="stretch">
          <Grid item xs={4}>
            <div className="htmliconwrapper">
              <IconButton
                className="htmlicons"
                aria-label="Image"
                onClick={() => {
                  this.handleCreateHTMLChild('Image');
                }}
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <ImageIcon
                  style={{
                    color: '#e0e0e0',
                  }}
                />
              </IconButton>
              <Chip
                label="Image"
                className={classes.chip}
                variant="outlined"
                style={{
                  color: 'white',
                  fontSize: '50%',
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Form"
              onClick={() => {
                this.handleCreateHTMLChild('Form');
              }}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <FormIcon style={{ color: '#e0e0e0' }} />
            </IconButton>
            <Chip
              label="Form"
              className={classes.chip}
              variant="outlined"
              style={{
                color: 'white',
                fontSize: '50%',
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Button"
              onClick={() => {
                this.handleCreateHTMLChild('Button');
              }}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <ButtonIcon style={{ color: '#e0e0e0' }} />
            </IconButton>
            <Chip
              label="Button"
              className={classes.chip}
              variant="outlined"
              style={{
                color: 'white',
                fontSize: '50%',
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Link"
              onClick={() => {
                this.handleCreateHTMLChild('Link');
              }}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <LinkIcon style={{ color: '#e0e0e0' }} />
            </IconButton>
            <Chip
              label="Link"
              className={classes.chip}
              variant="outlined"
              style={{
                color: 'white',
                fontSize: '50%',
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="List"
              onClick={() => {
                this.handleCreateHTMLChild('List');
              }}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <ListIcon style={{ color: '#e0e0e0' }} />
            </IconButton>
            <Chip
              label="List"
              className={classes.chip}
              variant="outlined"
              style={{
                color: 'white',
                fontSize: '50%',
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Paragraph"
              onClick={() => {
                this.handleCreateHTMLChild('Paragraph');
              }}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <ParagraphIcon style={{ color: '#e0e0e0' }} />
            </IconButton>
            <Chip
              label="Paragraph"
              className={classes.chip}
              variant="outlined"
              style={{
                color: 'white',
                fontSize: '50%',
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function styles(theme) {
  return {
    htmlPanel: {
      width: '100%',
      height: '30%',
      backgroundColor: '#212121',
      borderStyle: 'solid',
      borderWidth: '0.5px',
      borderRadius: '1px',
      borderColor: '#424242',
      bottom: '0px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingBottom: '25px',
      paddingTop: '2px',
      boxShadow: '0 6px 6px rgba(0,0,0,0.23)',
      // paddingBottom: "10px"
    },
    chip: {
      color: 'rgba(193, 66, 66, 0)',
    },
    htmliconwrapper: {
      verticalAlign: 'baseline',
    },
    htmlicons: {
      color: '#ffffff',
    },
    tabRoot: {
      textTransform: 'initial',
      minWidth: 100,
      fontWeight: theme.typography.fontWeightRegular,
      // marginRight: theme.spacing.unit * 4,
      color: '#ffffff',
    },
  };
}

export default withStyles(styles)(HTMLComponentPanel);
