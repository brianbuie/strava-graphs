import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Button from './Button';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: ${({ theme }) => theme.bkg};
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  h2,
  h3,
  p {
    margin: 0 0 1em 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-bottom: 1rem;
  h2 {
    flex-grow: 1;
    margin: 0;
  }
`;

const ModalBody = styled.div`
  background: ${({ theme }) => theme.foreground};
  padding: 1rem;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
`;

const DisableScroll = createGlobalStyle`
  html {
    overflow: hidden;
  }
`;

const Modal = ({ children, title, onClose, onOpen, Launcher, overlayDismiss }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    if (onOpen) onOpen();
  };

  const closeModal = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {Launcher(openModal)}
      {open && <DisableScroll />}
      <Overlay open={open} onClick={overlayDismiss && closeModal}>
        <ModalBody onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <h2>{title}</h2>
            <Button label="&times;" onClick={closeModal} theme="link" color="text" size="large" />
          </ModalHeader>
          {children(closeModal)}
        </ModalBody>
      </Overlay>
    </>
  );
};

export default Modal;
