import React from 'react';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../globalDefaultStyles';

function IndirectChild({ style, children, placeHolder }) {
  const combinedStyle = combineStyles(globalDefaultStyle, style);
  return (
    <div style={combinedStyle}>
      {placeHolder}
      {children}
    </div>
  );
}

export default IndirectChild;
