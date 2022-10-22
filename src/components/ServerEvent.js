import React from 'react';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ServerEvent.css';
const ServerEvent = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

return (
    <div className='mb-2'>
        <Button className="ServerEventButton" variant="primary" onClick={handleShow}>{props.ICStep}: {props.EventName}</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.EventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.EventDescription}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default ServerEvent;