import React from 'react';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ServerEvent.css';
const ServerEvent = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const ServerEventTypes= {
        "Passive Alert":"In a typical security sheaf, the third or fourth trigger step activates a passive alert. Passive alert means that a system suspects an intruder has invaded it, but is not 100 percent certain. Under passive-alert status, trigger steps typically activate proactive white or gray IC programs. When a system goes on passive alert status, increase all Subsystem Ratings by 2.",
        "Active Alert":"A typical system goes on active-alert status on the second or third trigger step after the system goes to passive alert. Active alert means the system has verified the presence of anillegal icon. Under active-alert status, trigger steps typically activate proactive and sometimes black IC programs. Trigger steps mayalso activate corporate or law-enforcement deckers in the system. Once a system reaches active-alert status, running away and sneaking back into the system become much more difficult for illegal deckers. Security personnel know that someone has been snooping around, and the system managers remain particularly vigilant for some time to come.",
        "Shutdown":""
    }
return (
    <div className='mb-2'>
        <Button className="ServerEventButton" variant="primary" onClick={handleShow}>{props.ICStep}: {props.EventName}</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.EventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ServerEventTypes[props.EventDescription]}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default ServerEvent;