import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './PayData.css';

const PayData = (props) => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const DefenseTypes = {
    "Pavlov IC":"Pavlov IC is similar to standard data bomb IC, except that it does not crash when detonated and remains armed. Pavlov IC follows all the same rules as data bombs with the following exceptions. First, Pavlov IC only inflicts (rating)M damage against an icon that accesses the file or device. Second, Pavlov IC does not crash when it detonates—it remains armed and ready to explode again should the file or remote device be accessed again. Third, Pavlov IC creates a threshold equal to half its rating (round down); if the number of successes achieved on the System Test to access the file or device do not exceed this threshold, then the operation fails.",
    "Data Bomb":"A data bomb is a form of reactive IC that is attached to a file or remote slavedevice icon. The armed data bomb remains in place until another icon accesses the file or device, at which point the bomb “explodes” and damages the intruder. Unlike other IC, data bombs are not triggered by security tallies; they attack any user icon that accesses the bomb-protected icon. (See Triggering Data Bombs, p. 104.)\n\n Only one data bomb may be attached to a particular file or remote device. Data bombs may be attached to icons that are also protected by scramble IC.\n\n A data bomb can be detected by performing a successful Analyze Icon operation against the bomb-protected icon.",
    "Scramble":"Scramble IC is reactive IC used to protect elements of a host's Access, Files, or Slave subsystems. Scramble IC can be programmed to protect a specific component of a subsystem or the entire subsystem. For example, scramble IC can protect an individual data file, a datastore, or all the Files functions on a host—including faxprinter output and dedicated terminals. Similarly, scramble IC on an Access subsystem can oppose logons from specific entry points, such as public grids and dedicated workstations, or all logons. On a Slave subsystem, scramble IC can defend specific remote devices or all devices connected to the subsystem. Scramble IC programs are designed to make it impossible to Access any host or slave devices they protect, unless it is decrypted. Additionally, scramble IC will destroy the data under its care rather than letting it fall into unauthorized hands. If the decker tries to decrypt scramble IC and fails, the gamemaster makes a Scramble Test using its Rating against a target number equal to the decker's Computer Skill. If the test fails, the decker has managed to suppress the scramble IC's destruct code. If the test succeeds, the data is destroyed. Deckers may use specific system operations to defeat scramble IC, all of which can be augmented by the decryption utility program (see System Operations, p. 214). Decrypting scramble IC does not add to the decker's security tally. Deckers can use attack programs to crash scramble IC, but doing so will increase the decker's security tally unless he suppresses the scramble IC.",
    "Trace":"Trace IC is a hybrid of white and gray IC programs designed to lock in on an intruder's datatrail and trace it back to its physical origin. Trace functions in a manner similar to the track utility (p. 221, SR3). Trace IC works in two distinct stages: the hunt cycle and the location cycle. During the hunt cycle, trace IC tries to get a fix on the intruder's datatrail by “attacking” him in cybercombat. If the intruder does not evade the attack, the trace IC begins its location cycle to locate the intruder's jackpoint.",
    "Crashworm":"Crashworms seek to undermine the integrity of utilities, causing them to crash or suffer from induced errors. Whenever a utility is activated on a cyberterminal infected with crashworms, make a Worm Rating Test against the rating of the utility. If the utility has the crashguard option (see p. 83), add the crashguard rating as a target number modifier. If successful, the utility suffers errors and must roll on the Glitch Table (see p. 82).",
    "Deathworm":"A deathworm infection impedes the cyberterminal's functioning from within. All tests made by the persona, including Attack and Resistance Tests made during cybercombat, suffer a target number modifier equal to the deathworm rating ÷ 2 (round down).",
    "Dataworm":"Dataworms reside on a cyberterminal and carefully log everything the persona does: the jackpoints it uses, the systems it logs onto, the accounts and passcodes it uses, the files it accesses the utilities it uses (including ratings and options) and so on. The dataworm secretly accumulates all of this data in a hidden file on the cyberterminal and seeks to transmit it to a predetermined destination on a periodic basis. Each time a dataworm-infected cyberterminal logs on to a grid, roll 1D6. On a result of 1, the dataworm tries to send a report chock-full of incriminating evidence back to its owner.\n\n At the same time, make a Sensor (4 + Worm Rating) Test for the cyberterminal's user. If the test fails, the data payload is sent away without being discovered. If the test succeeds, the user notices the dataworm report and may engage it in cybercombat to destroy it before it gets away.\n\n In cybercombat, dataworm reports act as standard icons with rating +3D6 Initiative and an effective Evasion rating equal to the worm rating. They possess no offensive capabilities, but will maneuver to evade detection (see Cybercombat, p. 224, SR3). If the dataworm report has evaded the user at the end of any Combat Turn, it escapes. Dataworm reports are always considered to be illegitimate icons for purposes of cybercombat. The effects of dataworm reports depend on the events in the adventure. Depending on the information logged and who receives it, the user may find himself targeted for arrest or assassination, his Matrix haunts under surveillance or raided, and/or his associates killed or chased underground.",
    "Tapeworm":"Tapeworms erase files downloaded onto the cyberterminal. Whenever the user downloads a file, make a Worm Rating (MPCP) Test as soon as the download is complete. If successful, the tapeworm corrupts the information and renders it irretrievable.",
    "Ringworm":"Unlike their counterparts, ringworms are relatively benign; they are primarily used as a prankster tool. Ringworms are programmed to alter the coding of a persona's icon to change its appearance. These changes can be minor (perhaps causing the icon to flicker or buzz with static) or drastic (changing an imposing samurai warrior icon to a fluffy pink kitty). When a ringworm invades a cyberterminal, make a Worm Rating (Icon Rating) Test. If successful, the ringworm alters the icon as it has been programmed; use successes to determine the extent of these changes."
}

