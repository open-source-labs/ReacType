import React from 'react';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import MUIDragDropPanel from './MUIDragDropPanel';

/**
 * A functional component that renders the MUIDragDropPanel within a simple container.
 * The ProfilePage currently acts as a wrapper for the MUIDragDropPanel.
 *
 * @returns {JSX.Element}
 * @example
 * return (
 *   <ProfilePage />
 * )
 */
const ProfilePage = (): JSX.Element => {
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
