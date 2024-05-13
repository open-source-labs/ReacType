import React from 'react';
import SimpleModal from './SimpleModal';

type Props = {
  open: boolean;
  message: string;
  primBtnLabel: any;
  secBtnLabel: any;
  primBtnAction: any;
  secBtnAction: any;
  children: any;
  closeModal: any;
};

/**
 * Creates a customizable modal dialog using the `SimpleModal` component.
 *
 * @param {Object} props - The properties for configuring the modal.
 * @param {boolean} [props.open=true] - Determines if the modal is open.
 * @param {string} props.message - The message or content displayed in the modal.
 * @param {any} props.primBtnLabel - Label for the primary button.
 * @param {any} [props.secBtnLabel=null] - Label for the secondary button (optional).
 * @param {any} props.primBtnAction - Handler for the primary button click event.
 * @param {any} [props.secBtnAction=null] - Handler for the secondary button click event (optional).
 * @param {any} [props.children=null] - Child components or elements to be displayed within the modal.
 * @param {Function} props.closeModal - Function to call when closing the modal.
 *
 * @returns {JSX.Element} A `SimpleModal` component configured with the specified properties.
 */
const createModal = ({
  open = true,
  message,
  primBtnLabel,
  secBtnLabel = null,
  primBtnAction,
  secBtnAction = null,
  children = null,
  closeModal
}: Props): JSX.Element => (
  <SimpleModal
    open={open}
    message={message}
    primBtnLabel={primBtnLabel}
    secBtnLabel={secBtnLabel}
    primBtnAction={primBtnAction}
    secBtnAction={secBtnAction}
    closeModal={closeModal}
  >
    {children}
  </SimpleModal>
);

export default createModal;
