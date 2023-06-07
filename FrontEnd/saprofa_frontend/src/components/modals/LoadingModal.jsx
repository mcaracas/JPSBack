import React from 'react';
import { Modal } from 'react-bootstrap';
import './ModalStyles.scss'

const LoadingModal = ({ show, titulo, mensaje }) => {
  return (
    <Modal show={show} className='small-modal' centered>
      <Modal.Header>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">{mensaje}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default LoadingModal;