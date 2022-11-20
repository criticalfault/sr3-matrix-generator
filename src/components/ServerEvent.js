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
    "Passive Alert":`In a typical security sheaf, the third or fourth trigger
step activates a passive alert. 

Passive alert means that a system suspects an intruder 
has invaded it, but is not 100 percent certain. Under
passive-alert status, trigger steps typically activate
proactive white or gray IC programs. 
        
When a system goes on passive alert status, 
increase all Subsystem Ratings by 2.`,

    "Active Alert":`A typical system goes on active-alert status on the
second or third trigger step after the system goes to 
passive alert. 

Active alert means the system has verified the presence
of an illegal icon. Under active-alert status, trigger steps
typically activate proactive and sometimes black IC programs.
Trigger steps may also activate corporate or law-enforcement 
deckers in the system. Once a system reaches active-alert 
status, running away and sneaking back into the system 
become much more difficult for illegal deckers. 

Security personnel know that someone has been snooping 
around, and the system managers remain particularly 
vigilant for some time to come.`,


    "Shutdown":`A host triggers a shutdown procedure when an intruder
reaches a predetermined security tally threshold. When the
shutdown threshold of a host is reached, the gamemaster rolls 
a number of dice equal to the host's Security Value ÷ 2
(round up) and adds the results. The total indicates the number
of Combat Turns the host's shutdown sequence will last.

The gamemaster should also roll 1D6 ÷ 2. The result of this
roll indicates the “final warning” turn—the number of turns 
that remain in the sequence when the host warns all users in 
the system that a shutdown is imminent. For example, on a 
result of 2, the final warning is sounded when 2 turns remain
in the shutdown sequence.

Once the shutdown sequence begins, make a secret
Sensor Test for each user in the system. Make these tests at 
the end of each Combat Turn against a target number equal to 
the number of Combat Turns remaining in the shutdown 
sequence.

Continue the tests for each user until a test succeeds. At that
point, that user becomes aware that the host is in shutdown
mode but does not know exactly when the system will shut
down. (If none of a user's Sensor Tests succeeds, that user does
not learn of the shutdown until the final warning turn.)
When the sequence reaches its final warning turn, inform all
users within the system that a shutdown sequence is in progress
and tell them how many turns remain before final shutdown.
The host shuts down at the end of the last Combat Turn in
the sequence. Any character online when the host shuts down
is dumped offline and suffers dump shock (see Dump Shock, p.
227, SR3). Any programs operating when the system shuts
down—such as applications, frames and agents, command
sets, IC and so on—immediately crash. Ongoing and monitored
operations terminate as well.`
    }
return (
    <div className='mb-2'>
        <Button className="ServerEventButton" variant="primary" onClick={handleShow}>{props.ICStep}: {props.EventName}</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.EventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body><pre>{ServerEventTypes[props.EventDescription]}</pre></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default ServerEvent;