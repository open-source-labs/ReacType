import React, { useContext } from 'react';
import ContextTab from './ContextTab';
import ContextTree from './Display/ContextTree';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  contextContainer: {
    backgroundColor: 'white',
    // display: 'grid',
    // gridTemplateColumns: '100%',
    height: '100%'
  }

  // leftContext: {
  //   display: 'flex',
  //   // flexDirection: 'column',
  //   border: '1px solid blue'
  // }

  // childContext: {
  //   flex: '1',
  //   border: '1px solid blue'
  // }
});
const ContextManager = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.contextContainer}>
        <ContextTab />
      </div>
    </React.Fragment>
  );
};

export default ContextManager;
