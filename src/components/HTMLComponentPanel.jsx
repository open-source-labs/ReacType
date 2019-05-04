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
import theme from "../components/theme.ts";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Chip from "@material-ui/core/Chip";

// import {HTMLelements,getSize} from "../utils/htmlElements.util";

class HTMLComponentPanel extends Component {
  state = {
    HtmlComponentName: '',
  };

  handleChange = event => {
    this.setState({
      HtmlComponentName: event.target.value,
    });
  };

  handleCreateComponent = componentType => {
    let compNameAndType = this.state.componentName + componentType;
    addChild(compNameAndType);
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
        <Grid container spacing={24} alignItems="baseline" align="stretch">
          <Grid item xs={4}>
            <div className="htmliconwrapper">
              <IconButton
                className="htmlicons"
                aria-label="Image"
                onClick={() => {
                  this.handleCreateHTMLChild("Image");
                }}
              >
                <ImageIcon />
              </IconButton>
              <Chip label="Image" className={classes.chip} variant="outlined" />
            </div>
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

function styles(theme) {
  return {
    htmlPanel: {
      width: "100%",
      height: "33%",
      backgroundColor: "#333333",
      bottom: "0px",
      padding: "20px"
    },
    chip: {
      background: "rgba(193, 66, 66, 0)"
    },
    htmliconwrapper: {
      verticalAlign: "baseline"
    },
    htmlicons: {
      color: "#ffffff"
    },
    tabRoot: {
      textTransform: "initial",
      minWidth: 100,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing.unit * 4,
      color: "#ffffff"
    }
  };
}

export default withStyles(styles)(HTMLComponentPanel);
