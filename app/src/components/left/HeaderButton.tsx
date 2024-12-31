import React from 'react';
import PropTypes from 'prop-types';
import Popover, { PopoverProps } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';

const HeaderButton = (props) => {
  const [anchorEl, setAnchorEl] =
    React.useState<PopoverProps['anchorEl']>(null);
  const classes = useStyles();
  const handleClickPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? open : undefined;

  return (
    <div className={classes.headerButton}>
      <Button
        component="label"
        aria-label={id}
        id={id}
        onClick={handleClickPopover}
        key={props.headerName}
      >
        {props.headerName}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <div className={classes.popover}>
            <div className={classes.popoverIcon}>
              <HelpIcon id={id} size="small" />
            </div>
            <div>{props.infoText}</div>
          </div>
        </Popover>
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  headerButton: {
    alignSelf: 'center'
  },
  popover: {
    backgroundColor: '#ffdbbb',
    display: 'flex',
    color: 'black',
    fontSize: '0.8rem',
    padding: '8px',
    width: '300px'
  },
  popoverIcon: {
    paddingRight: '10px',
    paddingLeft: '8px',
    paddingTop: '10px'
  }
});
export default HeaderButton;
