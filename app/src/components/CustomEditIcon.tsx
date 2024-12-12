import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  editIconContainer: {
    position: 'absolute',
    right: '30%',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
      color: '#f88e16'
    },
    fontSize: '6px'
  }
});

const CustomEditIcon = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.editIconContainer}>
        <EditIcon fontSize="small" />
      </div>
    </div>
  );
};

export default CustomEditIcon;
