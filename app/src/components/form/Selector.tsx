
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FormSelector = (props): JSX.Element => {
  const items = [];
  let key = 1;
  props.items.forEach(el => {
    items.push(<MenuItem style={{ color: 'black' }} value={el.value} key={`menu${key}`} >{el.text}</MenuItem>);
    key++
  })
  return (
    <div className={props.classes.configRow}>
      <div className={props.isThemeLight ? `${props.classes.configType} ${props.classes.lightThemeFontColor}` : `${props.classes.configType} ${props.classes.darkThemeFontColor}`}>
        <h3>{props.title}</h3>
      </div>
      <div className={props.classes.configValue}>
        <FormControl variant="filled" className={props.classes.formControl}>
          <Select
            style={props.isThemeLight ? { border: '1px solid #0099e6' } : null }
            value={props.selectValue}
            name={props.name}
            onChange={props.handleChange}
            displayEmpty
            className={props.classes.select}
            inputProps={{ className: props.isThemeLight ? `${props.classes.selectInput} ${props.classes.lightThemeFontColor}` : `${props.classes.selectInput} ${props.classes.darkThemeFontColor}` }}
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
