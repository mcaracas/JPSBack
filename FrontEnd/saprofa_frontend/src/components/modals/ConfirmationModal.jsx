import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, titulo, mensaje, handleConfirmation }) => {
  return (
    <Modal show={show} onHide={() => handleConfirmation(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{mensaje}</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={() => handleConfirmation(false)}>Cancelar</Button>
        <Button variant="primary" onClick={() => handleConfirmation(true)}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;