const defenseDesc = () =>{
    if(props.protected){
        return (<div><strong>Defense: </strong>{DefenseTypes[props.defType]}</div>)
    }else{
        return;
    }
}

const defenseTitle = () =>{
    if(props.protected){
        return (<span>- {props.defType} Rating: {props.defRating}</span>);
    }else{
        return;
    }
}

const exampleString = () =>{
    var items = [
                "A video clip of an politician known for touting family values, having an affair.",
                "A video clip of an executive known for touting family values, having an affair.",
                "The secret formula for a chemical",
                "The secret formula for a drug.",
                "The secret formula for a spell.",
                "The secret formula for a material.",
                "The secret schematics for a cyberware.",
                "The secret schematics for a drone.",
                "The secret schematics for a gun.",
                "The secret schematics for nanotechnology.",
                "The secret formula for a program.",
                "The secret formula for a recipe.",
                "Incriminating Banking information",
                "Unreleased music track",
                "Source code for popular video game",
                "Crypto coin wallet information",
                "Private LTG address for someone private",
                "Television script",
                "Unreleased Chapter for a popular series",
                "Digitally signed iconography",
                "Unrelease recipe for a brand of sweet",
                "List of popular used passwords",
                "Incriminating photos from a security camera",
                "Current location of a very private individuals vehicle",
                "Accounting information that shows who is secretly being paid by who.",
                "Lists of members of an organization that may have enemies seeking to take out those members.",
                "Similarly to the above item, lists of benefactors to a cause that might have enemies.",
                "Locations of secret company warehouses, with valuable stock inside.",
                "Schematics on new about to or already hit the market drones/guns/comlinks/ware.",
                "Detailed security information or exploitable weaknesses to companies/organizations."
            ];
    return items[Math.floor(Math.random()*items.length)]; 
}

const [PaydataType, setPaydataType] = useState(exampleString());

return (
    <div className='mb-2'>
        <Button className="PayDataButton" variant="primary" onClick={handleShow}>{props.size} {defenseTitle()} </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.size} {defenseTitle()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div><strong>Paydata</strong>: {PaydataType}</div>
                { defenseDesc() }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default PayData;