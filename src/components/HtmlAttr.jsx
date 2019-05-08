import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import { updateHtmlAttr } from "../actions/components";
import { HTMLelements, getSize } from "../utils/htmlElements.util.ts";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit,
    color: "#eee",
    backgroundColor: "#333333"
  },
  column: {
    display: "inline-flex",
    alignItems: "baseline"
  },
  icon: {
    fontSize: "20px",
    color: "#eee",
    opacity: "0.7",
    transition: "all .2s ease",

    "&:hover": {
      color: "red"
    }
  },
  cssLabel: {
    color: "white",

    "&$cssFocused": {
      color: "green"
    }
  },
  cssFocused: {},
  input: {
    color: "#fff",
    opacity: "0.7",
    marginBottom: "10px"
  },
  light: {
    color: "#eee"
  },
  avatar: {
    color: "#eee",
    fontSize: "10px"
  }
});

const mapDispatchToProps = dispatch => ({
  updateHtmlAttr: ({ attr, value }) => dispatch(updateHtmlAttr({ attr, value }))
});

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild
});

class HtmlAttr extends Component {
  state = HTMLelements[this.props.focusChild.htmlElement].attributes.reduce(
    (acc, attr) => {
      acc[attr] = "";
      return acc;
    },
    {}
  );

  handleSave = attr => {
    console.log(attr, this.state[attr]);
    this.props.updateHtmlAttr({ attr, value: this.state[attr] });
    this.setState({
      [attr]: ""
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value.trim()
    });
  };

  componentDidUpdate() {
    console.log("focuschild", this.props.focusChild);
  }

  render() {
    const {
      focusComponent,
      classes,
      deleteProp,
      addProp,
      focusChild,
      updateHtmlAttr
    } = this.props;

    const focusChildType = focusChild.htmlElement;

    // console.log(focusChild);

    const HtmlForm = HTMLelements[focusChildType].attributes.map((attr, i) => (
      <Grid
        container
        spacing={0}
        alignItems="stretch"
        // align="stretch"
        key={i}
        direction="row"
        justify="flex-start"
        style={{ marginTop: "10px", marginRight: "20px" }}
      >
        <Grid item xs={4}>
          <TextField
            className={classes.margin}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              }
            }}
            style={{ background: "#424242" }}
            label={attr}
            variant="outlined"
            id={attr}
            onChange={this.handleChange}
            value={this.state[attr]}
          />
        </Grid>
        <Grid item xs={4}>
          <Fab
            variant="extended"
            size="small"
            color="default"
            aria-label="Delete"
            className={classes.margin}
            style={{
              marginLeft: "10px",
              marginTop: "5px",
              marginBottom: "10px"
            }}
            onClick={() => this.handleSave(attr)}
          >
            <SaveIcon className={classes.extendedIcon} />
            Save
          </Fab>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.root} elevation={1}>
            <p style={{ color: "gray" }}>
              {attr}
              {":  "}
            </p>
            <p style={{ color: "black" }}>
              {focusChild.HTMLInfo[attr]
                ? focusChild.HTMLInfo[attr]
                : "no attribute assigned"}
            </p>
          </Paper>
        </Grid>
      </Grid>
    ));

    return <div className={"htmlattr"}>{HtmlForm}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HtmlAttr));
