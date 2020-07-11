import React, { useContext } from 'react';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import { stateContext } from '../../context/context';
import { Component } from '../../interfaces/InterfacesNew';

function IndirectChild({ style, children, placeHolder, linkId }) {
  const [state, dispatch] = useContext(stateContext);
  let combinedStyle = combineStyles(globalDefaultStyle, style);

  // when a user clicks a link, the focus should change to that component
  function onClickHandlerRoute(event) {
    event.stopPropagation();
    dispatch({
      type: 'CHANGE FOCUS',
      payload: { componentId: linkId, childId: null }
    });
  }

  let linkName: string;
  // if there's a link in this component, then include a link
  if (linkId) {
    linkName = state.components.find((comp: Component) => comp.id === linkId)
      .name;
    combinedStyle = combineStyles(combinedStyle, { color: 'blue' });
  }

  //console.log('children are ', children);
  //console.log('place holder is ', placeHolder);
  return (
    <div style={combinedStyle}>
      {linkId ? (
        <div onClick={onClickHandlerRoute}>{linkName}</div>
      ) : (
        placeHolder
      )}
      {children}
    </div>
  );
}

export default IndirectChild;
