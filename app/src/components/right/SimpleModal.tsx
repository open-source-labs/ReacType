import React, { Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: any): any => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    maxWidth: '500px',
    height: 'auto',
    maxHeight: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '4%',
    minWidth: '500px',
    minHeight: '300px'
  },
  button: {
    marginTop: '0%',
    height: 'auto',
    marginLeft: '3%',
    borderRadius: '4px',
    float: 'right'
  }
});

const SimpleModal = (props: any) => {
  const {
    classes,
    open,
    message,
    primBtnLabel,
    secBtnLabel,
    primBtnAction,
    secBtnAction,
    closeModal,
    children = null
  } = props;

  return (
    <Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={closeModal}
      >
        <div
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          className={classes.paper}
        >
          <IconButton
            aria-label="Close"
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '2%',
              right: '1%',
              fontSize: '17px',
              fontWeight: 'bold'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="modal-title">
            {message}
          </Typography>
          <div>{children}</div>
          <div>
            {secBtnLabel ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={secBtnAction}
              >
                {secBtnLabel}
              </Button>
            ) : null}
            {primBtnLabel ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={primBtnAction}
              >
                {primBtnLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default withStyles(styles)(SimpleModal);
