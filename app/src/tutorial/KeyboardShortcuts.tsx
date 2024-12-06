import React from 'react';

/**
 * KeyboardShortcuts component displays tutorial for the keyboard shortcuts for Mac and Windows.
 *
 * @param {object} props - Component props.
 * @param {object} props.classes - CSS classes for styling.
 * @param {Function} props.setPage - Function to set the current page.
 * @returns {JSX.Element} KeyboardShortcuts component JSX.
 */
const KeyboardShortcuts: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }): JSX.Element => (
  <div className={classes.wrapper}>
    <h1 className={classes.title}>Keyboard Shortcuts</h1>
    <hr />
    <h2 className={classes.text}>Mac</h2>
    <ul className={classes.text}>
      <li>Export Project: Command + e</li>
      <li>Undo: Command + z</li>
      <li>Redo: Command + Shift + z</li>
      <li>Save Project As: Command + s</li>
      <li>Save Project: Command + shift + s</li>
      <li>Delete HTML Tag on Canvas: Backspace</li>
      <li>Delete Project: Command + Backspace</li>
      <li>Open Project: Command + o</li>
    </ul>
    <h2 className={classes.text}>Windows</h2>
    <ul className={classes.text}>
      <li>Export Project: Control + e</li>
      <li>Undo: Control + z</li>
      <li>Redo: Control + Shift + z</li>
      <li>Save Project As: Control + s</li>
      <li>Save Project: Control + shift + s</li>
      <li>Delete HTML Tag on Canvas: Backspace</li>
      <li>Delete Project: Control + Backspace</li>
      <li>Open Project: Control + o</li>
    </ul>
    <hr />
  </div>
);

export default KeyboardShortcuts;
