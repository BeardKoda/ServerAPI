import React from 'react';
import './form.css';
import {  Modal, Button, Row, Col } from 'react-bootstrap'

const ModalView = (props)=> {
	const { show, setShow, data, Proceed, resetForm, formData } = props;
  
  const handleClose = () =>{
    resetForm()
    setShow(false)
  };
	// const handleShow = () => setShow(true);
	const handleProceed = () => {
		// Proceed(data.txId);
	}

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">View Transaction Details.</h4>
          <div className={"p-5"}>
            {Object.keys(data).map((obj, i) => {
              return (
                <Row className={"mb-2 over"} key={i}>
                  <Col xs={4} md={4}>
                    {obj}
                  </Col>
                  <Col xs={8} md={8}>
                    {JSON.stringify(data[obj])}
                  </Col>
                </Row>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalView;