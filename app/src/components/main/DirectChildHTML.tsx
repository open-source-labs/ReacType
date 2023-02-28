import React, { useContext } from 'react';
import { ChildElement, HTMLType } from '../../interfaces/Interfaces';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import DeleteButton from './DeleteButton';

import { styleContext } from '../../containers/AppContainer';

function DirectChildHTML({ childId, name, type, typeId, style }: ChildElement) {
  const [state, dispatch] = useContext(StateContext);
  const { isThemeLight } = useContext(styleContext);

  // find the HTML element corresponding with this instance of an HTML element
  // find the current component to render on the canvas
  const HTMLType: HTMLType = state.HTMLTypes.find(
    (type: HTMLType) => type.id === typeId
  );
  // hook that allows component to be draggable
  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocus(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #186BB4'
        : '1px solid grey'
  };

  // if (state.components[0].children)
  // console.log(globalDefaultStyle);

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(globalDefaultStyle, HTMLType.style), style),
    interactiveStyle
  );

  // state.components.forEach(component => {
  //   // console.log('state.components : ', state.components)
  //     let color = 'rgb(63, 154,';
  //     let counter = -10;
  //     component.children?.forEach(obj => {
  //     // if (obj['childId'] === childId) {
  //       counter += 10;
  //       color = color + counter.toString() + ')'
  //       combinedStyle['backgroundColor'] = color;
  //     // } else {
  //     //   combinedStyle['backgroundColor'] = isOver ? 'yellow' : globalDefaultStyle['backgroundColor'];
  //     // }
  //   })
  // });

  // console.log(name[0].toLowerCase() + name.slice(1))

  return (
    <div
      onClick={onClickHandler}
      style={combinedStyle}
      ref={drag}
      id={`canv${childId}`}
    >
      <span>
        <strong style={{ color: isThemeLight ? 'black' : 'white' }}>
          {HTMLType.placeHolderShort}
        </strong>
        <DeleteButton
          id={childId}
          name={name[0].toLowerCase() + name.slice(1)}
        />
      </span>
    </div>
  );
}

export default DirectChildHTML;
