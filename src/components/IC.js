import React from 'react';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './IC.css';
const IC = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

return (
    <div className='mb-2'>
        <Button className="ICButton" variant="primary" onClick={handleShow}>{props.ICStep}: {props.ICName}</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.ICName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.ICDescription}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default IC;