import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Theme } from '@material-ui/core/styles';
import HtmlAttr from '../components/bottom/HtmlAttr';
import { PropsInt, ApplicationStateInt } from '../interfaces/Interfaces';
import Button from '@material-ui/core/Button';
import { Link as RouteLink, withRouter } from 'react-router-dom';

// const mapDispatchToProps = (dispatch: any) => ({
//   addProp: (prop: PropInt) => dispatch(addProp(prop)),
//   deleteProp: (id: number) => dispatch(deleteProp(id)),
//   toggleNative: () => dispatch(toggleNative()),
//   toggleCodeEdit: () => dispatch(toggleCodeEdit())
// });

const mapStateToProps = (store: { workspace: ApplicationStateInt }) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components,
  native: store.workspace.native,
  currentWorkspace: store.workspace
});

interface BottomTabsPropsInt extends PropsInt {
  deleteProp(id: number): void;
  addProp(arg: { key: string; type: string }): void;
  classes: any;
  changeFocusComponent(arg: { title: string }): void;
  updateCode(arg: { componentId: number; code: string }): void;
  toggleNative(): void;
  native: boolean;
  toggleCodeEdit(): void;
  codeReadOnly: boolean;
}

class RightContainer extends Component<BottomTabsPropsInt> {
  constructor(props: BottomTabsPropsInt) {
    super(props);
  }

  saveProject(project: ApplicationStateInt) {
    console.log('Saving project to DB...');
    const body = JSON.stringify(project);
    fetch('https://localhost:8080/saveProject', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body
    })
      .then(res => res.json())
      .then(data => console.log('Saved project is', data))
      .catch(err => console.log(err));
  }

  getProjects() {
    console.log("Loading user's projects...");
    fetch('https://localhost:8080/getProjects', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => console.log("User's projects are", data))
      .catch(err => console.log(err));
  }

  render(): JSX.Element {
    const { classes, components, focusComponent, focusChild } = this.props;
    // looks through the children of currently focused component (based on left bar) and finds the number of child html elements it has
    const htmlAttribCount = focusComponent.childrenArray.filter(
      child => child.childType === 'HTML'
    ).length;

    return (
      <div
        className="column right"
        style={{
          minWidth: '400px',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* <h3>This is the right column everyone!</h3> */}
        <RouteLink to={`/`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ alignSelf: 'bottom' }}
          >
            Sign Out
          </Button>
        </RouteLink>
        <h4>
          {/* mimic the bottom tab label that shows how many html elements there are */}
          HTML Element Attributes{' '}
          {htmlAttribCount ? `(${htmlAttribCount})` : ''}
        </h4>
        {/* conditional rendering based on which component/element is currently focused */}
        {focusChild.childType === 'HTML' && <HtmlAttr />}
        {focusChild.childType !== 'HTML' && (
          <p>Please select an HTML element to view attributes</p>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            this.saveProject(this.props.currentWorkspace);
          }}
        >
          Save Current Project
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.getProjects}
        >
          Get My Projects
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RightContainer));
