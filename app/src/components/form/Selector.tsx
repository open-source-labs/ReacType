/* eslint-disable max-len */
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  items: [];
  classes: {
    configRow: any;
    configType: any;
    lightThemeFontColor: { color: string };
    formControl: any;
    select: any;
    selectInput: any;
    darkThemeFontColor: { color: string };
  };
  isThemeLight: boolean;
  title: string;
  selectValue: any;
  handleChange: any;
  name: string;
};

/**
 * Renders a form selector with a dynamically populated Select component from MUI. The selector allows
 * the user to choose from a list of options provided via `items` prop. The appearance and behavior of the
 * component can be customized with several styling options based on the current theme (light or dark).
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.items - An array of objects each containing the `value` and `text` for each menu item.
 * @param {Object} props.classes - An object containing various styling classes:
 *                                 `configRow` for the layout of the selector,
 *                                 `configType` for the type label,
 *                                 `lightThemeFontColor` and `darkThemeFontColor` for theme-based text coloring,
 *                                 `formControl` for the control's style,
 *                                 `select` for the base style of the Select component,
 *                                 `selectInput` for the input part of the Select component.
 * @param {boolean} props.isThemeLight - Indicates if the light theme is currently active.
 * @param {string} props.title - The title for the selector, displayed above the Select component.
 * @param {any} props.selectValue - The currently selected value.
 * @param {Function} props.handleChange - The function to call when the selected value changes.
 * @param {string} props.name - The name attribute for the Select component; used in form handling.
 * @returns {JSX.Element} The rendered component with configured Select and theming.
 */
const FormSelector = (props): JSX.Element => {
  const items = [];
  let key = 1;
  props.items.forEach((el) => {
    items.push(
      <MenuItem style={{ color: 'white' }} value={el.value} key={`menu${key}`}>
        {el.text}
      </MenuItem>,
    );
    key++;
  });
  return (
    <div className={props.classes.configRow}>
      <div
        className={
          props.isThemeLight
            ? `${props.classes.configType} ${props.classes.lightThemeFontColor}`
            : `${props.classes.configType} ${props.classes.darkThemeFontColor}`
        }
      >
        <h3>{props.title}</h3>
      </div>
      <div className={props.classes.configValue}>
        <FormControl variant="filled" className={props.classes.formControl}>
          <Select
            style={props.isThemeLight ? { border: '1px solid #0671e3' } : null}
            value={props.selectValue}
            name={props.name}
            onChange={props.handleChange}
            displayEmpty
            className={props.classes.select}
            inputProps={{
              className: props.isThemeLight
                ? `${props.classes.selectInput} ${props.classes.lightThemeFontColor}`
                : `${props.classes.selectInput} ${props.classes.darkThemeFontColor}`,
            }}
            MenuProps={{ disablePortal: true }}
          >
            {items}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FormSelector;
