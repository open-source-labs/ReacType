
import React, { Component} from "react";
import { connect } from "react-redux";

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent,
});


class SortChildren extends Component {
  // constructor(props) {
  //   super(props);
   state = {test: 'myTestValue'};
  //}

  
render() {
  const children = this.props.focusComponent.childrenArray; 
  const List = children.map( (child,idx) => {
    console.log(`mappping...... ${idx}   ${child.componentName + child.childId}`)
      return (
        <li 
          Childid={child.Childid}
          key={idx}
          draggable='true'
          // onDragEnd={this.dragEnd.bind(this)}
          // onDragStart={this.dragStart.bind(this)}>{item}
        >
        {child.componentName + child.childId}
        </li>
    )})
    console.log('children')
        console.log(children)
        console.log('List')
        console.log(List)
  return (
    <div>
      <p>Childrens List</p>
      {/* <List/> */}
    </div>
  )
 
}

} 

export default connect(
  mapStateToProps
)(SortChildren);