
import React, { Component} from "react";
import { connect } from "react-redux";
import { updateChildrenSort } from "../actions/components";

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent,
});

const mapDispatchToProps = dispatch => ({
  updateChildrenSort: ({ newChildrenArray }) => dispatch(updateChildrenSort({ newChildrenArray }))
});

class SortChildren extends Component {
  constructor(props) {
    super(props);

   this.state =  {
    localChildrenArray: this.setLocalArray()
    //localChildrenArray: this.props.focusComponent.childrenArray,
    //shortArray: this.setLocalArray()
  };
   
  }

  setLocalArray = () =>{
    const localArray = this.props.focusComponent.childrenArray.map((child,idx) => {
      return {Childid: child.childId, childSort: child.childSort}
    } )
    return localArray ; 
  }

  onDragStart = (e,idx) => {
    console.log('dragging index: ',idx)
    this.draggedIndex = idx;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  

  onDragOver = (draggedOverIndex) => {
    //const draggedOverIndex = idx;

    // if the item is dragged over itself, ignore
    if (this.draggedIndex === draggedOverIndex) {
      return;
    }

    //console.log(`OnDrageOver: draggedOverIndex: ${draggedOverIndex} this.draggedIndex:${this.draggedIndex}`)
    // filter out the currently dragged item
    let draggedChild = this.state.localChildrenArray[this.draggedIndex] ; 
    //console.log(`dragged item:`,draggedChild)

    let localChildrenArray = [...this.state.localChildrenArray]
    //console.log('localChildrenArray BEFORE removing ',JSON.stringify(localChildrenArray))


    localChildrenArray.splice(this.draggedIndex,1)
    //console.log('localChildrenArray after removing ',JSON.stringify(localChildrenArray))

    //add the dragged item after the dragged over item
    localChildrenArray.splice(draggedOverIndex, 0, draggedChild);
    //console.log('localChildrenArray final:  ',JSON.stringify(localChildrenArray))
    this.setState({localChildrenArray });

   this.props.updateChildrenSort({newChildrenArray: localChildrenArray});
 
  };

render() {
  const ulStyle =  {
    margin: 0,
    padding: 0,
    listStyle: "none",
  }

  const liStyle = {
    backgroundColor: "#383838",
    padding: "10px 20px",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    lineHeight: 1,
    cursor: "move",
  }
  const children = this.props.focusComponent.childrenArray; 
  const List = children
    .sort( (a,b) => a.childSort - b.childSort )
    .map( (child,idx) => {
    //console.log(`mappping...... ${idx}   ${child.componentName + child.childId} childSort ${child.childSort}`)
      return (
        <li 
          style={liStyle}
          id={child.Childid}
          key={idx}
        >
        <div className="drag" draggable  
          onDragStart={e => this.onDragStart(e,idx) }
          onDragOver ={e => this.onDragOver(idx)}
        >
         {child.componentName + child.childId}
        </div>
     
        </li>
    )})
    console.log('children')
        console.log(children)
        console.log('List')
        console.log(List)
  return (
    <div     style={{
      position: 'relative',
      float: 'right',
      marginTop: '20px',
      marginRIght: '20px',
    }}  >
      <h3>Childrens List</h3>
      <ul style={ulStyle}>
       {List}
      </ul> 
    </div>
  )
 
}

} 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortChildren);