/* eslint-disable max-len */
import React from 'react';
import ComponentPanel from '../right/ComponentPanel';
import HTMLPanel from '../left/HTMLPanel';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

/**
 * A container component that organizes the user interface elements for creating various aspects of the application.
 * It includes the ComponentPanel and HTMLPanel, each responsible for different parts of the application's creation process.
 * The appearance of these panels is controlled by the Redux store's style state, allowing for dynamic styling.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isThemeLight - Indicates if the light theme is active, used to adjust the styling of child components.
 *
 * Redux State Dependencies:
 * - `styleSlice`: The style settings from the Redux store which determine the CSS styles applied to the creation panel.
 *
 * @returns {JSX.Element} A React element that renders the creation panel containing the component and HTML panels,
 *                        configured according to the theme specified in the props.
 */
const CreationPanel = (props): JSX.Element => {
  const style = useSelector((store: RootState) => store.styleSlice);
  return (
    <div className="creation-panel" style={style.style}>
      <ComponentPanel isThemeLight={props.isThemeLight} />
      <HTMLPanel isThemeLight={props.isThemeLight} />
    </div>
  );
};

export default CreationPanel;
