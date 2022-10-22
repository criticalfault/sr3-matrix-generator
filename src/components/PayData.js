import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './PayData.css';

const PayData = (props) => {

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const exampleString = () =>{
    var items = [
                "A video clip of an executive/politician known for touting family values, having an affair.",
                "The secret formula for a chemical",
                "The secret formula for a drug.",
                "The secret formula for a spell.",
                "The secret formula for a material.",
                "The secret schematics for a cyberware.",
                "The secret schematics for a drone.",
                "The secret schematics for a gun.",
                "The secret formula for a program.",
                "The secret formula for a recipe.",
                "Accounting information that shows who is secretly being paid by who.",
                "Lists of members of an organization that may have enemies seeking to take out those members.",
                "Similarly to the above item, lists of benefactors to a cause that might have enemies.",
                "Locations of secret company warehouses, with valuable stock inside.",
                "Schematics on new about to or already hit the market drones/guns/comlinks/ware.",
                "Detailed security information or exploitable weaknesses to companies/organizations."
            ];
    return items[Math.floor(Math.random()*items.length)];
}

return (
    <div className='mb-2'>
        <Button className="PayDataButton" variant="primary" onClick={handleShow}>{props.size} {props.defense}</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.size} - {props.defense}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{exampleString()}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default PayData;