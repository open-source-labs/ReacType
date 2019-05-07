import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    color: '#eee',
    backgroundColor: '#333333',
  },
  column: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  icon: {
    fontSize: '20px',
    color: '#eee',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green',
    },
  },
  cssFocused: {},
  input: {
    color: '#fff',
    opacity: '0.7',
    marginBottom: '10px',
  },
  light: {
    color: '#eee',
  },
  avatar: {
    color: '#eee',
    fontSize: '10px',
  },
});

class CodePreview extends Component {
  render(): JSX.Element {
    const { focusComponent, components } = this.props;
    return (
      <p>
        <pre>{componentRender(focusComponent, components)}</pre>
      </p>
    );
  }
}

export default CodePreview;
