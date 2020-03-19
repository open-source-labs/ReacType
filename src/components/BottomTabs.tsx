import React, { Component } from 'react';
import AddChildProps from './AddChildProps';
import { withStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tree from 'react-d3-tree';
import Props from './Props';
import HtmlAttr from './HtmlAttr';
import CodePreview from './CodePreview';
import {
  ComponentInt,
  ComponentsInt,
  PropInt,
  PropsInt,
} from '../utils/Interfaces';

interface BottomTabsPropsInt extends PropsInt {
  deleteProp(id: number): void;
  addProp(prop: PropInt): void;
  classes: any;
  changeFocusComponent(arg: { title: string }): void;
}

// interface TreeInt {
//   name: string;
//   attributes: { [key: string]: { value: string } };
//   children: TreeInt[];
// }

interface StateInt {
  value: number;
  translate: { x: number; y: number };
}

const styles = (theme: Theme): any => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333333',
    height: '100%',
    color: '#fff',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  tabsRoot: {
    borderBottom: '0.5px solid #424242',
  },
  tabsIndicator: {
    backgroundColor: '#1de9b6',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#1de9b6',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#33eb91',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#4aedc4',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class BottomTabs extends Component<BottomTabsPropsInt, StateInt> {
  constructor(props: BottomTabsPropsInt) {
    super(props);
    this.state = {
      value: 0,
      translate: { x: 0, y: 0 },
    };
  }
  treeWrapper: HTMLDivElement;
  componentDidMount() {
    // dynamically center the tree based on the div size
    const dimensions = this.treeWrapper.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 12,
        y: dimensions.height / 2.2,
      },
    });
  }

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleClick = (event: any, node: any) => {
    this.props.changeFocusComponent({ title: event.name });
  };

  generateComponentTree(componentId: number, components: ComponentsInt) {
    const component = components.find(comp => comp.id === componentId);
    const tree: any = { name: component.title, attributes: {}, children: [] };

    component.childrenArray.forEach(child => {
      if (child.childType === 'COMP') {
        tree.children.push(
          this.generateComponentTree(child.childComponentId, components),
        );
      } else {
        tree.children.push({
          name: child.componentName,
          attributes: {},
          children: [],
        });
      }
    });
    return tree;
  }

  render(): JSX.Element {
    const {
      classes,
      components,
      focusComponent,
      deleteProp,
      addProp,
      focusChild,
    } = this.props;
    const { value } = this.state;

    // display count on the tab. user can see without clicking into tab
    const propCount = focusComponent.props.length;
    const htmlAttribCount = focusComponent.childrenArray.filter(
      child => child.childType === 'HTML',
    ).length;

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
            label='Application Tree'
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label='Code Preview'
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={`Component Props ${propCount ? `(${propCount})` : ''} `}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={`HTML Element Attributes ${
              htmlAttribCount ? `(${htmlAttribCount})` : ''
            } `}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label='Add Child Props'
          />
        </Tabs>

        {value === 0 && (
          <div
            id='treeWrapper'
            style={{
              width: '100%',
              height: '100%',
            }}
            ref={node => (this.treeWrapper = node)}
          >
            <Tree
              data={[this.generateComponentTree(focusComponent.id, components)]}
              separation={{ siblings: 0.3, nonSiblings: 0.3 }}
              transitionDuration={0}
              translate={this.state.translate}
              onClick={this.handleClick}
              styles={{
                nodes: {
                  node: {
                    name: {
                      fill: '#D3D3D3',
                      stroke: '#D3D3D3',
                      strokeWidth: 1,
                    },
                  },
                  leafNode: {
                    name: {
                      fill: '#D3D3D3',
                      stroke: '#D3D3D3',
                      strokeWidth: 1,
                    },
                  },
                },
              }}
            />
          </div>
        )}
        {value === 1 && (
          <CodePreview
            focusComponent={focusComponent}
            components={components}
          />
        )}
        {value === 2 && <Props />}
        {value === 3 && focusChild.childType === 'HTML' && <HtmlAttr />}
        {value === 3 && focusChild.childType !== 'HTML' && (
          <p>Please select an HTML element to view attributes</p>
        )}
        {value === 4 && <AddChildProps />}
      </div>
    );
  }
}

export default withStyles(styles)(BottomTabs);
