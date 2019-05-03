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
import theme from './theme.ts';
// import {HTMLelements,getSize} from "../utils/htmlElements.util";

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
    const { addChild, classes } = this.props;
    return (
<<<<<<< HEAD
      <Paper className={'htmlPanelz'}>
        <Typography variant="title" component="h3">
=======
      <div className={classes.htmlPanel}>
        <Typography variant="title" component="h4">
>>>>>>> 639d41c977d8447f856680105bf8f2ff24b70055
          Add HTML elements
        </Typography>
        {/* <TextField
          id="title-input"
          label="Add HTML component"
          placeholder="Name of Component"
          margin="normal"
          autoFocus
          onChange={this.handleChange}
          value={HtmlComponentName}
          name="HtmlComponentName"
          className={classes.light}
          InputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            className: classes.input
          }}
        /> */}
        <Grid container spacing={24} alignItems="baseline" align="stretch">
          <Grid item xs={4}>
            <IconButton
              aria-label="Image"
              onClick={() => {
                this.handleCreateHTMLChild('Image');
              }}

              // onClick={() => {
              //   console.log(addChild);
              //   addChild({ title: "Image", childType: "Image" });
              // }}
            >
              <ImageIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              aria-label="Form"
              onClick={() => {
                this.handleCreateHTMLChild('Form');
              }}
            >
              <FormIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              aria-label="Button"
              onClick={() => {
                this.handleCreateHTMLChild('Button');
              }}
            >
              <ButtonIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              aria-label="Link"
              onClick={() => {
                this.handleCreateHTMLChild('Link');
              }}
            >
              <LinkIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              aria-label="List"
              onClick={() => {
                this.handleCreateHTMLChild('List');
              }}
            >
              <ListIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              aria-label="Paragraph"
              onClick={() => {
                this.handleCreateHTMLChild('Paragraph');
              }}
            >
              <ParagraphIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function styles(theme) {
  return {
    htmlPanel: {
      width: "100%",
      height: "33%",
      // flexGrow: 1,
      backgroundColor: "#333333",
      // position: "absolute",
      // marginTop: 10,
      bottom: "0px"
      // // marginRight: "20px",
      // // marginLeft: "20px",
      // // marginBottom: "20px",
      // bottom: "0px",
      // left: "0px",
      // right: "0px"
    }
  };
}

export default withStyles(styles)(HTMLComponentPanel);
