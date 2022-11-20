import React from 'react';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './NastySurprise.css';
const NastySurprise = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const NastySurpriseTypes = {
        "Semi-Autonomous Knowbot":"",
        
        "Teleporting SAN":`Teleporting SANs appear in a different location within the
Matrix each time they become active. When a teleporting SAN
disappears, its account with the grid provider and LTG code are
canceled and new ones are set up. A teleporting SAN may
simply hop about to different LTG codes within the same grid,
or it may skip over to an entirely different RTG for its next
appearance. This trick is analogous to having an unlisted comm
number that changes your commcode, AND your area code,
AND your country code, after every call.

For example, Saeder-Krupp Prime division operates a teleporting
node. It can open Matrix access at 09:00:01 GMT on a
German LTG, close at 09:00:07 and re-open at 09:01:01 with
an LTG address under a UCAS RTG.

Operating a teleporting SAN requires an incredible amount
of wealth and resources to broker the necessary contracts with
the RTG vendors. This means that teleporting SANs are usually
used only by megacorporations or government agencies.

Most teleporting SANs switch their network addresses
based on secret algorithms. Systems that provide access to the
SAN also store this algorithm, so that they know where to
reach the SAN at any given time. Individuals who need to
access the SAN are often issued a passkey that allows them to
do so even as the SAN jumps around the Matrix; the passkey
automatically reroutes them to the new location.

Other teleporting SANs negotiate new node addresses
based on an entirely random process, picking RTGs out of the
thin, virtual air of the Matrix.`,
        
        "Vanishing SAN":`Vanishing SANs are active only at specific times. At all
other times, these SANs are closed and do not even appear in
the host or PLTG that normally connects to them. They simply
do not exist except when active. Sensitive systems that need
only an occasional or periodic Matrix connection will use vanishing
SANs, so that they are off the Matrix and protected from
Matrix-based intrusion attempts most of the time.
If a user performs a Locate Access Node operation to find
a vanishing SAN, he can locate the SAN only if it is currently
open. Otherwise, the operation returns a “currently inactive”
error.

To access a vanishing SAN from the Matrix, a user must
wait until the SAN is active and then succeed in a Logon to
Host or LTG operation before the SAN disappears again.
Typically, vanishing SANs stay open for no more than 10
to 20 seconds—just enough time to dispatch and receive
email, faxes and so on. For a typical vanishing SAN, the
gamemaster rolls 1D6 + 1. The result is the number of turns the
SAN remains active.

If the SAN closes, a user who has accessed it from the
Matrix will be cut off—the user is immediately dumped offline
and may suffer dump shock. To keep the SAN from closing, the
user must make a Freeze Vanishing SAN operation (see p. 99).
If successful, the user has jammed the SAN open and set up
spoof code that makes the host think its access node is safely
offline again. The user can continue his activity within the host,
but the SAN automatically refuses any other attempts to access
it (until it's time for it to appear again).`,

        "Bouncer Host":`Bouncer hosts are capable of operating at two different
security levels. In their normal state, they operate at a low level
of security—usually Green or Orange. When a pre set trigger
condition is met, however, the mainframe loads in a new set of
security codes and “bounces” to a higher security level—usually
Red. Without warning, an easy-to-crack host suddenly
transforms into a high-security trap.

The trigger condition for a bouncer host can be just about
anything the security sysops desire. An intruder reaching a certain
security tally level may trigger a bounce, or an intruder generating
a security tally while accessing a high security file or subsystem.
A security decker may also manually trigger a bouncer by
making a successful Control Test after discovering an intruder.

A bouncer host takes one full Combat Turn to upgrade to
a new security level. The new security level affects all users on
the host. When a bouncer's security increase is triggered, the
gamemaster makes a secret Sensor Test for any icon on the
host (the target number is the new Security Value). If an icon's test succeeds,
the gamemaster informs the controlling
player that the Security Value of the host
has just increased; however, the icon
must perform an Analyze Host operation
to obtain specific details of the upgrade.

A bouncer host may be detected before it is triggered with a successful
Analyze Host operation (see p. 102).`, 
        
        "Data Bomb":`A data bomb is a form of reactive IC that is attached
to a file or remote slave device icon. The armed data bomb 
remains in place  until another icon accesses the file or 
device, at which point the bomb “explodes” and damages the 
intruder. Unlike other IC, data bombs are not triggered by 
security tallies; they attack any user icon that accesses 
the bomb-protected icon.

Only one data bomb may be attached to a particular file or 
remote device. Data bombs may be attached to icons that 
are also protected by scramble IC.

A data bomb can be detected by performing a successful 
Analyze Icon operation against the bomb-protected icon.`,
        
    "Scramble IC":`Scramble IC is reactive IC used to protect elements of
a host's Access, Files, or Slave subsystems. Scramble IC can be programmed
to protect a specific component of a subsystem or the entire subsystem. 
For example, scramble IC can protect an individual data file, a datastore,
or all the Files functions on a host—including faxprinter output and
dedicated terminals.
 
Similarly, scramble IC on an Access subsystem can oppose logons from specific
entry points, such as public grids and dedicated workstations, or all logons. 

On a Slave subsystem, scramble IC can defend specific remote devices or all 
devices connected to the subsystem. Scramble IC programs are designed to make it 
impossible to Access any host or slave devices they protect, unless it is decrypted. 
Additionally, scramble IC will destroy the data under its care rather than 
letting it fall into unauthorized hands. If the decker tries to decrypt scramble 
IC and fails, the gamemaster makes a Scramble Test using its Rating against a 
target number equal to the decker's Computer Skill. If the test fails, the decker 
has managed to suppress the scramble IC's destruct code. If the test succeeds, 
the data is destroyed. Deckers may use specific system operations to defeat 
scramble IC, all of which can be augmented by the decryption utility program 
(see System Operations, p. 214). Decrypting scramble IC does not add to the 
decker's security tally. Deckers can use attack programs to crash scramble IC, 
but doing so will increase the decker's security tally unless he suppresses 
the scramble IC.`,
        
        "Security Decker(s)":"",
        
        "Worm":"",
        
        "Chokepoint":`Chokepoints are hosts specifically designed to block unauthorized
access to more sensitive hosts. Like the firewalls of the
old Internet, a chokepoint is usually part of a tiered-access system
(see p. 204, SR3) that restricts access to any of the hosts
on the tier below it.

Generally, chokepoints protect sensitive hosts that must
maintain constant Matrix access, such as financial management,
air-traffic control and power-grid management systems.
Traditionally, these hosts serve systems that are linked together
so that users must pass through the chokepoint host to
reach other hosts in the system.

Also known as “killing jars,” chokepoints are typically
loaded with murderous IC and programmed with Security
Values higher than the Security Values of the hosts they protect.
Further, security deckers are typically stationed within chokepoints
to scan all icons that pass through and provide additional
hands-on security.

Chokepoints can be stoppers on Matrix runs. A decker can
try to bull through with brute force and hot programs, but this
approach can prove a real gamble. The smartest approach is to
locate alternate access paths to the target host that allow the
decker to bypass the chokepoint host altogether.`,
        
        "Trap Door":`Trap doors are “secret passages” from one host to another
host or PLTG. These arrangements hide access to the host or
PLTG from casual view. Typically, trap doors are concealed
within one of the host's subsystems (Control, Index, Files 
or Slave) where they are unlikely to be found.

Trap doors cannot be found with a Locate Access Node
operation. They may be found only with a successful Analyze
Subsystem operation conducted on the subsystem that hides
the trap door.

To move through a trap door, a character must simply
make a Logon operation to access the host or PLTG to which
the trap door leads.

Trap doors can be particularly nasty when combined with
chokepoints, because they force the decker to pass through
various subsystems (which can be loaded with security 
measures) to find the trap door.`,
        
    "Virtual Host":`A virtual machine (VM) is a “simulated host”—actually a
subprogram run by a real host. The VM's virtual environment is
essentially an encapsulated space within the real host itself. For
all intents and purposes, the VM acts like the real host, so a user
may not even be aware that he is operating within a VM. When
a character logs on, he enters the VM, not the actual host itself.

VMs have their own Security Codes and subsystem ratings
and can do everything a real host can do. System Tests made
on a VM run up security tallies as usual, and IC on a VM feels
every bit as nasty as IC on a native host. Crashing a VM will
dump everyone within the VM, though the crash will not affect
the real host.

No actions performed on a VM will affect the real host.
System operations on the VM do not affect the actual host
operations. For example, editing a file on a VM does not alter
the actual storage in the real host's datastores.

Note that in most cases, VMs will contain a number of
tempting files loaded with paydata to better hook an unsuspecting
intruder. When these files are downloaded or otherwise
transferred out, however, the VM intervenes in the transfer
and overwrites the files with meaningless garbage. When
the file is read later, it will be useless.`
    }


    let optionsDescription = "";
    let extraDescription = "";
    if(typeof props.options === "object"){
        optionsDescription = " ("+props.options.type+" - "+props.options.rating+")";
        extraDescription = props.options.extra;
    }else{
        optionsDescription = props.options;
    }
return (
    <div className='mb-2'>
        <Button className="SurpriseButton" variant="primary" onClick={handleShow}>{props.type +' '+optionsDescription + ' '+ extraDescription}</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.type +' '+optionsDescription}</Modal.Title>
            </Modal.Header>
            <Modal.Body><pre>{NastySurpriseTypes[props.type]}</pre></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default NastySurprise;