import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Badge from "@material-ui/core/Badge";
import Props from "./Props.jsx";
import HtmlAttr from "./HtmlAttr.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#212121",
    height: "100%",
    color: "#fff",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  },
  tabsRoot: {
    // borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: "#1de9b6"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#1de9b6",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#33eb91",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#4aedc4"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

class RightTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    const {
      classes,
      components,
      focusComponent,
      deleteProp,
      addProp,
      focusChild
      // rightColumnOpen
    } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Application Tree"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Component Props"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Component State"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="HTML Element Attributes"
          />
        </Tabs>
        {value === 1 && <Props />}
        {value === 3 && focusChild.childType === "HTML" && <HtmlAttr />}
        {value === 3 &&
          focusChild.childType !== "HTML" && (
            <p>Please select an HTML element to view attributes</p>
          )}
      </div>
    );
  }
}

// RightTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
//   components: PropTypes.array.isRequired,
//   focusComponent: PropTypes.object.isRequired,
//   deleteProp: PropTypes.func.isRequired,
//   addProp: PropTypes.func.isRequired,
//   rightColumnOpen: PropTypes.bool.isRequired,
// };

export default withStyles(styles)(RightTabs);
