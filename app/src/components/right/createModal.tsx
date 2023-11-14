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

const createModal = ({
  open = true,
  message,
  primBtnLabel,
  secBtnLabel = null,
  primBtnAction,
  secBtnAction = null,
  children = null,
  closeModal
}: Props) => (
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
