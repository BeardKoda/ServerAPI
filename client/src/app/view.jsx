import React, { useEffect } from 'react';
import {  Modal, Button, Row, Col } from 'react-bootstrap'

const ModalView = (props)=> {
	const { show, setShow, data, Proceed } = props;
  // const [show, setShow] = useState(false);
	useEffect(()=>{
		const myObj = { a: 1, b: 2 };

    for (let [key, value] of Object.entries(myObj)) {
      console.log(`key=${key} value=${value}`);
    }
	}, [])
  const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
	const handleProceed = () => {
		Proceed(data.txId);
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
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">Verify Payment Details.</h4>
          <div className={"p-5"}>
            {Object.keys(data).map((obj, i) => {
              return (
                <Row className={"mb-2"} key={i}>
                  <Col xs={4} md={4}>
                    {JSON.stringify(obj)}
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
          <Button variant="primary" onClick={handleProceed}>
            Proceed to Payment
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const RowView =()=>{

}
export default ModalView;