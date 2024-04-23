import React from 'react';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.panelWrapper}>
        <div className={classes.panelWrapperList}>
          <h4 className={classes.darkThemeFontColor}>Settings</h4>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  panelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflow: 'auto'
  },
  panelWrapperList: {
    minHeight: '120px'
  },
  lightThemeFontColor: {
    color: '#fff'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default ProfilePage;
