import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import FormIcon from "@material-ui/icons/Description";
import ButtonIcon from "@material-ui/icons/EditAttributes";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import ParagraphIcon from "@material-ui/icons/LocalParking";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Chip from "@material-ui/core/Chip";


interface PropsInt {
  classes: any;
  addChild: any;
}

interface StateInt {
  HtmlComponentName: string;
}

class HTMLComponentPanel extends Component<PropsInt, StateInt> {
  state = {
    HtmlComponentName: ""
  };

  handleChange = event => {
    this.setState({
      HtmlComponentName: event.target.value
    });
  };

  handleCreateHTMLChild = type => {
    this.props.addChild({ title: type, childType: type, HTMLInfo: {} });
  };

  render() {
    const { classes } = this.props;
    return (
      <div align="center">
        <Tab
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          label="Add HTML elements"
          style={{ cursor: 'default' }}
        />
        <Grid container spacing={8} align="center">
          <Grid item xs={4}>
            <div className="htmliconwrapper">
              <IconButton
                className="htmlicons"
                aria-label="Image"
                onClick={() => {
                  this.handleCreateHTMLChild("Image");
                }}
                style={{
                  margin: 0,
                  padding: 0
                }}
              >
                <ImageIcon
                  style={{
                    color: "#e0e0e0"
                  }}
                />
              </IconButton>
              <Chip
                label="Image"
                className={classes.chip}
                variant="outlined"
                style={{
                  color: "white",
                  fontSize: "80%",
                  margin: 0,
                  padding: 0
                }}
                onClick={() => {
                  this.handleCreateHTMLChild('Image');
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Form"
              onClick={() => {
                this.handleCreateHTMLChild("Form");
              }}
              style={{
                margin: 0,
                padding: 0
              }}
            >
              <FormIcon style={{ color: "#e0e0e0" }} />
            </IconButton>
            <Chip
              label="Form"
              className={classes.chip}
              variant="outlined"
              style={{
                color: "white",
                fontSize: "80%"
              }}
              onClick={() => {
                this.handleCreateHTMLChild('Form');
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Button"
              onClick={() => {
                this.handleCreateHTMLChild("Button");
              }}
              style={{
                margin: 0,
                padding: 0
              }}
            >
              <ButtonIcon style={{ color: "#e0e0e0" }} />
            </IconButton>
            <Chip
              label="Button"
              className={classes.chip}
              variant="outlined"
              style={{
                color: "white",
                fontSize: "80%"
              }}
              onClick={() => {
                this.handleCreateHTMLChild('Button');
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="Link"
              onClick={() => {
                this.handleCreateHTMLChild("Link");
              }}
              style={{
                margin: 0,
                padding: 0
              }}
            >
              <LinkIcon style={{ color: "#e0e0e0" }} />
            </IconButton>
            <Chip
              label="Link"
              className={classes.chip}
              variant="outlined"
              style={{
                color: "white",
                fontSize: "80%"
              }}
              onClick={() => {
                this.handleCreateHTMLChild('Link');
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton
              className="htmlicons"
              aria-label="List"
              onClick={() => {
                this.handleCreateHTMLChild("List");
              }}
              style={{
                margin: 0,
                padding: 0
              }}
            >
              <ListIcon style={{ color: "#e0e0e0" }} />
            </IconButton>
            <Chip
              label="List"
              className={classes.chip}
              variant="outlined"
              style={{
                color: "white",
                fontSize: "80%"
              }}
              onClick={() => {
                this.handleCreateHTMLChild('List');
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              margin: 0,
              padding: 0
            }}
          >
            <IconButton
              className="htmlicons"
              aria-label="Paragraph"
              onClick={() => {
                this.handleCreateHTMLChild("Paragraph");
              }}
              style={{
                margin: 0,
                padding: 0
              }}
            >
              <ParagraphIcon
                style={{
                  color: "#e0e0e0",
                  paddingRight: "0px",
                  marginRight: "0px"
                }}
              />
            </IconButton>
            <Chip
              label="Paragraph"
              className={classes.chip}
              variant="outlined"
              style={{
                color: "white",
                fontSize: "62%",
                padding: "0px",
                margin: "0px"
              }}
              onClick={() => {
                this.handleCreateHTMLChild('Paragraph');
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

function styles(theme): any {
  return {
    htmlPanel: {
      width: "100%",
      height: "30%",
      backgroundColor: "#212121",
      borderStyle: "solid",
      borderWidth: "0.5px",
      borderRadius: "1px",
      borderColor: "#424242",
      bottom: "0px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingBottom: "25px",
      paddingTop: "2px",
      boxShadow: "0 6px 6px rgba(0,0,0,0.23)"
      // paddingBottom: "10px"
    },
    chip: {
      color: "rgba(193, 66, 66, 0)"
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
      // marginRight: theme.spacing.unit * 4,
      color: "#ffffff"
    }
  };
}

export default withStyles(styles)(HTMLComponentPanel);
