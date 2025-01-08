/* eslint-disable max-len */
import React, { Fragment } from 'react';
import Modal from '@mui/material/Modal';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const styles = (theme: any): any => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    maxWidth: '500px',
    height: 'auto',
    maxHeight: '500px',
    backgroundColor: '#31343A',
    color: 'white',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: '4%',
    minWidth: '500px',
    minHeight: '300px',
  },
  button: {
    marginTop: '0%',
    height: 'auto',
    marginLeft: '3%',
    borderRadius: '4px',
    float: 'right',
  },
});

/**
 * `SimpleModal` is a customizable modal dialog component styled with Material-UI.
 * It provides a flexible modal that can be used for messages, forms, or any custom content.
 *
 * @param {Object} props - The properties passed to the modal component.
 * @param {boolean} props.open - Controls the visibility of the modal.
 * @param {string} props.message - The primary text or content to be displayed in the modal's title area.
 * @param {React.ReactNode} props.children - The content to be displayed in the body of the modal.
 * @param {string} [props.primBtnLabel] - The label for the primary action button (optional).
 * @param {string} [props.secBtnLabel] - The label for the secondary action button (optional).
 * @param {Function} [props.primBtnAction] - The function to call when the primary button is clicked (optional).
 * @param {Function} [props.secBtnAction] - The function to call when the secondary button is clicked (optional).
 * @param {Function} props.closeModal - The function to call to close the modal.
 * @param {Object} props.classes - The styling classes applied to various parts of the modal, provided by `withStyles`.
 *
 * @returns {JSX.Element} The `SimpleModal` component encapsulated in a React Fragment.
 */
const SimpleModal = (props): JSX.Element => {
  const {
    classes,
    open,
    message,
    primBtnLabel,
    secBtnLabel,
    primBtnAction,
    secBtnAction,
    closeModal,
    children = null,
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
            transform: 'translate(-50%, -50%)',
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
              fontWeight: 'bold',
            }}
            size="large"
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
