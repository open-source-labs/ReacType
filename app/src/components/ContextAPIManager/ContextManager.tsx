import React, { useContext } from 'react';
import ContextTab from './ContextTab';
import ContextTree from './ContextTree';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  contextContainer: {
    backgroundColor: 'white',
    display: 'grid',
    border: '1px solid red',
    gridTemplateColumns: '25% 75%',
    height: '100%'
  },

  leftContext: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid blue'
  },

  childContext: {
    flex: '1',
    border: '1px solid blue'
  }
});
const ContextManager = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.contextContainer}>
        <div className={classes.leftContext}>
          <div className={classes.childContext}>
            <ContextTab />
          </div>
        </div>
        <div className="rightContext">
          <ContextTree />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContextManager;
