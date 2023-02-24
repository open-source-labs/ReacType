import React, { useContext } from 'react';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import StateContext from '../../context/context';
import { Component } from '../../interfaces/Interfaces';
import DeleteButton from './Annotation';

function IndirectChild({
  style,
  children,
  placeHolder,
  linkId,
  childId,
  name,
  annotations
}) {
  const [state, dispatch] = useContext(StateContext);
  let combinedStyle = combineStyles(globalDefaultStyle, style);
  // when a user clicks a link, the focus should change to that component
  function onClickHandlerRoute(event) {
    event.stopPropagation();
    // LEGACY PD CHANGED CHILDID from NULL TO CHILDID
    dispatch({
      type: 'CHANGE FOCUS',
      payload: { componentId: linkId, childId: null }
    });
  }
  let linkName: string;
  // if there's a link in this component, then include a link
  if (linkId) {
    linkName = state.components.find(
      (comp: Component) => comp.id === linkId
    ).name;
    combinedStyle = combineStyles(combinedStyle, { color: 'blue' });
  }

  return (
    <div style={combinedStyle}>
      {`  ( ${childId} )`}
      <DeleteButton id={childId} name={name} annotations={annotations} />
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
