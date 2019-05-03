import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { addProp, deleteProp } from "../actions/components";
import DataTable from "./DataTable.jsx";
import htmlElements from "../utils/htmlElements.util";
import UpdateIcon from "@material-ui/icons/Update";

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
    color: "#eee",
    marginBottom: "10px",
    width: "60%"
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
  addProp: ({ key, value, required, type }) =>
    dispatch(
      addProp({
        key,
        value,
        required,
        type
      })
    ),
  deleteProp: propId => dispatch(deleteProp(propId))
});

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild
});

class HtmlAttr extends Component {
  state = {
    propKey: "",
    propValue: "",
    propRequired: false,
    propType: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value.trim()
    });
  };

  render() {
    const {
      focusComponent,
      classes,
      deleteProp,
      addProp,
      focusChild
    } = this.props;

    return (
      <Fragment>
        {/* {focusChild} */}
        <Grid container spacing={8} alignItems="baseline" align="stretch">
          <Grid item xs={6}>
            <TextField
              id="classNane"
              label="ClassName"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.propKey}
            />
            <IconButton
              aria-label="Update"
              onClick={() => {
                // this.handleCreateHTMLChild("List");
              }}
            >
              <UpdateIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              id="filled-disabled"
              label="Current Value"
              defaultValue="image"
              style={{ background: "bcbcbc" }}
              className={classes.textField}
              margin="normal"
              variant="filled"
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HtmlAttr));
