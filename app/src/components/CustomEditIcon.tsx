import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  editIconContainer: {
    position: 'absolute',
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
      color: '#f88e16',
    },
  },
});

const CustomEditIcon = ({ handleClickEditModule }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.editIconContainer}>
        <EditIcon fontSize="small" onClick={handleClickEditModule}/>
      </div>
    </div>
  );
};

export default CustomEditIcon;
