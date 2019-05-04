import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { updateHtmlAttr } from "../actions/components";
import UpdateIcon from "@material-ui/icons/Update";
import { HTMLelements, getSize } from "../utils/htmlElements.util";

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

  handleChange = event => {
    console.log(event.target.id, event.target.value);
    this.setState({
      [event.target.id]: event.target.value.trim()
    });
  };

  // setInitialState = () => {
  //   HTMLelements[focusChildType].attributes.forEach(attr =>
  //     this.setState({ attr: "" })
  //   );
  // };

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

    console.log(focusChild);

    const HtmlForm = HTMLelements[focusChildType].attributes.map((attr, i) => {
      return (
        <Grid
          container
          spacing={8}
          alignItems="baseline"
          align="stretch"
          key={i}
        >
          <Grid item xs={6}>
            <TextField
              id={attr}
              label={attr}
              margin="normal"
              autoFocus
              // style={(marginLeft = "20px")}
              onChange={this.handleChange}
              value={this.state[attr]}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                className: classes.input
              }}
            />
            <IconButton
              aria-label="Update"
              onClick={() => {
                updateHtmlAttr({ attr, value: this.state[attr] });
              }}
              // onClick={() => {
              //   addChild({ title, childType: "COMP" });
              // }}
            >
              <UpdateIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              id="filled-disabled"
              label={attr}
              defaultValue={focusChild.HTMLInfo[attr]}
              style={{ background: "bcbcbc" }}
              className={classes.textField}
              margin="normal"
              variant="filled"
            />
          </Grid>
        </Grid>
      );
    });
    // console.log(HtmlForm);

    return <div className={"htmlattr"}>{HtmlForm}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HtmlAttr));
