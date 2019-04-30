import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import FormIcon from "@material-ui/icons/Description";
import ButtonIcon from "@material-ui/icons/EditAttributes";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import ParagraphIcon from "@material-ui/icons/LocalParking";
import theme from "../components/theme";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class HTMLComponentPanel extends Component {
  state = {
    HtmlComponentName: ""
  };

  handleChange = event => {
    this.setState({
      HtmlComponentName: event.target.value
    });
  };

  handleCreateComponent = componentType => {
    let compNameAndType = this.state.componentName + componentType;
    addChild(compNameAndType);
  };

  render() {
    const { addChild } = this.props;
    return (
      <Paper className={"htmlPanelz"}>
        <TextField
          id="title-input"
          label="Add HTML component"
          placeholder="Name of Component"
          margin="normal"
          autoFocus
          onChange={this.handleChange}
          // value={HtmlComponentName}
          // name="HtmlComponentName"
          // className={classes.light}
          // InputProps={{
          //   className: classes.input
          // }}
          // InputLabelProps={{
          //   className: classes.input
          // }}
        />
        <Grid container spacing={24} alignItems="baseline" align="stretch">
          <Grid item xs={4}>
            <IconButton
              aria-label="Image"
              onClick={() => {
                console.log(addChild);
                // addChild({ title: "ImageX" });
                // has to be the title of the focus component
                // need to add another parameter for the type of the
              }}
            >
              <ImageIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="Form">
              <FormIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="Button">
              <ButtonIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="Link">
              <LinkIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="List">
              <ListIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="List">
              <ParagraphIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function styles() {
  return {};
}

export default withStyles(styles)(HTMLComponentPanel);
