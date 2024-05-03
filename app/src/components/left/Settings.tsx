import React from 'react';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import MUIDragDropPanel from './MUIDragDropPanel';

const ProfilePage = () => {
  const classes = useStyles();

  return (
    <div>
        <MUIDragDropPanel />
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
