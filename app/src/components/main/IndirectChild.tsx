/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import { Component } from '../../interfaces/Interfaces';
import DeleteButton from './DeleteButton';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';

/**
 * A component representing an indirect child element that may contain a navigation link to another component.
 * It can display either a placeholder or a direct link to another component based on its configuration.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.style - Custom styles applied to the component instance.
 * @param {React.ReactNode} props.children - Nested child components or elements.
 * @param {string} props.placeHolder - Placeholder text displayed when no link is active.
 * @param {number} props.linkId - Identifier for the linked component if available.
 * @param {number} props.childId - Unique identifier for the child component instance.
 * @param {string} props.name - Display name of the component, used for identification within the UI.
 * @returns {JSX.Element} A styled component that optionally acts as a navigation link to another component.
 */
function IndirectChild({
  style,
  children,
  placeHolder,
  linkId,
  childId,
  name,
}) {
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();
  let combinedStyle = combineStyles(globalDefaultStyle, style);
  // when a user clicks a link, the focus should change to that component
  function onClickHandlerRoute(event) {
    event.stopPropagation();
    dispatch(changeFocus({ componentId: linkId, childId: null }));
  }
  let linkName: string;
  // if there's a link in this component, then include a link
  if (linkId) {
    linkName = state.components.find(
      (comp: Component) => comp.id === linkId,
    ).name;
    combinedStyle = combineStyles(combinedStyle, { color: 'blue' });
  }

  return (
    <div style={combinedStyle}>
      {`  ( ${childId} )`}
      <span>
        <DeleteButton
          id={childId}
          name={name}
          onClickHandler={onClickHandlerRoute}
        />
      </span>
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
