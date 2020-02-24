import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  application: state.application
});

const mapDispatchToProps = (dispatch) => ({
  addComponent: (title: string) => dispatch(actions.addComponent(title)),
  updateComponent: (id: number, title: string) => dispatch(actions.updateComponent(id, title)),
  deleteComponent: (id: number) => dispatch(actions.deleteComponent(id)),
  togglePanel: (id: number) => dispatch(actions.togglePanel(id)),
});

class Test extends Component {
  render() {
    console.log(this.props.application)
    return (
      <div>
        <button onClick={() => {
          this.props.addComponent('App');
        }}>Component</button>
        <button onClick={() => {
          this.props.addComponent('Component2');
        }}>Component2</button>
        <button onClick={() => {
          this.props.addComponent('Steve');
        }}>Component3</button>
        <button onClick={() => {
          this.props.updateComponent(1, { title: 'Main App' });
        }}>Update1</button>
        <button onClick={() => {
          this.props.deleteComponent(2);
        }}>DeleteComponent2</button>
        <button onClick={() => {
          this.props.togglePanel(1);
        }}>Toggle</button>
      </div>
    )
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(Test);
