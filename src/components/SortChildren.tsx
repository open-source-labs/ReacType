'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateChildrenSort } from '../actions/components.ts';
import cloneDeep from '../utils/cloneDeep.ts';

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent
});

const mapDispatchToProps = dispatch => ({
  updateChildrenSort: ({ newSortValues }) =>
    dispatch(updateChildrenSort({ newSortValues }))
});

class SortChildren extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draggedIndex: null,
      draggedOverIndex: null
    };
  } // end constrcutor

  setLocalArray = () => {
    const localArray = this.props.focusComponent.childrenArray.map(
      (child, idx) => ({
        childId: child.childId,
        childSort: child.childSort
      })
    );
    return localArray;
  };

  onDragStart = (e, idx) => {
    this.setState({ draggedIndex: idx });

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = idx => {
    this.setState({ draggedOverIndex: idx });
  };

  onDragEnd(e) {
    console.log(`dragEnd this
      state.draggedIndex: ${this.state.draggedIndex}
      this.state.draggedOverIndex: ${this.state.draggedOverIndex}`);
    if (
      this.state.draggedIndex === this.state.draggedOverIndex
      // ||  !this.state.draggedIndex || this.state.draggedOverIndex
    ) {
      return;
    }

    let currentSortValues = this.setLocalArray();

    // remove the dragged Item and save it, we will use add it back in a moment.
    const draggedBaby = currentSortValues[this.state.draggedIndex];
    currentSortValues.splice(this.state.draggedIndex, 1);

    // put back the dragge item after the dragged Over
    currentSortValues.splice(this.state.draggedOverIndex, 0, draggedBaby);

    currentSortValues = currentSortValues.map((child, idx) => ({
      childId: child.childId,
      childSort: idx + 1
    }));

    console.log(
      'currentSortValues after updating the sort  ',
      JSON.stringify(currentSortValues)
    );

    this.props.updateChildrenSort({ newSortValues: currentSortValues });

    this.setState({ draggedIndex: 0, draggedOverIndex: 0 });
  }

  render() {
    const ulStyle = {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    };

    const liStyle = {
      backgroundColor: '#383838',
      padding: '10px 20px',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      lineHeight: 1,
      cursor: 'move'
    };
    // const children = this.props.focusComponent.childrenArray;
    // const List = children
    const List = cloneDeep(this.props.focusComponent.childrenArray)
      .sort((a, b) => a.childSort - b.childSort)
      .map((child, idx) => (
        <li style={liStyle} id={child.childId} key={idx}>
          <div
            className='drag'
            draggable
            onDragStart={e => this.onDragStart(e, idx)}
            onDragOver={e => this.onDragOver(idx)}
            onDragEnd={e => this.onDragEnd()}
          >
            {child.componentName + child.childId}
          </div>
        </li>
      ));
    return (
      <div
        style={{
          minWidth: '200px',
          position: 'relative',
          float: 'left',
          marginTop: '20px',
          marginRIght: '20px'
        }}
      >
        <h3>Childrens List</h3>
        <ul style={ulStyle}>
          {cloneDeep(this.props.focusComponent.childrenArray)
            .sort((a, b) => a.childSort - b.childSort)
            .map((child, idx) => (
              <li style={liStyle} id={child.childId} key={idx}>
                <div
                  className='drag'
                  draggable
                  onDragStart={e => this.onDragStart(e, idx)}
                  onDragOver={e => this.onDragOver(idx)}
                  onDragEnd={e => this.onDragEnd()}
                >
                  {child.componentName + child.childId}
                </div>
              </li>
            ))}

          {/* {List} */}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortChildren);
