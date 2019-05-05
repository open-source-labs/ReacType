import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Props from "./Props.jsx";
import HtmlAttr from "./HtmlAttr.jsx";
// import Tree from "./Tree.jsx";
import Tree from "react-d3-tree";

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#212121",
    backgroundColor: "#333333",
    height: "100%",
    color: "#fff",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  },
  tabsRoot: {
    borderBottom: "0.5px solid #424242"
    // backgroundColor: "#424242"
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

  findChildren(component, components, tree) {
    console.log("hello");
    console.log("component", component);
    console.log("components", components);
    console.log("tree", tree);

    // console.log(component.childrenArray.length)
    if (!component.childrenArray.length) {
      return tree;
    }
    let newChildrenArray = [];

    for (let i = 0; i < component.childrenArray.length; i++) {
      let name;

      name = component.childrenArray[i].componentName;

      // if(component.childrenArray[i].childType === "HTML") {
      //   name = component.childrenArray[i].componentName
      // } else {
      //   name = component.childrenArray[i].title
      // }

      let newTree = {
        name: name,
        attributes: {},
        children: []
      };

      newChildrenArray.push(newTree);

      tree.children = newChildrenArray;

      // console.log('hello', component.childrenArray[i])

      // console.log(component.childrenArray[i].componentName)

      if (component.childrenArray[i].childType === "HTML") {
        console.log("im html");
      } else {
        let newFocusComp = components.find(
          comp => comp.title === component.childrenArray[i].componentName
        );

        // console.log(newFocusComp)
        console.log(tree);

        this.findChildren(newFocusComp, components, newTree);
      }
    }
    return tree;
  }

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

    console.log(components);

    let tree = {
      name: focusComponent.title,
      attributes: {},
      children: []
    };

    let treeExample = [
      {
        name: "App",
        attributes: {},
        children: [
          { name: "Image", attributes: {}, children: [] },
          {
            name: "Board",
            attributes: {},
            children: [
              {
                name: "Row",
                attributes: {},
                children: [
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  },
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  },
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  }
                ]
              },
              {
                name: "Row",
                attributes: {},
                children: [
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  },
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  },
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  }
                ]
              },
              {
                name: "Row",
                attributes: {},
                children: [
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  },
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  },
                  {
                    name: "Box",
                    attributes: {},
                    children: [{ name: "Button", attributes: {}, children: [] }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

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

        {value === 0 && (
          <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
            <Tree
              data={[this.findChildren(focusComponent, components, tree)]}
              // data={treeExample}
            />
          </div>
        )}
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

export default withStyles(styles)(RightTabs);
