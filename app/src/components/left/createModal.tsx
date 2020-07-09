import React from 'react';
import SimpleModal from './SimpleModal';

type Props = {
  closeModal: any;
  primBtnAction: any;
  secBtnAction: any;
  open: boolean;
  children: any;
  message: string;
  primBtnLabel: any;
  secBtnLabel: any;
};

const createModal = ({
  message,
  closeModal,
  primBtnLabel,
  primBtnAction,
  secBtnAction = null,
  secBtnLabel = null,
  children = null,
  open = true,
}: Props) => (
  <SimpleModal
    open={open}
    message={message}
    secBtnLabel={secBtnLabel}
    primBtnLabel={primBtnLabel}
    secBtnAction={secBtnAction}
    primBtnAction={primBtnAction}
    closeModal={closeModal}
  >
    {children}
  </SimpleModal>
);

export default createModal;
