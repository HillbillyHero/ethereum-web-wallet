import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

function ImportAccountModal(props) {
  const { onClose, onConfirm } = props;
  const [privateKey, setPrivateKey] = useState('');
  return (
    <Modal
      centered
      size='lg'
      show={props.show}
      onClose={props.onClose}
      aria-labelledby='contained-modal-title-vcenter'
    >
      <Modal.Body>
        <Form>
          <Form.Group controlId=''>
            <Form.Label>Paste your private key string here:</Form.Label>
            <Form.Control
              type='text'
              // TODO: validate user input
              onChange={({ target }) => {
                setPrivateKey(target.value)
              }}
            />
            <Form.Text className='text-muted'>
              Remember to keep those private keys in your sock drawer 😉
            </Form.Text>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button
              onClick={onClose}
              variant='secondary'
              className='mr-3'
            >Cancel</Button>
            <Button
              variant='primary'
              onClick={() => onConfirm(privateKey)}
              disabled={privateKey.length < 64}
            >Import</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ImportAccountModal;
